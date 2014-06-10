
var Dancer = function(top, left, timeBetweenSteps){
  this.$node = $('<span class="dancer"></span>');
  this._timeBetweenSteps = timeBetweenSteps;
  this.step();
  this._radius = 10;
  this._direction = undefined; //each dancer has a direction between 0 and 360 degrees
  this._top = top;
  this._left = left;
  this.isRoaming = false;
  this.setPosition(top, left);
};


Dancer.prototype.roam = function(){
  var topAdjust = Math.floor((Math.random() -0.5) * 10 );
  var leftAdjust = Math.floor((Math.random() -0.5) * 10 );
  this.setPosition(this._top - topAdjust, this._left - leftAdjust);
};

Dancer.prototype.step = function(){
  if (this.isRoaming){
    this.roam();
  }
  setTimeout(this.step.bind(this), this._timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left,
    'z-index': -105
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
