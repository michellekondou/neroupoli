'use strict';
var images = document.querySelectorAll('.js-lazy-image'),
    config = {
        rootMargin: '50px 0px',
        threshold: 0.01
    },
    imageCount = images.length,
    observer;
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