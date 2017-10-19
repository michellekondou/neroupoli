/* ========================================================================
======= HELPER FUNCTIONS ==================================================
======================================================================== */

var vw = window.innerWidth,
    vh = window.innerHeight;
//get the object height based on vh
function elHeight() {
  if(vw < vh){
    return 'height:' + vh + 'px';
  } else {
    return 'height: auto';
  }
}

//maps the object as key:value
function _map(map) {
  var obj = [];

  for (var o in map) {
      obj.push(o + ':' + map[o])
  }

  return obj.join(';');
}

//returns true if value is an object
function isObject(obj) {
  return obj === Object(obj);
}

function addListeners(el, s, fn) {
  s.split(' ').forEach(function(e){ el.addEventListener(e, fn, true)});
}

