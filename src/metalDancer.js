var MetalDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps/10);
  this._movedUp = false;
  this._headbangMove = Math.floor(Math.random()*6) + 3;
};

MetalDancer.prototype = Object.create(Dancer.prototype);
MetalDancer.prototype.constructor = MetalDancer;

MetalDancer.prototype._oldStep = Dancer.prototype.step;
MetalDancer.prototype.step = function() {
  this._oldStep();
  //we want this guy to headbang
  //so that means move up and down quickly
  if (this._movedUp) {
    //move down
    this.setPosition(this._top - this._headbangMove, this._left);
  } else {
    //move up
    this.setPosition(this._top + this._headbangMove, this._left);
  }
  this._movedUp = !this._movedUp;
};
