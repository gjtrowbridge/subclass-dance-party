Math.toRadians = function(degrees){
  if (degrees < 0) {
    degrees += 360;
  }
  return degrees / 180 * Math.PI;
};

Math.toDegrees = function(radians) {
  return radians * 180 / Math.PI;
};

Number.prototype.mod = function(n) {
  return ((this%n)+n)%n;
};
