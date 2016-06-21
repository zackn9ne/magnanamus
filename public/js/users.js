
/*
 * Here is an example of how to use Backstretch as a slideshow.
 * Just pass in an array of images, and optionally a duration and fade value.
 */

  // Duration is the amount of time in between slides,
  // and fade is value that determines how quickly the next image will fade in
  $.backstretch([
      "../img/entry_1.jpg",
      "../img/entry_2.jpg",
      "../img/Magness-east10th-14.jpg",
      "../img/IMG_1630.jpg"
  ], {duration: 3000, fade: 750});

