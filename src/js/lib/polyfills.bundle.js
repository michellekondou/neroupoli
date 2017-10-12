(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _promisePolyfill = require('promise-polyfill');

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// To add to window
if (!window.Promise) {
  window.Promise = _promisePolyfill2.default;
}

// Production steps of ECMA-262, Edition 6, 22.1.2.1
//array from polyfill
if (!Array.from) {
  Array.from = function () {
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method 
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfM2I0YjQ5Yi5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJQcm9taXNlIiwiQXJyYXkiLCJmcm9tIiwidG9TdHIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImlzQ2FsbGFibGUiLCJmbiIsImNhbGwiLCJ0b0ludGVnZXIiLCJ2YWx1ZSIsIm51bWJlciIsIk51bWJlciIsImlzTmFOIiwiaXNGaW5pdGUiLCJNYXRoIiwiZmxvb3IiLCJhYnMiLCJtYXhTYWZlSW50ZWdlciIsInBvdyIsInRvTGVuZ3RoIiwibGVuIiwibWluIiwibWF4IiwiYXJyYXlMaWtlIiwiQyIsIml0ZW1zIiwiVHlwZUVycm9yIiwibWFwRm4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJUIiwiQSIsImsiLCJrVmFsdWUiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUVBO0FBQ0EsSUFBSSxDQUFDQSxPQUFPQyxPQUFaLEVBQXFCO0FBQ25CRCxTQUFPQyxPQUFQO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLElBQUksQ0FBQ0MsTUFBTUMsSUFBWCxFQUFpQjtBQUNmRCxRQUFNQyxJQUFOLEdBQWMsWUFBWTtBQUN4QixRQUFJQyxRQUFRQyxPQUFPQyxTQUFQLENBQWlCQyxRQUE3QjtBQUNBLFFBQUlDLGFBQWEsU0FBYkEsVUFBYSxDQUFVQyxFQUFWLEVBQWM7QUFDN0IsYUFBTyxPQUFPQSxFQUFQLEtBQWMsVUFBZCxJQUE0QkwsTUFBTU0sSUFBTixDQUFXRCxFQUFYLE1BQW1CLG1CQUF0RDtBQUNELEtBRkQ7QUFHQSxRQUFJRSxZQUFZLFNBQVpBLFNBQVksQ0FBVUMsS0FBVixFQUFpQjtBQUMvQixVQUFJQyxTQUFTQyxPQUFPRixLQUFQLENBQWI7QUFDQSxVQUFJRyxNQUFNRixNQUFOLENBQUosRUFBbUI7QUFBRSxlQUFPLENBQVA7QUFBVztBQUNoQyxVQUFJQSxXQUFXLENBQVgsSUFBZ0IsQ0FBQ0csU0FBU0gsTUFBVCxDQUFyQixFQUF1QztBQUFFLGVBQU9BLE1BQVA7QUFBZ0I7QUFDekQsYUFBTyxDQUFDQSxTQUFTLENBQVQsR0FBYSxDQUFiLEdBQWlCLENBQUMsQ0FBbkIsSUFBd0JJLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsR0FBTCxDQUFTTixNQUFULENBQVgsQ0FBL0I7QUFDRCxLQUxEO0FBTUEsUUFBSU8saUJBQWlCSCxLQUFLSSxHQUFMLENBQVMsQ0FBVCxFQUFZLEVBQVosSUFBa0IsQ0FBdkM7QUFDQSxRQUFJQyxXQUFXLFNBQVhBLFFBQVcsQ0FBVVYsS0FBVixFQUFpQjtBQUM5QixVQUFJVyxNQUFNWixVQUFVQyxLQUFWLENBQVY7QUFDQSxhQUFPSyxLQUFLTyxHQUFMLENBQVNQLEtBQUtRLEdBQUwsQ0FBU0YsR0FBVCxFQUFjLENBQWQsQ0FBVCxFQUEyQkgsY0FBM0IsQ0FBUDtBQUNELEtBSEQ7O0FBS0E7QUFDQSxXQUFPLFNBQVNqQixJQUFULENBQWN1QixTQUFkLENBQXVCLHFCQUF2QixFQUE4QztBQUNuRDtBQUNBLFVBQUlDLElBQUksSUFBUjs7QUFFQTtBQUNBLFVBQUlDLFFBQVF2QixPQUFPcUIsU0FBUCxDQUFaOztBQUVBO0FBQ0EsVUFBSUEsYUFBYSxJQUFqQixFQUF1QjtBQUNyQixjQUFNLElBQUlHLFNBQUosQ0FBYyxrRUFBZCxDQUFOO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFJQyxRQUFRQyxVQUFVQyxNQUFWLEdBQW1CLENBQW5CLEdBQXVCRCxVQUFVLENBQVYsQ0FBdkIsR0FBc0MsS0FBS0UsU0FBdkQ7QUFDQSxVQUFJQyxDQUFKO0FBQ0EsVUFBSSxPQUFPSixLQUFQLEtBQWlCLFdBQXJCLEVBQWtDO0FBQ2hDO0FBQ0E7QUFDQSxZQUFJLENBQUN0QixXQUFXc0IsS0FBWCxDQUFMLEVBQXdCO0FBQ3RCLGdCQUFNLElBQUlELFNBQUosQ0FBYyxtRUFBZCxDQUFOO0FBQ0Q7O0FBRUQ7QUFDQSxZQUFJRSxVQUFVQyxNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3hCRSxjQUFJSCxVQUFVLENBQVYsQ0FBSjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQTtBQUNBLFVBQUlSLE1BQU1ELFNBQVNNLE1BQU1JLE1BQWYsQ0FBVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQUlHLElBQUkzQixXQUFXbUIsQ0FBWCxJQUFnQnRCLE9BQU8sSUFBSXNCLENBQUosQ0FBTUosR0FBTixDQUFQLENBQWhCLEdBQXFDLElBQUlyQixLQUFKLENBQVVxQixHQUFWLENBQTdDOztBQUVBO0FBQ0EsVUFBSWEsSUFBSSxDQUFSO0FBQ0E7QUFDQSxVQUFJQyxNQUFKO0FBQ0EsYUFBT0QsSUFBSWIsR0FBWCxFQUFnQjtBQUNkYyxpQkFBU1QsTUFBTVEsQ0FBTixDQUFUO0FBQ0EsWUFBSU4sS0FBSixFQUFXO0FBQ1RLLFlBQUVDLENBQUYsSUFBTyxPQUFPRixDQUFQLEtBQWEsV0FBYixHQUEyQkosTUFBTU8sTUFBTixFQUFjRCxDQUFkLENBQTNCLEdBQThDTixNQUFNcEIsSUFBTixDQUFXd0IsQ0FBWCxFQUFjRyxNQUFkLEVBQXNCRCxDQUF0QixDQUFyRDtBQUNELFNBRkQsTUFFTztBQUNMRCxZQUFFQyxDQUFGLElBQU9DLE1BQVA7QUFDRDtBQUNERCxhQUFLLENBQUw7QUFDRDtBQUNEO0FBQ0FELFFBQUVILE1BQUYsR0FBV1QsR0FBWDtBQUNBO0FBQ0EsYUFBT1ksQ0FBUDtBQUNELEtBdkREO0FBd0RELEdBMUVhLEVBQWQ7QUEyRUQiLCJmaWxlIjoiZmFrZV8zYjRiNDliLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAncHJvbWlzZS1wb2x5ZmlsbCc7IFxyXG5cclxuLy8gVG8gYWRkIHRvIHdpbmRvd1xyXG5pZiAoIXdpbmRvdy5Qcm9taXNlKSB7XHJcbiAgd2luZG93LlByb21pc2UgPSBQcm9taXNlO1xyXG59XHJcblxyXG4vLyBQcm9kdWN0aW9uIHN0ZXBzIG9mIEVDTUEtMjYyLCBFZGl0aW9uIDYsIDIyLjEuMi4xXHJcbi8vYXJyYXkgZnJvbSBwb2x5ZmlsbFxyXG5pZiAoIUFycmF5LmZyb20pIHtcclxuICBBcnJheS5mcm9tID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbiAgICB2YXIgaXNDYWxsYWJsZSA9IGZ1bmN0aW9uIChmbikge1xyXG4gICAgICByZXR1cm4gdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nIHx8IHRvU3RyLmNhbGwoZm4pID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG4gICAgfTtcclxuICAgIHZhciB0b0ludGVnZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgdmFyIG51bWJlciA9IE51bWJlcih2YWx1ZSk7XHJcbiAgICAgIGlmIChpc05hTihudW1iZXIpKSB7IHJldHVybiAwOyB9XHJcbiAgICAgIGlmIChudW1iZXIgPT09IDAgfHwgIWlzRmluaXRlKG51bWJlcikpIHsgcmV0dXJuIG51bWJlcjsgfVxyXG4gICAgICByZXR1cm4gKG51bWJlciA+IDAgPyAxIDogLTEpICogTWF0aC5mbG9vcihNYXRoLmFicyhudW1iZXIpKTtcclxuICAgIH07XHJcbiAgICB2YXIgbWF4U2FmZUludGVnZXIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xyXG4gICAgdmFyIHRvTGVuZ3RoID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgIHZhciBsZW4gPSB0b0ludGVnZXIodmFsdWUpO1xyXG4gICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobGVuLCAwKSwgbWF4U2FmZUludGVnZXIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBUaGUgbGVuZ3RoIHByb3BlcnR5IG9mIHRoZSBmcm9tIG1ldGhvZCBpcyAxLlxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcEZuLCB0aGlzQXJnICovKSB7XHJcbiAgICAgIC8vIDEuIExldCBDIGJlIHRoZSB0aGlzIHZhbHVlLlxyXG4gICAgICB2YXIgQyA9IHRoaXM7XHJcblxyXG4gICAgICAvLyAyLiBMZXQgaXRlbXMgYmUgVG9PYmplY3QoYXJyYXlMaWtlKS5cclxuICAgICAgdmFyIGl0ZW1zID0gT2JqZWN0KGFycmF5TGlrZSk7XHJcblxyXG4gICAgICAvLyAzLiBSZXR1cm5JZkFicnVwdChpdGVtcykuXHJcbiAgICAgIGlmIChhcnJheUxpa2UgPT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LmZyb20gcmVxdWlyZXMgYW4gYXJyYXktbGlrZSBvYmplY3QgLSBub3QgbnVsbCBvciB1bmRlZmluZWQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gNC4gSWYgbWFwZm4gaXMgdW5kZWZpbmVkLCB0aGVuIGxldCBtYXBwaW5nIGJlIGZhbHNlLlxyXG4gICAgICB2YXIgbWFwRm4gPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHZvaWQgdW5kZWZpbmVkO1xyXG4gICAgICB2YXIgVDtcclxuICAgICAgaWYgKHR5cGVvZiBtYXBGbiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvLyA1LiBlbHNlXHJcbiAgICAgICAgLy8gNS4gYSBJZiBJc0NhbGxhYmxlKG1hcGZuKSBpcyBmYWxzZSwgdGhyb3cgYSBUeXBlRXJyb3IgZXhjZXB0aW9uLlxyXG4gICAgICAgIGlmICghaXNDYWxsYWJsZShtYXBGbikpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LmZyb206IHdoZW4gcHJvdmlkZWQsIHRoZSBzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyA1LiBiLiBJZiB0aGlzQXJnIHdhcyBzdXBwbGllZCwgbGV0IFQgYmUgdGhpc0FyZzsgZWxzZSBsZXQgVCBiZSB1bmRlZmluZWQuXHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICBUID0gYXJndW1lbnRzWzJdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gMTAuIExldCBsZW5WYWx1ZSBiZSBHZXQoaXRlbXMsIFwibGVuZ3RoXCIpLlxyXG4gICAgICAvLyAxMS4gTGV0IGxlbiBiZSBUb0xlbmd0aChsZW5WYWx1ZSkuXHJcbiAgICAgIHZhciBsZW4gPSB0b0xlbmd0aChpdGVtcy5sZW5ndGgpO1xyXG5cclxuICAgICAgLy8gMTMuIElmIElzQ29uc3RydWN0b3IoQykgaXMgdHJ1ZSwgdGhlblxyXG4gICAgICAvLyAxMy4gYS4gTGV0IEEgYmUgdGhlIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBbW0NvbnN0cnVjdF1dIGludGVybmFsIG1ldGhvZCBcclxuICAgICAgLy8gb2YgQyB3aXRoIGFuIGFyZ3VtZW50IGxpc3QgY29udGFpbmluZyB0aGUgc2luZ2xlIGl0ZW0gbGVuLlxyXG4gICAgICAvLyAxNC4gYS4gRWxzZSwgTGV0IEEgYmUgQXJyYXlDcmVhdGUobGVuKS5cclxuICAgICAgdmFyIEEgPSBpc0NhbGxhYmxlKEMpID8gT2JqZWN0KG5ldyBDKGxlbikpIDogbmV3IEFycmF5KGxlbik7XHJcblxyXG4gICAgICAvLyAxNi4gTGV0IGsgYmUgMC5cclxuICAgICAgdmFyIGsgPSAwO1xyXG4gICAgICAvLyAxNy4gUmVwZWF0LCB3aGlsZSBrIDwgbGVu4oCmIChhbHNvIHN0ZXBzIGEgLSBoKVxyXG4gICAgICB2YXIga1ZhbHVlO1xyXG4gICAgICB3aGlsZSAoayA8IGxlbikge1xyXG4gICAgICAgIGtWYWx1ZSA9IGl0ZW1zW2tdO1xyXG4gICAgICAgIGlmIChtYXBGbikge1xyXG4gICAgICAgICAgQVtrXSA9IHR5cGVvZiBUID09PSAndW5kZWZpbmVkJyA/IG1hcEZuKGtWYWx1ZSwgaykgOiBtYXBGbi5jYWxsKFQsIGtWYWx1ZSwgayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIEFba10gPSBrVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGsgKz0gMTtcclxuICAgICAgfVxyXG4gICAgICAvLyAxOC4gTGV0IHB1dFN0YXR1cyBiZSBQdXQoQSwgXCJsZW5ndGhcIiwgbGVuLCB0cnVlKS5cclxuICAgICAgQS5sZW5ndGggPSBsZW47XHJcbiAgICAgIC8vIDIwLiBSZXR1cm4gQS5cclxuICAgICAgcmV0dXJuIEE7XHJcbiAgICB9O1xyXG4gIH0oKSk7XHJcbn0iXX0=
},{"promise-polyfill":2}],2:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}

  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (_typeof(this) !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function () {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new this.constructor(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = typeof setImmediate === 'function' && function (fn) {
    setImmediate(fn);
  } || function (fn) {
    setTimeoutFunc(fn, 0);
  };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }
})(undefined);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21pc2UuanMiXSwibmFtZXMiOlsicm9vdCIsInNldFRpbWVvdXRGdW5jIiwic2V0VGltZW91dCIsIm5vb3AiLCJiaW5kIiwiZm4iLCJ0aGlzQXJnIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJQcm9taXNlIiwiVHlwZUVycm9yIiwiX3N0YXRlIiwiX2hhbmRsZWQiLCJfdmFsdWUiLCJ1bmRlZmluZWQiLCJfZGVmZXJyZWRzIiwiZG9SZXNvbHZlIiwiaGFuZGxlIiwic2VsZiIsImRlZmVycmVkIiwicHVzaCIsIl9pbW1lZGlhdGVGbiIsImNiIiwib25GdWxmaWxsZWQiLCJvblJlamVjdGVkIiwicmVzb2x2ZSIsInJlamVjdCIsInByb21pc2UiLCJyZXQiLCJlIiwibmV3VmFsdWUiLCJ0aGVuIiwiZmluYWxlIiwibGVuZ3RoIiwiX3VuaGFuZGxlZFJlamVjdGlvbkZuIiwiaSIsImxlbiIsIkhhbmRsZXIiLCJkb25lIiwidmFsdWUiLCJyZWFzb24iLCJleCIsInByb3RvdHlwZSIsInByb20iLCJjb25zdHJ1Y3RvciIsImFsbCIsImFyciIsImFyZ3MiLCJBcnJheSIsInNsaWNlIiwiY2FsbCIsInJlbWFpbmluZyIsInJlcyIsInZhbCIsInJhY2UiLCJ2YWx1ZXMiLCJzZXRJbW1lZGlhdGUiLCJlcnIiLCJjb25zb2xlIiwid2FybiIsIl9zZXRJbW1lZGlhdGVGbiIsIl9zZXRVbmhhbmRsZWRSZWplY3Rpb25GbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFDLFVBQVVBLElBQVYsRUFBZ0I7O0FBRWY7QUFDQTtBQUNBLE1BQUlDLGlCQUFpQkMsVUFBckI7O0FBRUEsV0FBU0MsSUFBVCxHQUFnQixDQUFFOztBQUVsQjtBQUNBLFdBQVNDLElBQVQsQ0FBY0MsRUFBZCxFQUFrQkMsT0FBbEIsRUFBMkI7QUFDekIsV0FBTyxZQUFZO0FBQ2pCRCxTQUFHRSxLQUFILENBQVNELE9BQVQsRUFBa0JFLFNBQWxCO0FBQ0QsS0FGRDtBQUdEOztBQUVELFdBQVNDLE9BQVQsQ0FBaUJKLEVBQWpCLEVBQXFCO0FBQ25CLFFBQUksUUFBTyxJQUFQLE1BQWdCLFFBQXBCLEVBQThCLE1BQU0sSUFBSUssU0FBSixDQUFjLHNDQUFkLENBQU47QUFDOUIsUUFBSSxPQUFPTCxFQUFQLEtBQWMsVUFBbEIsRUFBOEIsTUFBTSxJQUFJSyxTQUFKLENBQWMsZ0JBQWQsQ0FBTjtBQUM5QixTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLQyxNQUFMLEdBQWNDLFNBQWQ7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLEVBQWxCOztBQUVBQyxjQUFVWCxFQUFWLEVBQWMsSUFBZDtBQUNEOztBQUVELFdBQVNZLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCQyxRQUF0QixFQUFnQztBQUM5QixXQUFPRCxLQUFLUCxNQUFMLEtBQWdCLENBQXZCLEVBQTBCO0FBQ3hCTyxhQUFPQSxLQUFLTCxNQUFaO0FBQ0Q7QUFDRCxRQUFJSyxLQUFLUCxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCTyxXQUFLSCxVQUFMLENBQWdCSyxJQUFoQixDQUFxQkQsUUFBckI7QUFDQTtBQUNEO0FBQ0RELFNBQUtOLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQUgsWUFBUVksWUFBUixDQUFxQixZQUFZO0FBQy9CLFVBQUlDLEtBQUtKLEtBQUtQLE1BQUwsS0FBZ0IsQ0FBaEIsR0FBb0JRLFNBQVNJLFdBQTdCLEdBQTJDSixTQUFTSyxVQUE3RDtBQUNBLFVBQUlGLE9BQU8sSUFBWCxFQUFpQjtBQUNmLFNBQUNKLEtBQUtQLE1BQUwsS0FBZ0IsQ0FBaEIsR0FBb0JjLE9BQXBCLEdBQThCQyxNQUEvQixFQUF1Q1AsU0FBU1EsT0FBaEQsRUFBeURULEtBQUtMLE1BQTlEO0FBQ0E7QUFDRDtBQUNELFVBQUllLEdBQUo7QUFDQSxVQUFJO0FBQ0ZBLGNBQU1OLEdBQUdKLEtBQUtMLE1BQVIsQ0FBTjtBQUNELE9BRkQsQ0FFRSxPQUFPZ0IsQ0FBUCxFQUFVO0FBQ1ZILGVBQU9QLFNBQVNRLE9BQWhCLEVBQXlCRSxDQUF6QjtBQUNBO0FBQ0Q7QUFDREosY0FBUU4sU0FBU1EsT0FBakIsRUFBMEJDLEdBQTFCO0FBQ0QsS0FkRDtBQWVEOztBQUVELFdBQVNILE9BQVQsQ0FBaUJQLElBQWpCLEVBQXVCWSxRQUF2QixFQUFpQztBQUMvQixRQUFJO0FBQ0Y7QUFDQSxVQUFJQSxhQUFhWixJQUFqQixFQUF1QixNQUFNLElBQUlSLFNBQUosQ0FBYywyQ0FBZCxDQUFOO0FBQ3ZCLFVBQUlvQixhQUFhLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsT0FBb0IsUUFBcEIsSUFBZ0MsT0FBT0EsUUFBUCxLQUFvQixVQUFqRSxDQUFKLEVBQWtGO0FBQ2hGLFlBQUlDLE9BQU9ELFNBQVNDLElBQXBCO0FBQ0EsWUFBSUQsb0JBQW9CckIsT0FBeEIsRUFBaUM7QUFDL0JTLGVBQUtQLE1BQUwsR0FBYyxDQUFkO0FBQ0FPLGVBQUtMLE1BQUwsR0FBY2lCLFFBQWQ7QUFDQUUsaUJBQU9kLElBQVA7QUFDQTtBQUNELFNBTEQsTUFLTyxJQUFJLE9BQU9hLElBQVAsS0FBZ0IsVUFBcEIsRUFBZ0M7QUFDckNmLG9CQUFVWixLQUFLMkIsSUFBTCxFQUFXRCxRQUFYLENBQVYsRUFBZ0NaLElBQWhDO0FBQ0E7QUFDRDtBQUNGO0FBQ0RBLFdBQUtQLE1BQUwsR0FBYyxDQUFkO0FBQ0FPLFdBQUtMLE1BQUwsR0FBY2lCLFFBQWQ7QUFDQUUsYUFBT2QsSUFBUDtBQUNELEtBbEJELENBa0JFLE9BQU9XLENBQVAsRUFBVTtBQUNWSCxhQUFPUixJQUFQLEVBQWFXLENBQWI7QUFDRDtBQUNGOztBQUVELFdBQVNILE1BQVQsQ0FBZ0JSLElBQWhCLEVBQXNCWSxRQUF0QixFQUFnQztBQUM5QlosU0FBS1AsTUFBTCxHQUFjLENBQWQ7QUFDQU8sU0FBS0wsTUFBTCxHQUFjaUIsUUFBZDtBQUNBRSxXQUFPZCxJQUFQO0FBQ0Q7O0FBRUQsV0FBU2MsTUFBVCxDQUFnQmQsSUFBaEIsRUFBc0I7QUFDcEIsUUFBSUEsS0FBS1AsTUFBTCxLQUFnQixDQUFoQixJQUFxQk8sS0FBS0gsVUFBTCxDQUFnQmtCLE1BQWhCLEtBQTJCLENBQXBELEVBQXVEO0FBQ3JEeEIsY0FBUVksWUFBUixDQUFxQixZQUFXO0FBQzlCLFlBQUksQ0FBQ0gsS0FBS04sUUFBVixFQUFvQjtBQUNsQkgsa0JBQVF5QixxQkFBUixDQUE4QmhCLEtBQUtMLE1BQW5DO0FBQ0Q7QUFDRixPQUpEO0FBS0Q7O0FBRUQsU0FBSyxJQUFJc0IsSUFBSSxDQUFSLEVBQVdDLE1BQU1sQixLQUFLSCxVQUFMLENBQWdCa0IsTUFBdEMsRUFBOENFLElBQUlDLEdBQWxELEVBQXVERCxHQUF2RCxFQUE0RDtBQUMxRGxCLGFBQU9DLElBQVAsRUFBYUEsS0FBS0gsVUFBTCxDQUFnQm9CLENBQWhCLENBQWI7QUFDRDtBQUNEakIsU0FBS0gsVUFBTCxHQUFrQixJQUFsQjtBQUNEOztBQUVELFdBQVNzQixPQUFULENBQWlCZCxXQUFqQixFQUE4QkMsVUFBOUIsRUFBMENHLE9BQTFDLEVBQW1EO0FBQ2pELFNBQUtKLFdBQUwsR0FBbUIsT0FBT0EsV0FBUCxLQUF1QixVQUF2QixHQUFvQ0EsV0FBcEMsR0FBa0QsSUFBckU7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLE9BQU9BLFVBQVAsS0FBc0IsVUFBdEIsR0FBbUNBLFVBQW5DLEdBQWdELElBQWxFO0FBQ0EsU0FBS0csT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7O0FBRUQ7Ozs7OztBQU1BLFdBQVNYLFNBQVQsQ0FBbUJYLEVBQW5CLEVBQXVCYSxJQUF2QixFQUE2QjtBQUMzQixRQUFJb0IsT0FBTyxLQUFYO0FBQ0EsUUFBSTtBQUNGakMsU0FBRyxVQUFVa0MsS0FBVixFQUFpQjtBQUNsQixZQUFJRCxJQUFKLEVBQVU7QUFDVkEsZUFBTyxJQUFQO0FBQ0FiLGdCQUFRUCxJQUFSLEVBQWNxQixLQUFkO0FBQ0QsT0FKRCxFQUlHLFVBQVVDLE1BQVYsRUFBa0I7QUFDbkIsWUFBSUYsSUFBSixFQUFVO0FBQ1ZBLGVBQU8sSUFBUDtBQUNBWixlQUFPUixJQUFQLEVBQWFzQixNQUFiO0FBQ0QsT0FSRDtBQVNELEtBVkQsQ0FVRSxPQUFPQyxFQUFQLEVBQVc7QUFDWCxVQUFJSCxJQUFKLEVBQVU7QUFDVkEsYUFBTyxJQUFQO0FBQ0FaLGFBQU9SLElBQVAsRUFBYXVCLEVBQWI7QUFDRDtBQUNGOztBQUVEaEMsVUFBUWlDLFNBQVIsQ0FBa0IsT0FBbEIsSUFBNkIsVUFBVWxCLFVBQVYsRUFBc0I7QUFDakQsV0FBTyxLQUFLTyxJQUFMLENBQVUsSUFBVixFQUFnQlAsVUFBaEIsQ0FBUDtBQUNELEdBRkQ7O0FBSUFmLFVBQVFpQyxTQUFSLENBQWtCWCxJQUFsQixHQUF5QixVQUFVUixXQUFWLEVBQXVCQyxVQUF2QixFQUFtQztBQUMxRCxRQUFJbUIsT0FBTyxJQUFLLEtBQUtDLFdBQVYsQ0FBdUJ6QyxJQUF2QixDQUFYOztBQUVBYyxXQUFPLElBQVAsRUFBYSxJQUFJb0IsT0FBSixDQUFZZCxXQUFaLEVBQXlCQyxVQUF6QixFQUFxQ21CLElBQXJDLENBQWI7QUFDQSxXQUFPQSxJQUFQO0FBQ0QsR0FMRDs7QUFPQWxDLFVBQVFvQyxHQUFSLEdBQWMsVUFBVUMsR0FBVixFQUFlO0FBQzNCLFFBQUlDLE9BQU9DLE1BQU1OLFNBQU4sQ0FBZ0JPLEtBQWhCLENBQXNCQyxJQUF0QixDQUEyQkosR0FBM0IsQ0FBWDs7QUFFQSxXQUFPLElBQUlyQyxPQUFKLENBQVksVUFBVWdCLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzVDLFVBQUlxQixLQUFLZCxNQUFMLEtBQWdCLENBQXBCLEVBQXVCLE9BQU9SLFFBQVEsRUFBUixDQUFQO0FBQ3ZCLFVBQUkwQixZQUFZSixLQUFLZCxNQUFyQjs7QUFFQSxlQUFTbUIsR0FBVCxDQUFhakIsQ0FBYixFQUFnQmtCLEdBQWhCLEVBQXFCO0FBQ25CLFlBQUk7QUFDRixjQUFJQSxRQUFRLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFmLElBQTJCLE9BQU9BLEdBQVAsS0FBZSxVQUFsRCxDQUFKLEVBQW1FO0FBQ2pFLGdCQUFJdEIsT0FBT3NCLElBQUl0QixJQUFmO0FBQ0EsZ0JBQUksT0FBT0EsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM5QkEsbUJBQUttQixJQUFMLENBQVVHLEdBQVYsRUFBZSxVQUFVQSxHQUFWLEVBQWU7QUFDNUJELG9CQUFJakIsQ0FBSixFQUFPa0IsR0FBUDtBQUNELGVBRkQsRUFFRzNCLE1BRkg7QUFHQTtBQUNEO0FBQ0Y7QUFDRHFCLGVBQUtaLENBQUwsSUFBVWtCLEdBQVY7QUFDQSxjQUFJLEVBQUVGLFNBQUYsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIxQixvQkFBUXNCLElBQVI7QUFDRDtBQUNGLFNBZEQsQ0FjRSxPQUFPTixFQUFQLEVBQVc7QUFDWGYsaUJBQU9lLEVBQVA7QUFDRDtBQUNGOztBQUVELFdBQUssSUFBSU4sSUFBSSxDQUFiLEVBQWdCQSxJQUFJWSxLQUFLZCxNQUF6QixFQUFpQ0UsR0FBakMsRUFBc0M7QUFDcENpQixZQUFJakIsQ0FBSixFQUFPWSxLQUFLWixDQUFMLENBQVA7QUFDRDtBQUNGLEtBM0JNLENBQVA7QUE0QkQsR0EvQkQ7O0FBaUNBMUIsVUFBUWdCLE9BQVIsR0FBa0IsVUFBVWMsS0FBVixFQUFpQjtBQUNqQyxRQUFJQSxTQUFTLFFBQU9BLEtBQVAseUNBQU9BLEtBQVAsT0FBaUIsUUFBMUIsSUFBc0NBLE1BQU1LLFdBQU4sS0FBc0JuQyxPQUFoRSxFQUF5RTtBQUN2RSxhQUFPOEIsS0FBUDtBQUNEOztBQUVELFdBQU8sSUFBSTlCLE9BQUosQ0FBWSxVQUFVZ0IsT0FBVixFQUFtQjtBQUNwQ0EsY0FBUWMsS0FBUjtBQUNELEtBRk0sQ0FBUDtBQUdELEdBUkQ7O0FBVUE5QixVQUFRaUIsTUFBUixHQUFpQixVQUFVYSxLQUFWLEVBQWlCO0FBQ2hDLFdBQU8sSUFBSTlCLE9BQUosQ0FBWSxVQUFVZ0IsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDNUNBLGFBQU9hLEtBQVA7QUFDRCxLQUZNLENBQVA7QUFHRCxHQUpEOztBQU1BOUIsVUFBUTZDLElBQVIsR0FBZSxVQUFVQyxNQUFWLEVBQWtCO0FBQy9CLFdBQU8sSUFBSTlDLE9BQUosQ0FBWSxVQUFVZ0IsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDNUMsV0FBSyxJQUFJUyxJQUFJLENBQVIsRUFBV0MsTUFBTW1CLE9BQU90QixNQUE3QixFQUFxQ0UsSUFBSUMsR0FBekMsRUFBOENELEdBQTlDLEVBQW1EO0FBQ2pEb0IsZUFBT3BCLENBQVAsRUFBVUosSUFBVixDQUFlTixPQUFmLEVBQXdCQyxNQUF4QjtBQUNEO0FBQ0YsS0FKTSxDQUFQO0FBS0QsR0FORDs7QUFRQTtBQUNBakIsVUFBUVksWUFBUixHQUF3QixPQUFPbUMsWUFBUCxLQUF3QixVQUF4QixJQUFzQyxVQUFVbkQsRUFBVixFQUFjO0FBQUVtRCxpQkFBYW5ELEVBQWI7QUFBbUIsR0FBMUUsSUFDckIsVUFBVUEsRUFBVixFQUFjO0FBQ1pKLG1CQUFlSSxFQUFmLEVBQW1CLENBQW5CO0FBQ0QsR0FISDs7QUFLQUksVUFBUXlCLHFCQUFSLEdBQWdDLFNBQVNBLHFCQUFULENBQStCdUIsR0FBL0IsRUFBb0M7QUFDbEUsUUFBSSxPQUFPQyxPQUFQLEtBQW1CLFdBQW5CLElBQWtDQSxPQUF0QyxFQUErQztBQUM3Q0EsY0FBUUMsSUFBUixDQUFhLHVDQUFiLEVBQXNERixHQUF0RCxFQUQ2QyxDQUNlO0FBQzdEO0FBQ0YsR0FKRDs7QUFNQTs7Ozs7QUFLQWhELFVBQVFtRCxlQUFSLEdBQTBCLFNBQVNBLGVBQVQsQ0FBeUJ2RCxFQUF6QixFQUE2QjtBQUNyREksWUFBUVksWUFBUixHQUF1QmhCLEVBQXZCO0FBQ0QsR0FGRDs7QUFJQTs7Ozs7QUFLQUksVUFBUW9ELHdCQUFSLEdBQW1DLFNBQVNBLHdCQUFULENBQWtDeEQsRUFBbEMsRUFBc0M7QUFDdkVJLFlBQVF5QixxQkFBUixHQUFnQzdCLEVBQWhDO0FBQ0QsR0FGRDs7QUFJQSxNQUFJLE9BQU95RCxNQUFQLEtBQWtCLFdBQWxCLElBQWlDQSxPQUFPQyxPQUE1QyxFQUFxRDtBQUNuREQsV0FBT0MsT0FBUCxHQUFpQnRELE9BQWpCO0FBQ0QsR0FGRCxNQUVPLElBQUksQ0FBQ1QsS0FBS1MsT0FBVixFQUFtQjtBQUN4QlQsU0FBS1MsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7QUFFRixDQXhPRCIsImZpbGUiOiJwcm9taXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChyb290KSB7XG5cbiAgLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gcHJvbWlzZS1wb2x5ZmlsbCB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbiAgLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG4gIHZhciBzZXRUaW1lb3V0RnVuYyA9IHNldFRpbWVvdXQ7XG5cbiAgZnVuY3Rpb24gbm9vcCgpIHt9XG4gIFxuICAvLyBQb2x5ZmlsbCBmb3IgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbiAgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBQcm9taXNlKGZuKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3Jyk7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcbiAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgdGhpcy5faGFuZGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2RlZmVycmVkcyA9IFtdO1xuXG4gICAgZG9SZXNvbHZlKGZuLCB0aGlzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZShzZWxmLCBkZWZlcnJlZCkge1xuICAgIHdoaWxlIChzZWxmLl9zdGF0ZSA9PT0gMykge1xuICAgICAgc2VsZiA9IHNlbGYuX3ZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDApIHtcbiAgICAgIHNlbGYuX2RlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2VsZi5faGFuZGxlZCA9IHRydWU7XG4gICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG4gICAgICBpZiAoY2IgPT09IG51bGwpIHtcbiAgICAgICAgKHNlbGYuX3N0YXRlID09PSAxID8gcmVzb2x2ZSA6IHJlamVjdCkoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fdmFsdWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcmV0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0ID0gY2Ioc2VsZi5fdmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZGVmZXJyZWQucHJvbWlzZSwgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmUoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gUHJvbWlzZSBSZXNvbHV0aW9uIFByb2NlZHVyZTogaHR0cHM6Ly9naXRodWIuY29tL3Byb21pc2VzLWFwbHVzL3Byb21pc2VzLXNwZWMjdGhlLXByb21pc2UtcmVzb2x1dGlvbi1wcm9jZWR1cmVcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gc2VsZikgdGhyb3cgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgIGlmIChuZXdWYWx1ZSAmJiAodHlwZW9mIG5ld1ZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgIHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcbiAgICAgICAgaWYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgIHNlbGYuX3N0YXRlID0gMztcbiAgICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIGZpbmFsZShzZWxmKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkb1Jlc29sdmUoYmluZCh0aGVuLCBuZXdWYWx1ZSksIHNlbGYpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VsZi5fc3RhdGUgPSAxO1xuICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIGZpbmFsZShzZWxmKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZWplY3Qoc2VsZiwgZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVqZWN0KHNlbGYsIG5ld1ZhbHVlKSB7XG4gICAgc2VsZi5fc3RhdGUgPSAyO1xuICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgZmluYWxlKHNlbGYpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmluYWxlKHNlbGYpIHtcbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghc2VsZi5faGFuZGxlZCkge1xuICAgICAgICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYuX2RlZmVycmVkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaGFuZGxlKHNlbGYsIHNlbGYuX2RlZmVycmVkc1tpXSk7XG4gICAgfVxuICAgIHNlbGYuX2RlZmVycmVkcyA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKSB7XG4gICAgdGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcbiAgICB0aGlzLm9uUmVqZWN0ZWQgPSB0eXBlb2Ygb25SZWplY3RlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uUmVqZWN0ZWQgOiBudWxsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogVGFrZSBhIHBvdGVudGlhbGx5IG1pc2JlaGF2aW5nIHJlc29sdmVyIGZ1bmN0aW9uIGFuZCBtYWtlIHN1cmVcbiAgICogb25GdWxmaWxsZWQgYW5kIG9uUmVqZWN0ZWQgYXJlIG9ubHkgY2FsbGVkIG9uY2UuXG4gICAqXG4gICAqIE1ha2VzIG5vIGd1YXJhbnRlZXMgYWJvdXQgYXN5bmNocm9ueS5cbiAgICovXG4gIGZ1bmN0aW9uIGRvUmVzb2x2ZShmbiwgc2VsZikge1xuICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGZuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICByZWplY3Qoc2VsZiwgcmVhc29uKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICByZWplY3Qoc2VsZiwgZXgpO1xuICAgIH1cbiAgfVxuXG4gIFByb21pc2UucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xuICB9O1xuXG4gIFByb21pc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICB2YXIgcHJvbSA9IG5ldyAodGhpcy5jb25zdHJ1Y3Rvcikobm9vcCk7XG5cbiAgICBoYW5kbGUodGhpcywgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb20pKTtcbiAgICByZXR1cm4gcHJvbTtcbiAgfTtcblxuICBQcm9taXNlLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgICB2YXIgcmVtYWluaW5nID0gYXJncy5sZW5ndGg7XG5cbiAgICAgIGZ1bmN0aW9uIHJlcyhpLCB2YWwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodmFsICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgdmFyIHRoZW4gPSB2YWwudGhlbjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICB0aGVuLmNhbGwodmFsLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgcmVzKGksIHZhbCk7XG4gICAgICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYXJnc1tpXSA9IHZhbDtcbiAgICAgICAgICBpZiAoLS1yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIHJlamVjdChleCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcyhpLCBhcmdzW2ldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBQcm9taXNlLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgUHJvbWlzZS5yZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVqZWN0KHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBQcm9taXNlLnJhY2UgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWx1ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFsdWVzW2ldLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvLyBVc2UgcG9seWZpbGwgZm9yIHNldEltbWVkaWF0ZSBmb3IgcGVyZm9ybWFuY2UgZ2FpbnNcbiAgUHJvbWlzZS5faW1tZWRpYXRlRm4gPSAodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBmdW5jdGlvbiAoZm4pIHsgc2V0SW1tZWRpYXRlKGZuKTsgfSkgfHxcbiAgICBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHNldFRpbWVvdXRGdW5jKGZuLCAwKTtcbiAgICB9O1xuXG4gIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZnVuY3Rpb24gX3VuaGFuZGxlZFJlamVjdGlvbkZuKGVycikge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZSkge1xuICAgICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246JywgZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGltbWVkaWF0ZSBmdW5jdGlvbiB0byBleGVjdXRlIGNhbGxiYWNrc1xuICAgKiBAcGFyYW0gZm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0byBleGVjdXRlXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBQcm9taXNlLl9zZXRJbW1lZGlhdGVGbiA9IGZ1bmN0aW9uIF9zZXRJbW1lZGlhdGVGbihmbikge1xuICAgIFByb21pc2UuX2ltbWVkaWF0ZUZuID0gZm47XG4gIH07XG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiB1bmhhbmRsZWQgcmVqZWN0aW9uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gdW5oYW5kbGVkIHJlamVjdGlvblxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgUHJvbWlzZS5fc2V0VW5oYW5kbGVkUmVqZWN0aW9uRm4gPSBmdW5jdGlvbiBfc2V0VW5oYW5kbGVkUmVqZWN0aW9uRm4oZm4pIHtcbiAgICBQcm9taXNlLl91bmhhbmRsZWRSZWplY3Rpb25GbiA9IGZuO1xuICB9O1xuICBcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuICB9IGVsc2UgaWYgKCFyb290LlByb21pc2UpIHtcbiAgICByb290LlByb21pc2UgPSBQcm9taXNlO1xuICB9XG5cbn0pKHRoaXMpO1xuIl19
},{}]},{},[1])