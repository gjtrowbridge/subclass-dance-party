var BlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;
BlinkyDancer.prototype._oldStep = Dancer.prototype.step;
BlinkyDancer.prototype.step = function(){
  this._oldStep();
  this.$node.toggle();
};
