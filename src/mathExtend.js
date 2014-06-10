Math.toRadians = function(degrees){
  if (degrees < 0) {
    degrees += 360;
  }
  return degrees / 180 * Math.PI;
};
