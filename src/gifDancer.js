var GifDancer = function(top, left, timeBetweenSteps, gifUrl) {
  Dancer.call(this, top, left, timeBetweenSteps/10);
  this._gifUrl = gifUrl;

  //Makes z-index -1
  var styleSettings = {
    'z-index':-1
  };

  this.$node.css(styleSettings);
  this.$node.html('<img src="' + this._gifUrl + '" />');
};

GifDancer.prototype = Object.create(Dancer.prototype);
GifDancer.prototype.constructor = GifDancer;

GifDancer.prototype.changeZIndex = function() {
  var styleSettings = {
    'z-index':Math.floor(Math.random()* -100)
  };
  this.$node.css(styleSettings);
};



