var GrowingDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps * .05);
  this._initRadius = Math.random() * 20;
  this._maxRadius = (Math.random() * 300) + 20;
  this._radius = 10;
  this._growFactor = 1.1;
  this._growing = true;
};

GrowingDancer.prototype = Object.create(Dancer.prototype);
GrowingDancer.prototype.constructor = GrowingDancer;
GrowingDancer.prototype.changeRadius = function(radius) {
  var styleSettings = {
    'border-radius':radius.toString() + 'px',
    'border-width':radius.toString() + 'px'
  };


  //Update the dancer with its new radius whenever it
  //grows
  this._radius = radius;
  this.$node.css(styleSettings);

};
GrowingDancer.prototype._center =
GrowingDancer.prototype._oldStep = Dancer.prototype.step;
GrowingDancer.prototype.step = function(){
  this._oldStep();

  if (this._radius >= this._maxRadius) {
    this._growing = false;
  } else if (this._radius <= this._initRadius) {
    this._growing = true;
  }

  var r1 = this._radius;
  if (this._growing){
    this._radius *= this._growFactor;
    this.changeRadius(this._radius);
  } else {
    this._radius /= this._growFactor;
    this.changeRadius(this._radius);
  }
  this.setPosition(this._top - (this._radius - r1), this._left - (this._radius - r1));
};
