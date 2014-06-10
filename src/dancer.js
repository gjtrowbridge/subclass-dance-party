
var Dancer = function(top, left, timeBetweenSteps){
  this.$node = $('<span class="dancer"></span>');
  this._timeBetweenSteps = timeBetweenSteps;
  this.step();
  this._radius = 10;
  this.speed = 0;
  this.angle = 0; //each dancer has a direction between 0 and 360 degrees
  this._top = top;
  this._left = left;
  this._lastWallHit = undefined;
  this.isRoaming = false;
  this.setPosition(top, left);
};

Dancer.prototype._checkCollision = function() {
  //Check if top, left, bottom, or right boundaries have been exceeded
  if ((this._top < 30)&&(this._lastWallHit !== 'top')) {
     this.angle = (180 - this.angle) % 360;
     this._lastWallHit = 'top';
  } else if ((this._left < 0)&&(this._lastWallHit !== 'left')) {
    this.angle = (360 - this.angle);
    this._lastWallHit = 'left';
  } else if ((this._top + this._radius * 2 > $("body").height())&&(this._lastWallHit !== 'bottom')) {
    this.angle = (180 - this.angle) % 360;
    this._lastWallHit = 'bottom';
  } else if ((this._left + this._radius * 2 > $("body").width())&&(this._lastWallHit !== 'right')) {
    this.angle = (360 - this.angle);
    this._lastWallHit = 'right';
  }
};

Dancer.prototype.roam = function(){
  var topAdjust = Math.floor((Math.random() -0.5) * 10 );
  var leftAdjust = Math.floor((Math.random() -0.5) * 10 );
  this.setPosition(this._top - topAdjust, this._left - leftAdjust);
};

Dancer.prototype.move = function(){
  var deltaTop = Math.floor(-1 * this.speed * Math.sin(Math.toRadians(this.angle * -1 + 90)));
  var deltaLeft = Math.floor(this.speed * Math.cos(Math.toRadians(this.angle * -1 + 90)));
  this.setPosition(this._top + deltaTop, this._left + deltaLeft);
  this._checkCollision();
};

Dancer.prototype.step = function(){
  if (this.isRoaming){
    this.roam();
  }
  this.move();
  setTimeout(this.step.bind(this), this._timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left,
  };

  //Update the dancer with its new position whenever it
  //moves
  this._top = top;
  this._left = left;

  this.$node.css(styleSettings);
};

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
Dancer.prototype.changeZIndex = function() {
  var styleSettings = {
    'z-index':Math.floor(Math.random()* -100) - 100
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.changeColor = function() {
  var red = Math.floor(Math.random()*256);
  var green = Math.floor(Math.random()*256);
  var blue = Math.floor(Math.random()*256);
  var styleSettings = {
    'border-color':'rgb(' + red + ',' + green + ',' + blue + ')'
  };
  this.$node.css(styleSettings);
};
