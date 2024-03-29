var PlanetDancer = function(top,left,timeBetweenSteps){
  GrowingDancer.call(this,top,left,timeBetweenSteps);
  window.planetDancers.push(this);
};

PlanetDancer.prototype = Object.create(GrowingDancer.prototype);
PlanetDancer.prototype.constructor = PlanetDancer;

//Override the inherited move function to allow this dancer
//to "feel" a gravitational pull from other planetDancers
//
//This appears to be buggy (they only sort of do this...)
PlanetDancer.prototype.move = function(){
  for (var i = 0; i < window.planetDancers.length; i++){
    if (this !== window.planetDancers[i]){
      var centerCoords = window.planetDancers[i]._getCenter();
      this._adjustSpeedForGravity(centerCoords[1], centerCoords[0], window.gravity);
    }
  }
  var vectors = this._getSpeedVectors();
  this.setPosition(this._top + vectors[1], this._left + vectors[0]);
  this._checkCollision();
};
