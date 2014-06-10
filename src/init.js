$(document).ready(function(){
  window.dancers = [];
  window.planetDancers = [];
  window.allRoam = false;
  window.gifUrls = [
    'http://media.giphy.com/media/XWKrUYz1N5J7i/giphy.gif',
    'http://media.giphy.com/media/1bffEtmXGc8Ny/giphy.gif',
    'http://media.giphy.com/media/b9QBHfcNpvqDK/giphy.gif',
    'http://media.giphy.com/media/9qJvOaj3uaibu/giphy.gif',
    'http://media.giphy.com/media/AeJ16UB03k64w/giphy.gif'
  ];
  window.isBouncing = false;
  window.mouseGravity = 0;
  window.gravity = 10;
  window.allowCollisions = true;
  $( "body" ).mousemove(function( event ) {
    window.mouseLeft = event.pageX;
    window.mouseTop = event.pageY;
  });

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];
    var gifUrl;

    if (dancerMakerFunctionName === 'GifDancer') {
      var index = Math.floor(Math.random() * window.gifUrls.length);
      gifUrl = window.gifUrls.splice(index,1)[0];
      if (gifUrl === undefined) {
        return;
      }
    }

    // make a dancer with a random position
    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000,
      gifUrl
    );
    window.dancers.push(dancer);
    $('body').append(dancer.$node);
  });

  $(".lineUpButton").on("click", function(event){
    for (var i = 0; i < window.dancers.length; i++){
      window.dancers[i].lineUp('top'); //add in lineUp direction pulldown later or something
    }
  });
  $('.changeColorsButton').on('click', function(event) {
    for (var i=0; i<window.dancers.length; i++) {
      window.dancers[i].changeColor();
      window.dancers[i].changeZIndex();
    }
  });
  $('.roamingButton').on('click', function(event){
    window.allRoam = !window.allRoam;
    if (window.allRoam){
      $('.roamingButton').text('Watch yourself!');
    } else{
     $('.roamingButton').text('Shake ya ass!');
    }
    for (var i = 0; i < window.dancers.length; i++){
      window.dancers[i].isRoaming = window.allRoam;
    }
  });
  $('.bounceButton').on('click', function(event) {
    window.isBouncing = !window.isBouncing;
    for (var i=0; i<window.dancers.length; i++) {
      if (window.isBouncing) {
        window.dancers[i].speed = Math.random() * 15 + 10;
        window.dancers[i].angle = Math.floor(Math.random() * 360);
      } else {
        window.dancers[i].speed = 0;
      }
    }
  });


});


