// runner called from the view its being used on
$( document ).ready(function() {
//sanity check key check
 var feed = new Instafeed({
    get: 'tagged',
    tagName: 'awesome',
    clientId: '1e10647fea804bf9bda96435ea90eebc'
 });
// feed.run();

function greetz(divName) {
    console.log('Greetz' + divName);
}

greetz();

moreButton = $('.load-more');
// 
magnessFeed = new Instafeed({
  get: 'user',
  userId: 1715612851,
  accessToken: '1715612851.1677ed0.8dedf0028d2048f88fcbee67320bf093',
  limit: 24,
  template: '<a class="span1 gram" href="{{link}}"><img src="{{image}}" /></a>',

  after: function() {
    if (!this.hasNext()) {
      moreButton.hide();
    }
  }
});
// call feed.next() on button click
moreButton.on('click', function() {
	magnessFeed.next();
});


townFeed = new Instafeed({
  target: 'townContainer',
  get: 'user',
  userId: 3231163843,
  clientId: '0fce5953076b41bd8faa09730c421317', /* not true that this is all you need*/
  accessToken: '3231163843.0fce595.8131fb06b09f4e64afb40d5e9b411c4e',
  limit: 24,
  template: '<a class="span1 gram" href="{{link}}"><img src="{{image}}" /></a>',

  after: function() {
    if (!this.hasNext()) {
      moreButton.hide();
    }
  }
});
    townFeed.run();
    magnessFeed.run();

// DRF
});
