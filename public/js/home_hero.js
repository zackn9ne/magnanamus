$(function() {
	var stretchedImg = 'img/Screen-Shot-2016-07-26-at-9.41.50-PM-1110x600.png';
	var stretchedEl = $(".container.hero");

		stretchedEl.css("min-height", "360px");

		function loadHeroBackstretchIt()
		{

		if(window.devicePixelRatio >= 2) {
			$(".container.hero").backstretch(stretchedImg);
			$("img");
		} else {
			$(".container.hero").backstretch(stretchedImg);
			}
		}

		loadHeroBackstretchIt();
})
