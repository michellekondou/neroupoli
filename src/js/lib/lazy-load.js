/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  // Test values; Uncomment to check result …

  // IE 10
  // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
  // IE 11
  // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
  // Edge 12 (Spartan)
  // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
  // Edge 13
  // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

var IEversion = detectIE();
console.log(IEversion);

if (IEversion > 10) {
'use strict';
var images = document.querySelectorAll('.js-lazy-image'),
    config = {
        rootMargin: '50px 0px',
        threshold: 0.01
    },
    imageCount = images.length,
    observer,
    dataset;
if (!('IntersectionObserver' in window)) loadImagesImmediately(images);
else {
    observer = new IntersectionObserver(onIntersection, config);
    for (var image, i = 0; i < images.length; i++)(image = images[i], !image.classList.contains('js-lazy-image--handled')) && observer.observe(image)
}

function fetchImage(a) {
    return new Promise(function(b, c) {
        var d = new Image;
        d.src = a, d.onload = b, d.onerror = c
    })
}

function preloadImage(a) {
  
    var b = a.dataset.src; 
    return b ? fetchImage(b).then(function() {
        applyImage(a, b)
    }) : void 0
}

function loadImagesImmediately(a) {
    for (var d, b = Array.from(a), c = 0; c < a.length; c++) d = a[c], preloadImage(d)
}

function disconnect() {
    observer && observer.disconnect()
}

function onIntersection(a) {
    0 === imageCount && observer.disconnect();
    for (var c, b = 0; b < a.length; b++) c = a[b], 0 < c.intersectionRatio && (imageCount--, observer.unobserve(c.target), preloadImage(c.target))
}

function applyImage(a, b) {
    a.classList.add('js-lazy-image--handled'), a.src = b, a.classList.add('fade-in')
}

} else if (IEversion <= 10) {

    console.log(IEversion);
    var img = $('img');
     
    for (var i = 0; i < img.length; i++) {
        image = img[i];
        $(image).attr( 'src', $(image).attr('data-src') )
    }
} 