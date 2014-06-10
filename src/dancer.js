var Dancer = function(top, left, timeBetweenSteps){
  this.$node = $('<span class="dancer"></span>');
  this._timeBetweenSteps = timeBetweenSteps;
  this.step();

  this._top = top;
  this._left = left;

  this.setPosition(top, left);

};

Dancer.prototype.step = function(){
  setTimeout(this.step.bind(this), this._timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
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

/*

// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps){

  var dancer = {};

  // use jQuery to create an HTML <span> tag
  dancer.$node = $('<span class="dancer"></span>');


  dancer.step = function(){
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
    setTimeout(dancer.step, timeBetweenSteps);
  };
  dancer.step();

  dancer.setPosition = function(top, left){
    // Use css top and left properties to position our <span> tag
    // where it belongs on the page. See http://api.jquery.com/css/
    //
    var styleSettings = {
      top: top,
      left: left
    };
    dancer.$node.css(styleSettings);
  };

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  dancer.setPosition(top, left);

  return dancer;
};

*/
