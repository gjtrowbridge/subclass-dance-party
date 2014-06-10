var MetalDancer = function(top, left, timeBetweenSteps, headbangMove) {
  Dancer.call(this, top, left, timeBetweenSteps/10);
  this._movedUp = false;
  this._headbangMove = headbangMove;
  if (this._headbangMove === undefined) {
    this._headbangMove = 5;
  }
};
MetalDancer.prototype = Object.create(Dancer.prototype);
MetalDancer.prototype.constructor = MetalDancer;
MetalDancer.prototype._oldStep = Dancer.prototype.step;
MetalDancer.prototype.step = function() {
  this._oldStep();
  //we want this guy to headbang
  //so that means move up and down quickly

  //This guy won't blink
  if (this._movedUp) {
    //move down
    this.setPosition(this._top - this._headbangMove, this._left);
  } else {
    //move up
    this.setPosition(this._top + this._headbangMove, this._left);
  }
  this._movedUp = !this._movedUp;
};
