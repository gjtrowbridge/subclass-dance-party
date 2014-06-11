
var Dancer = function(top, left, timeBetweenSteps){
  this.$node = $('<span class="dancer"></span>');
  this._timeBetweenSteps = timeBetweenSteps;
  this.step();
  this._radius = 10;
  this.speed = 0;

  //each dancer has a direction between 0 and 360 degrees, 0 = up
  this.angle = 0;
  this._top = top;
  this._left = left;
  this.isRoaming = false;
  this.setPosition(top, left);
};

Dancer.prototype._adjustSpeedForGravity = function(posTop, posLeft, gravity){
  //if gravity is not set, return, otherwise adjust speed for grav
  if (!gravity){
    return;
  }
  //get the x and y distances between center of dancer and gravity position
  var center = this._getCenter();
  var diffLeft = posLeft - center[0];
  var diffTop = posTop - center[1];

  //The distance between the gravity source and this dancer
  var diffDirect = Math.pow(diffLeft,2) + Math.pow(diffTop,2);

  //Calculates the new change necessary in both directions
  diffLeft = diffLeft * (gravity / diffDirect );
  diffTop = diffTop * (gravity / diffDirect );

  //Calculates the current speed in both directions
  var vectors = this._getSpeedVectors();

  //add the vectors to get the new speed and angle
  vectors = [vectors[0] + diffLeft, vectors[1] + diffTop];

  //adjust the angle and speed to take the gravity into account
  this.angle = Math.toDegrees(Math.atan2(Math.abs(vectors[1]),Math.abs(vectors[0]))).mod(360);
  if (vectors[1] > 0 && vectors[0] > 0){
    //quad 2
    this.angle = 90 + this.angle;
  } else if (vectors[1] > 0 && vectors[0]  < 0){
    //quad3
    this.angle =  270 - this.angle;
  } else if (vectors[1] < 0 && vectors[0] < 0){
    //quad4
    this.angle = 270 + this.angle;
  } else if (vectors[1] < 0 && vectors[0] > 0){
    //quad1
    this.angle = 90 - this.angle;

  }
  this.speed = Math.sqrt(Math.pow(vectors[1],2) + Math.pow(vectors[0],2));

  //optional line for mouseGravity to make objects appear to orbit better:
  //if (diffDirect < 180){ this.speed = Math.sqrt(this.speed) * 0.08;}
};

//Gets the center of the dancer
Dancer.prototype._getCenter = function(){
  return [this._left + this._radius, this._top + this._radius];
};

//Gets the speed of the dancer (in both directions, as a duple)
Dancer.prototype._getSpeedVectors = function(){
  return [ Math.floor(this.speed * Math.cos(Math.toRadians(this.angle * -1 + 90))),
       Math.floor(-1 * this.speed * Math.sin(Math.toRadians(this.angle * -1 + 90)))];
};

//Checks whether the dancer has collided with any wall
//If so, angle is adjusted to point the dancer in the correct
//direction (as if it had "bounced" off the wall)
Dancer.prototype._checkCollision = function() {
  if (window.allowCollisions) {
    //Check if top, left, bottom, or right boundaries have been exceeded
    if ((this._top < 30)&&(this.angle < 90 || this.angle > 270)) {
       this.angle = (180 - this.angle).mod(360);
    } else if ((this._left < 0)&&(this.angle > 180)) {
      this.angle = (360 - this.angle);
    } else if ((this._top + this._radius * 2 > $("body").height())&&(this.angle > 90 && this.angle < 270)) {
      this.angle = (180 - this.angle).mod(360);
    } else if ((this._left + this._radius * 2 > $("body").width())&&(this.angle < 180)) {
      this.angle = (360 - this.angle);
    }
  }
};

//Causes the dancer to move a short distance in a random direction
Dancer.prototype.roam = function(){
  var topAdjust = Math.floor((Math.random() -0.5) * 10 );
  var leftAdjust = Math.floor((Math.random() -0.5) * 10 );
  this.setPosition(this._top - topAdjust, this._left - leftAdjust);
};

//Moves the dancer (takes gravity into account if applicable)
Dancer.prototype.move = function(){
  this._adjustSpeedForGravity(window.mouseTop, window.mouseLeft, window.mouseGravity);
  var vectors = this._getSpeedVectors();
  this.setPosition(this._top + vectors[1], this._left + vectors[0]);
  this._checkCollision();
};

//Each dancer takes a "step" every so often
//This is the mechanism by which virtually
//all other effects take place
Dancer.prototype.step = function(){
  if (this.isRoaming){
    this.roam();
  }
  this.move();
  setTimeout(this.step.bind(this), this._timeBetweenSteps);
};

//Moves the dancer to a new position and keeps
//track of its new position
Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left,
  };

  //Update the dancer with its new position whenever it moves
  this._top = top;
  this._left = left;

  this.$node.css(styleSettings);
};

//Makes this dancer "line up" on the specified
//side of the screen
Dancer.prototype.lineUp = function(where){
  if (where === 'left'){
    this.setPosition(this._top, 20);
  } else if (where === 'top'){
    this.setPosition(20, this._left);
  } else if (where === 'right'){
    this.setPosition(this._top, $("body").width() - 20);
  } else{
    this.setPosition($("body").height() - 20, this._left);
  }
};

//Does exactly what it seems like
Dancer.prototype.changeZIndex = function() {
  var styleSettings = {
    'z-index':Math.floor(Math.random()* -100) - 100
  };
  this.$node.css(styleSettings);
};

//Changes the dancer's border to be a random color
Dancer.prototype.changeColor = function() {
  var red = Math.floor(Math.random()*256);
  var green = Math.floor(Math.random()*256);
  var blue = Math.floor(Math.random()*256);
  var styleSettings = {
    'border-color':'rgb(' + red + ',' + green + ',' + blue + ')'
  };
  this.$node.css(styleSettings);
};
