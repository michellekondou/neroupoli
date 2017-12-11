(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _promisePolyfill = require('promise-polyfill');

var _promisePolyfill2 = _interopRequireDefault(_promisePolyfill);

require('whatwg-fetch');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNDY3YTVmNTcuanMiXSwibmFtZXMiOlsid2luZG93IiwiUHJvbWlzZSIsIkFycmF5IiwiZnJvbSIsInRvU3RyIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc0NhbGxhYmxlIiwiZm4iLCJjYWxsIiwidG9JbnRlZ2VyIiwidmFsdWUiLCJudW1iZXIiLCJOdW1iZXIiLCJpc05hTiIsImlzRmluaXRlIiwiTWF0aCIsImZsb29yIiwiYWJzIiwibWF4U2FmZUludGVnZXIiLCJwb3ciLCJ0b0xlbmd0aCIsImxlbiIsIm1pbiIsIm1heCIsImFycmF5TGlrZSIsIkMiLCJpdGVtcyIsIlR5cGVFcnJvciIsIm1hcEZuIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiVCIsIkEiLCJrIiwia1ZhbHVlIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTtBQUNBLElBQUksQ0FBQ0EsT0FBT0MsT0FBWixFQUFxQjtBQUNuQkQsU0FBT0MsT0FBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQSxJQUFJLENBQUNDLE1BQU1DLElBQVgsRUFBaUI7QUFDZkQsUUFBTUMsSUFBTixHQUFjLFlBQVk7QUFDeEIsUUFBSUMsUUFBUUMsT0FBT0MsU0FBUCxDQUFpQkMsUUFBN0I7QUFDQSxRQUFJQyxhQUFhLFNBQWJBLFVBQWEsQ0FBVUMsRUFBVixFQUFjO0FBQzdCLGFBQU8sT0FBT0EsRUFBUCxLQUFjLFVBQWQsSUFBNEJMLE1BQU1NLElBQU4sQ0FBV0QsRUFBWCxNQUFtQixtQkFBdEQ7QUFDRCxLQUZEO0FBR0EsUUFBSUUsWUFBWSxTQUFaQSxTQUFZLENBQVVDLEtBQVYsRUFBaUI7QUFDL0IsVUFBSUMsU0FBU0MsT0FBT0YsS0FBUCxDQUFiO0FBQ0EsVUFBSUcsTUFBTUYsTUFBTixDQUFKLEVBQW1CO0FBQUUsZUFBTyxDQUFQO0FBQVc7QUFDaEMsVUFBSUEsV0FBVyxDQUFYLElBQWdCLENBQUNHLFNBQVNILE1BQVQsQ0FBckIsRUFBdUM7QUFBRSxlQUFPQSxNQUFQO0FBQWdCO0FBQ3pELGFBQU8sQ0FBQ0EsU0FBUyxDQUFULEdBQWEsQ0FBYixHQUFpQixDQUFDLENBQW5CLElBQXdCSSxLQUFLQyxLQUFMLENBQVdELEtBQUtFLEdBQUwsQ0FBU04sTUFBVCxDQUFYLENBQS9CO0FBQ0QsS0FMRDtBQU1BLFFBQUlPLGlCQUFpQkgsS0FBS0ksR0FBTCxDQUFTLENBQVQsRUFBWSxFQUFaLElBQWtCLENBQXZDO0FBQ0EsUUFBSUMsV0FBVyxTQUFYQSxRQUFXLENBQVVWLEtBQVYsRUFBaUI7QUFDOUIsVUFBSVcsTUFBTVosVUFBVUMsS0FBVixDQUFWO0FBQ0EsYUFBT0ssS0FBS08sR0FBTCxDQUFTUCxLQUFLUSxHQUFMLENBQVNGLEdBQVQsRUFBYyxDQUFkLENBQVQsRUFBMkJILGNBQTNCLENBQVA7QUFDRCxLQUhEOztBQUtBO0FBQ0EsV0FBTyxTQUFTakIsSUFBVCxDQUFjdUIsU0FBZCxDQUF1QixxQkFBdkIsRUFBOEM7QUFDbkQ7QUFDQSxVQUFJQyxJQUFJLElBQVI7O0FBRUE7QUFDQSxVQUFJQyxRQUFRdkIsT0FBT3FCLFNBQVAsQ0FBWjs7QUFFQTtBQUNBLFVBQUlBLGFBQWEsSUFBakIsRUFBdUI7QUFDckIsY0FBTSxJQUFJRyxTQUFKLENBQWMsa0VBQWQsQ0FBTjtBQUNEOztBQUVEO0FBQ0EsVUFBSUMsUUFBUUMsVUFBVUMsTUFBVixHQUFtQixDQUFuQixHQUF1QkQsVUFBVSxDQUFWLENBQXZCLEdBQXNDLEtBQUtFLFNBQXZEO0FBQ0EsVUFBSUMsQ0FBSjtBQUNBLFVBQUksT0FBT0osS0FBUCxLQUFpQixXQUFyQixFQUFrQztBQUNoQztBQUNBO0FBQ0EsWUFBSSxDQUFDdEIsV0FBV3NCLEtBQVgsQ0FBTCxFQUF3QjtBQUN0QixnQkFBTSxJQUFJRCxTQUFKLENBQWMsbUVBQWQsQ0FBTjtBQUNEOztBQUVEO0FBQ0EsWUFBSUUsVUFBVUMsTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN4QkUsY0FBSUgsVUFBVSxDQUFWLENBQUo7QUFDRDtBQUNGOztBQUVEO0FBQ0E7QUFDQSxVQUFJUixNQUFNRCxTQUFTTSxNQUFNSSxNQUFmLENBQVY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFJRyxJQUFJM0IsV0FBV21CLENBQVgsSUFBZ0J0QixPQUFPLElBQUlzQixDQUFKLENBQU1KLEdBQU4sQ0FBUCxDQUFoQixHQUFxQyxJQUFJckIsS0FBSixDQUFVcUIsR0FBVixDQUE3Qzs7QUFFQTtBQUNBLFVBQUlhLElBQUksQ0FBUjtBQUNBO0FBQ0EsVUFBSUMsTUFBSjtBQUNBLGFBQU9ELElBQUliLEdBQVgsRUFBZ0I7QUFDZGMsaUJBQVNULE1BQU1RLENBQU4sQ0FBVDtBQUNBLFlBQUlOLEtBQUosRUFBVztBQUNUSyxZQUFFQyxDQUFGLElBQU8sT0FBT0YsQ0FBUCxLQUFhLFdBQWIsR0FBMkJKLE1BQU1PLE1BQU4sRUFBY0QsQ0FBZCxDQUEzQixHQUE4Q04sTUFBTXBCLElBQU4sQ0FBV3dCLENBQVgsRUFBY0csTUFBZCxFQUFzQkQsQ0FBdEIsQ0FBckQ7QUFDRCxTQUZELE1BRU87QUFDTEQsWUFBRUMsQ0FBRixJQUFPQyxNQUFQO0FBQ0Q7QUFDREQsYUFBSyxDQUFMO0FBQ0Q7QUFDRDtBQUNBRCxRQUFFSCxNQUFGLEdBQVdULEdBQVg7QUFDQTtBQUNBLGFBQU9ZLENBQVA7QUFDRCxLQXZERDtBQXdERCxHQTFFYSxFQUFkO0FBMkVEIiwiZmlsZSI6ImZha2VfNDY3YTVmNTcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdwcm9taXNlLXBvbHlmaWxsJzsgXHJcbmltcG9ydCAnd2hhdHdnLWZldGNoJztcclxuXHJcbi8vIFRvIGFkZCB0byB3aW5kb3dcclxuaWYgKCF3aW5kb3cuUHJvbWlzZSkge1xyXG4gIHdpbmRvdy5Qcm9taXNlID0gUHJvbWlzZTtcclxufVxyXG5cclxuLy8gUHJvZHVjdGlvbiBzdGVwcyBvZiBFQ01BLTI2MiwgRWRpdGlvbiA2LCAyMi4xLjIuMVxyXG4vL2FycmF5IGZyb20gcG9seWZpbGxcclxuaWYgKCFBcnJheS5mcm9tKSB7XHJcbiAgQXJyYXkuZnJvbSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG4gICAgdmFyIGlzQ2FsbGFibGUgPSBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5jYWxsKGZuKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcclxuICAgIH07XHJcbiAgICB2YXIgdG9JbnRlZ2VyID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgIHZhciBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xyXG4gICAgICBpZiAoaXNOYU4obnVtYmVyKSkgeyByZXR1cm4gMDsgfVxyXG4gICAgICBpZiAobnVtYmVyID09PSAwIHx8ICFpc0Zpbml0ZShudW1iZXIpKSB7IHJldHVybiBudW1iZXI7IH1cclxuICAgICAgcmV0dXJuIChudW1iZXIgPiAwID8gMSA6IC0xKSAqIE1hdGguZmxvb3IoTWF0aC5hYnMobnVtYmVyKSk7XHJcbiAgICB9O1xyXG4gICAgdmFyIG1heFNhZmVJbnRlZ2VyID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcclxuICAgIHZhciB0b0xlbmd0aCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICB2YXIgbGVuID0gdG9JbnRlZ2VyKHZhbHVlKTtcclxuICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbiwgMCksIG1heFNhZmVJbnRlZ2VyKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gVGhlIGxlbmd0aCBwcm9wZXJ0eSBvZiB0aGUgZnJvbSBtZXRob2QgaXMgMS5cclxuICAgIHJldHVybiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBGbiwgdGhpc0FyZyAqLykge1xyXG4gICAgICAvLyAxLiBMZXQgQyBiZSB0aGUgdGhpcyB2YWx1ZS5cclxuICAgICAgdmFyIEMgPSB0aGlzO1xyXG5cclxuICAgICAgLy8gMi4gTGV0IGl0ZW1zIGJlIFRvT2JqZWN0KGFycmF5TGlrZSkuXHJcbiAgICAgIHZhciBpdGVtcyA9IE9iamVjdChhcnJheUxpa2UpO1xyXG5cclxuICAgICAgLy8gMy4gUmV0dXJuSWZBYnJ1cHQoaXRlbXMpLlxyXG4gICAgICBpZiAoYXJyYXlMaWtlID09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5mcm9tIHJlcXVpcmVzIGFuIGFycmF5LWxpa2Ugb2JqZWN0IC0gbm90IG51bGwgb3IgdW5kZWZpbmVkJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIDQuIElmIG1hcGZuIGlzIHVuZGVmaW5lZCwgdGhlbiBsZXQgbWFwcGluZyBiZSBmYWxzZS5cclxuICAgICAgdmFyIG1hcEZuID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB2b2lkIHVuZGVmaW5lZDtcclxuICAgICAgdmFyIFQ7XHJcbiAgICAgIGlmICh0eXBlb2YgbWFwRm4gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgLy8gNS4gZWxzZVxyXG4gICAgICAgIC8vIDUuIGEgSWYgSXNDYWxsYWJsZShtYXBmbikgaXMgZmFsc2UsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cclxuICAgICAgICBpZiAoIWlzQ2FsbGFibGUobWFwRm4pKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5mcm9tOiB3aGVuIHByb3ZpZGVkLCB0aGUgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gNS4gYi4gSWYgdGhpc0FyZyB3YXMgc3VwcGxpZWQsIGxldCBUIGJlIHRoaXNBcmc7IGVsc2UgbGV0IFQgYmUgdW5kZWZpbmVkLlxyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgVCA9IGFyZ3VtZW50c1syXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIDEwLiBMZXQgbGVuVmFsdWUgYmUgR2V0KGl0ZW1zLCBcImxlbmd0aFwiKS5cclxuICAgICAgLy8gMTEuIExldCBsZW4gYmUgVG9MZW5ndGgobGVuVmFsdWUpLlxyXG4gICAgICB2YXIgbGVuID0gdG9MZW5ndGgoaXRlbXMubGVuZ3RoKTtcclxuXHJcbiAgICAgIC8vIDEzLiBJZiBJc0NvbnN0cnVjdG9yKEMpIGlzIHRydWUsIHRoZW5cclxuICAgICAgLy8gMTMuIGEuIExldCBBIGJlIHRoZSByZXN1bHQgb2YgY2FsbGluZyB0aGUgW1tDb25zdHJ1Y3RdXSBpbnRlcm5hbCBtZXRob2QgXHJcbiAgICAgIC8vIG9mIEMgd2l0aCBhbiBhcmd1bWVudCBsaXN0IGNvbnRhaW5pbmcgdGhlIHNpbmdsZSBpdGVtIGxlbi5cclxuICAgICAgLy8gMTQuIGEuIEVsc2UsIExldCBBIGJlIEFycmF5Q3JlYXRlKGxlbikuXHJcbiAgICAgIHZhciBBID0gaXNDYWxsYWJsZShDKSA/IE9iamVjdChuZXcgQyhsZW4pKSA6IG5ldyBBcnJheShsZW4pO1xyXG5cclxuICAgICAgLy8gMTYuIExldCBrIGJlIDAuXHJcbiAgICAgIHZhciBrID0gMDtcclxuICAgICAgLy8gMTcuIFJlcGVhdCwgd2hpbGUgayA8IGxlbuKApiAoYWxzbyBzdGVwcyBhIC0gaClcclxuICAgICAgdmFyIGtWYWx1ZTtcclxuICAgICAgd2hpbGUgKGsgPCBsZW4pIHtcclxuICAgICAgICBrVmFsdWUgPSBpdGVtc1trXTtcclxuICAgICAgICBpZiAobWFwRm4pIHtcclxuICAgICAgICAgIEFba10gPSB0eXBlb2YgVCA9PT0gJ3VuZGVmaW5lZCcgPyBtYXBGbihrVmFsdWUsIGspIDogbWFwRm4uY2FsbChULCBrVmFsdWUsIGspO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBBW2tdID0ga1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBrICs9IDE7XHJcbiAgICAgIH1cclxuICAgICAgLy8gMTguIExldCBwdXRTdGF0dXMgYmUgUHV0KEEsIFwibGVuZ3RoXCIsIGxlbiwgdHJ1ZSkuXHJcbiAgICAgIEEubGVuZ3RoID0gbGVuO1xyXG4gICAgICAvLyAyMC4gUmV0dXJuIEEuXHJcbiAgICAgIHJldHVybiBBO1xyXG4gICAgfTtcclxuICB9KCkpO1xyXG59XHJcblxyXG5cclxuIl19
},{"promise-polyfill":2,"whatwg-fetch":3}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb21pc2UuanMiXSwibmFtZXMiOlsicm9vdCIsInNldFRpbWVvdXRGdW5jIiwic2V0VGltZW91dCIsIm5vb3AiLCJiaW5kIiwiZm4iLCJ0aGlzQXJnIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJQcm9taXNlIiwiVHlwZUVycm9yIiwiX3N0YXRlIiwiX2hhbmRsZWQiLCJfdmFsdWUiLCJ1bmRlZmluZWQiLCJfZGVmZXJyZWRzIiwiZG9SZXNvbHZlIiwiaGFuZGxlIiwic2VsZiIsImRlZmVycmVkIiwicHVzaCIsIl9pbW1lZGlhdGVGbiIsImNiIiwib25GdWxmaWxsZWQiLCJvblJlamVjdGVkIiwicmVzb2x2ZSIsInJlamVjdCIsInByb21pc2UiLCJyZXQiLCJlIiwibmV3VmFsdWUiLCJ0aGVuIiwiZmluYWxlIiwibGVuZ3RoIiwiX3VuaGFuZGxlZFJlamVjdGlvbkZuIiwiaSIsImxlbiIsIkhhbmRsZXIiLCJkb25lIiwidmFsdWUiLCJyZWFzb24iLCJleCIsInByb3RvdHlwZSIsInByb20iLCJjb25zdHJ1Y3RvciIsImFsbCIsImFyciIsImFyZ3MiLCJBcnJheSIsInNsaWNlIiwiY2FsbCIsInJlbWFpbmluZyIsInJlcyIsInZhbCIsInJhY2UiLCJ2YWx1ZXMiLCJzZXRJbW1lZGlhdGUiLCJlcnIiLCJjb25zb2xlIiwid2FybiIsIl9zZXRJbW1lZGlhdGVGbiIsIl9zZXRVbmhhbmRsZWRSZWplY3Rpb25GbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFDLFVBQVVBLElBQVYsRUFBZ0I7O0FBRWY7QUFDQTtBQUNBLE1BQUlDLGlCQUFpQkMsVUFBckI7O0FBRUEsV0FBU0MsSUFBVCxHQUFnQixDQUFFOztBQUVsQjtBQUNBLFdBQVNDLElBQVQsQ0FBY0MsRUFBZCxFQUFrQkMsT0FBbEIsRUFBMkI7QUFDekIsV0FBTyxZQUFZO0FBQ2pCRCxTQUFHRSxLQUFILENBQVNELE9BQVQsRUFBa0JFLFNBQWxCO0FBQ0QsS0FGRDtBQUdE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UCxHQUFpQnRELE9BQWpCO0FBQ0QsR0FGRCxNQUVPLElBQUksQ0FBQ1QsS0FBS1MsT0FBVixFQUFtQjtBQUN4QlQsU0FBS1MsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7QUFFRixDQXhPRCIsImZpbGUiOiJwcm9taXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChyb290KSB7XG5cbiAgLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gcHJvbWlzZS1wb2x5ZmlsbCB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbiAgLy8gb3RoZXIgY29kZSBtb2RpZnlpbmcgc2V0VGltZW91dCAobGlrZSBzaW5vbi51c2VGYWtlVGltZXJzKCkpXG4gIHZhciBzZXRUaW1lb3V0RnVuYyA9IHNldFRpbWVvdXQ7XG5cbiAgZnVuY3Rpb24gbm9vcCgpIHt9XG4gIFxuICAvLyBQb2x5ZmlsbCBmb3IgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcbiAgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBQcm9taXNlKGZuKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3Jyk7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcbiAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgdGhpcy5faGFuZGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2RlZmVycmVkcyA9IFtdO1xuXG4gICAgZG9SZXNvbHZlKGZuLCB0aGlzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZShzZWxmLCBkZWZlcnJlZCkge1xuICAgIHdoaWxlIChzZWxmLl9zdGF0ZSA9PT0gMykge1xuICAgICAgc2VsZiA9IHNlbGYuX3ZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDApIHtcbiAgICAgIHNlbGYuX2RlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc2VsZi5faGFuZGxlZCA9IHRydWU7XG4gICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG4gICAgICBpZiAoY2IgPT09IG51bGwpIHtcbiAgICAgICAgKHNlbGYuX3N0YXRlID09PSAxID8gcmVzb2x2ZSA6IHJlamVjdCkoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fdmFsdWUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgcmV0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0ID0gY2Ioc2VsZi5fdmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3QoZGVmZXJyZWQucHJvbWlzZSwgZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmUoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gUHJvbWlzZSBSZXNvbHV0aW9uIFByb2NlZHVyZTogaHR0cHM6Ly9naXRodWIuY29tL3Byb21pc2VzLWFwbHVzL3Byb21pc2VzLXNwZWMjdGhlLXByb21pc2UtcmVzb2x1dGlvbi1wcm9jZWR1cmVcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gc2VsZikgdGhyb3cgbmV3IFR5cGVFcnJvcignQSBwcm9taXNlIGNhbm5vdCBiZSByZXNvbHZlZCB3aXRoIGl0c2VsZi4nKTtcbiAgICAgIGlmIChuZXdWYWx1ZSAmJiAodHlwZW9mIG5ld1ZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgIHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcbiAgICAgICAgaWYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgIHNlbGYuX3N0YXRlID0gMztcbiAgICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIGZpbmFsZShzZWxmKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkb1Jlc29sdmUoYmluZCh0aGVuLCBuZXdWYWx1ZSksIHNlbGYpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc2VsZi5fc3RhdGUgPSAxO1xuICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgIGZpbmFsZShzZWxmKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZWplY3Qoc2VsZiwgZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVqZWN0KHNlbGYsIG5ld1ZhbHVlKSB7XG4gICAgc2VsZi5fc3RhdGUgPSAyO1xuICAgIHNlbGYuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgZmluYWxlKHNlbGYpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmluYWxlKHNlbGYpIHtcbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghc2VsZi5faGFuZGxlZCkge1xuICAgICAgICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYuX2RlZmVycmVkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaGFuZGxlKHNlbGYsIHNlbGYuX2RlZmVycmVkc1tpXSk7XG4gICAgfVxuICAgIHNlbGYuX2RlZmVycmVkcyA9IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9taXNlKSB7XG4gICAgdGhpcy5vbkZ1bGZpbGxlZCA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uRnVsZmlsbGVkIDogbnVsbDtcbiAgICB0aGlzLm9uUmVqZWN0ZWQgPSB0eXBlb2Ygb25SZWplY3RlZCA9PT0gJ2Z1bmN0aW9uJyA/IG9uUmVqZWN0ZWQgOiBudWxsO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gIH1cblxuICAvKipcbiAgICogVGFrZSBhIHBvdGVudGlhbGx5IG1pc2JlaGF2aW5nIHJlc29sdmVyIGZ1bmN0aW9uIGFuZCBtYWtlIHN1cmVcbiAgICogb25GdWxmaWxsZWQgYW5kIG9uUmVqZWN0ZWQgYXJlIG9ubHkgY2FsbGVkIG9uY2UuXG4gICAqXG4gICAqIE1ha2VzIG5vIGd1YXJhbnRlZXMgYWJvdXQgYXN5bmNocm9ueS5cbiAgICovXG4gIGZ1bmN0aW9uIGRvUmVzb2x2ZShmbiwgc2VsZikge1xuICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIGZuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgcmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG4gICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICByZWplY3Qoc2VsZiwgcmVhc29uKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgICByZWplY3Qoc2VsZiwgZXgpO1xuICAgIH1cbiAgfVxuXG4gIFByb21pc2UucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xuICB9O1xuXG4gIFByb21pc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICB2YXIgcHJvbSA9IG5ldyAodGhpcy5jb25zdHJ1Y3Rvcikobm9vcCk7XG5cbiAgICBoYW5kbGUodGhpcywgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb20pKTtcbiAgICByZXR1cm4gcHJvbTtcbiAgfTtcblxuICBQcm9taXNlLmFsbCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzb2x2ZShbXSk7XG4gICAgICB2YXIgcmVtYWluaW5nID0gYXJncy5sZW5ndGg7XG5cbiAgICAgIGZ1bmN0aW9uIHJlcyhpLCB2YWwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodmFsICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgdmFyIHRoZW4gPSB2YWwudGhlbjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICB0aGVuLmNhbGwodmFsLCBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgcmVzKGksIHZhbCk7XG4gICAgICAgICAgICAgIH0sIHJlamVjdCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYXJnc1tpXSA9IHZhbDtcbiAgICAgICAgICBpZiAoLS1yZW1haW5pbmcgPT09IDApIHtcbiAgICAgICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIHJlamVjdChleCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlcyhpLCBhcmdzW2ldKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBQcm9taXNlLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgUHJvbWlzZS5yZWplY3QgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVqZWN0KHZhbHVlKTtcbiAgICB9KTtcbiAgfTtcblxuICBQcm9taXNlLnJhY2UgPSBmdW5jdGlvbiAodmFsdWVzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWx1ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFsdWVzW2ldLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICAvLyBVc2UgcG9seWZpbGwgZm9yIHNldEltbWVkaWF0ZSBmb3IgcGVyZm9ybWFuY2UgZ2FpbnNcbiAgUHJvbWlzZS5faW1tZWRpYXRlRm4gPSAodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiBmdW5jdGlvbiAoZm4pIHsgc2V0SW1tZWRpYXRlKGZuKTsgfSkgfHxcbiAgICBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHNldFRpbWVvdXRGdW5jKGZuLCAwKTtcbiAgICB9O1xuXG4gIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZnVuY3Rpb24gX3VuaGFuZGxlZFJlamVjdGlvbkZuKGVycikge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZSkge1xuICAgICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246JywgZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGltbWVkaWF0ZSBmdW5jdGlvbiB0byBleGVjdXRlIGNhbGxiYWNrc1xuICAgKiBAcGFyYW0gZm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0byBleGVjdXRlXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBQcm9taXNlLl9zZXRJbW1lZGlhdGVGbiA9IGZ1bmN0aW9uIF9zZXRJbW1lZGlhdGVGbihmbikge1xuICAgIFByb21pc2UuX2ltbWVkaWF0ZUZuID0gZm47XG4gIH07XG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiB1bmhhbmRsZWQgcmVqZWN0aW9uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gdW5oYW5kbGVkIHJlamVjdGlvblxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgUHJvbWlzZS5fc2V0VW5oYW5kbGVkUmVqZWN0aW9uRm4gPSBmdW5jdGlvbiBfc2V0VW5oYW5kbGVkUmVqZWN0aW9uRm4oZm4pIHtcbiAgICBQcm9taXNlLl91bmhhbmRsZWRSZWplY3Rpb25GbiA9IGZuO1xuICB9O1xuICBcbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuICB9IGVsc2UgaWYgKCFyb290LlByb21pc2UpIHtcbiAgICByb290LlByb21pc2UgPSBQcm9taXNlO1xuICB9XG5cbn0pKHRoaXMpO1xuIl19
},{}],3:[function(require,module,exports){
'use strict';

(function (self) {
  'use strict';

  if (self.fetch) {
    return;
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && function () {
      try {
        new Blob();
        return true;
      } catch (e) {
        return false;
      }
    }(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

    var isDataView = function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    };

    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name');
    }
    return name.toLowerCase();
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value;
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function next() {
        var value = items.shift();
        return { done: value === undefined, value: value };
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }

    return iterator;
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function (name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ',' + value : value;
  };

  Headers.prototype['delete'] = function (name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function (name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  };

  Headers.prototype.has = function (name) {
    return this.map.hasOwnProperty(normalizeName(name));
  };

  Headers.prototype.set = function (name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function (callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push(name);
    });
    return iteratorFor(items);
  };

  Headers.prototype.values = function () {
    var items = [];
    this.forEach(function (value) {
      items.push(value);
    });
    return iteratorFor(items);
  };

  Headers.prototype.entries = function () {
    var items = [];
    this.forEach(function (value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items);
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'));
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function (resolve, reject) {
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
    });
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise;
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise;
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('');
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0);
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer;
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function (body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type');
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function () {
        var rejected = consumed(this);
        if (rejected) {
          return rejected;
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob);
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob');
        } else {
          return Promise.resolve(new Blob([this._bodyText]));
        }
      };

      this.arrayBuffer = function () {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
        } else {
          return this.blob().then(readBlobAsArrayBuffer);
        }
      };
    }

    this.text = function () {
      var rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };

    if (support.formData) {
      this.formData = function () {
        return this.text().then(decode);
      };
    }

    this.json = function () {
      return this.text().then(JSON.parse);
    };

    return this;
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method;
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read');
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests');
    }
    this._initBody(body);
  }

  Request.prototype.clone = function () {
    return new Request(this, { body: this._bodyInit });
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function (bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form;
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split(/\r?\n/).forEach(function (line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers;
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function () {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    });
  };

  Response.error = function () {
    var response = new Response(null, { status: 0, statusText: '' });
    response.type = 'error';
    return response;
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function (url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code');
    }

    return new Response(null, { status: status, headers: { location: url } });
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function (input, init) {
    return new Promise(function (resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function () {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function () {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function (value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    });
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZldGNoLmpzIl0sIm5hbWVzIjpbInNlbGYiLCJmZXRjaCIsInN1cHBvcnQiLCJzZWFyY2hQYXJhbXMiLCJpdGVyYWJsZSIsIlN5bWJvbCIsImJsb2IiLCJCbG9iIiwiZSIsImZvcm1EYXRhIiwiYXJyYXlCdWZmZXIiLCJ2aWV3Q2xhc3NlcyIsImlzRGF0YVZpZXciLCJvYmoiLCJEYXRhVmlldyIsInByb3RvdHlwZSIsImlzUHJvdG90eXBlT2YiLCJpc0FycmF5QnVmZmVyVmlldyIsIkFycmF5QnVmZmVyIiwiaXNWaWV3IiwiaW5kZXhPZiIsIk9iamVjdCIsInRvU3RyaW5nIiwiY2FsbCIsIm5vcm1hbGl6ZU5hbWUiLCJuYW1lIiwiU3RyaW5nIiwidGVzdCIsIlR5cGVFcnJvciIsInRvTG93ZXJDYXNlIiwibm9ybWFsaXplVmFsdWUiLCJ2YWx1ZSIsIml0ZXJhdG9yRm9yIiwiaXRlbXMiLCJpdGVyYXRvciIsIm5leHQiLCJzaGlmdCIsImRvbmUiLCJ1bmRlZmluZWQiLCJIZWFkZXJzIiwiaGVhZGVycyIsIm1hcCIsImZvckVhY2giLCJhcHBlbmQiLCJBcnJheSIsImlzQXJyYXkiLCJoZWFkZXIiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwib2xkVmFsdWUiLCJnZXQiLCJoYXMiLCJoYXNPd25Qcm9wZXJ0eSIsInNldCIsImNhbGxiYWNrIiwidGhpc0FyZyIsImtleXMiLCJwdXNoIiwidmFsdWVzIiwiZW50cmllcyIsImNvbnN1bWVkIiwiYm9keSIsImJvZHlVc2VkIiwiUHJvbWlzZSIsInJlamVjdCIsImZpbGVSZWFkZXJSZWFkeSIsInJlYWRlciIsInJlc29sdmUiLCJvbmxvYWQiLCJyZXN1bHQiLCJvbmVycm9yIiwiZXJyb3IiLCJyZWFkQmxvYkFzQXJyYXlCdWZmZXIiLCJGaWxlUmVhZGVyIiwicHJvbWlzZSIsInJlYWRBc0FycmF5QnVmZmVyIiwicmVhZEJsb2JBc1RleHQiLCJyZWFkQXNUZXh0IiwicmVhZEFycmF5QnVmZmVyQXNUZXh0IiwiYnVmIiwidmlldyIsIlVpbnQ4QXJyYXkiLCJjaGFycyIsImxlbmd0aCIsImkiLCJmcm9tQ2hhckNvZGUiLCJqb2luIiwiYnVmZmVyQ2xvbmUiLCJzbGljZSIsImJ5dGVMZW5ndGgiLCJidWZmZXIiLCJCb2R5IiwiX2luaXRCb2R5IiwiX2JvZHlJbml0IiwiX2JvZHlUZXh0IiwiX2JvZHlCbG9iIiwiRm9ybURhdGEiLCJfYm9keUZvcm1EYXRhIiwiVVJMU2VhcmNoUGFyYW1zIiwiX2JvZHlBcnJheUJ1ZmZlciIsIkVycm9yIiwidHlwZSIsInJlamVjdGVkIiwidGhlbiIsInRleHQiLCJkZWNvZGUiLCJqc29uIiwiSlNPTiIsInBhcnNlIiwibWV0aG9kcyIsIm5vcm1hbGl6ZU1ldGhvZCIsIm1ldGhvZCIsInVwY2FzZWQiLCJ0b1VwcGVyQ2FzZSIsIlJlcXVlc3QiLCJpbnB1dCIsIm9wdGlvbnMiLCJ1cmwiLCJjcmVkZW50aWFscyIsIm1vZGUiLCJyZWZlcnJlciIsImNsb25lIiwiZm9ybSIsInRyaW0iLCJzcGxpdCIsImJ5dGVzIiwicmVwbGFjZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhcnNlSGVhZGVycyIsInJhd0hlYWRlcnMiLCJsaW5lIiwicGFydHMiLCJrZXkiLCJSZXNwb25zZSIsImJvZHlJbml0Iiwic3RhdHVzIiwib2siLCJzdGF0dXNUZXh0IiwicmVzcG9uc2UiLCJyZWRpcmVjdFN0YXR1c2VzIiwicmVkaXJlY3QiLCJSYW5nZUVycm9yIiwibG9jYXRpb24iLCJpbml0IiwicmVxdWVzdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIiwicmVzcG9uc2VVUkwiLCJyZXNwb25zZVRleHQiLCJvbnRpbWVvdXQiLCJvcGVuIiwid2l0aENyZWRlbnRpYWxzIiwicmVzcG9uc2VUeXBlIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJwb2x5ZmlsbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFVBQVNBLElBQVQsRUFBZTtBQUNkOztBQUVBLE1BQUlBLEtBQUtD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U0FBSixDQUFjLHdCQUFkLENBQVA7QUFDRCxPQUZEOztBQUlBb0gsVUFBSU0sSUFBSixDQUFTUCxRQUFRakMsTUFBakIsRUFBeUJpQyxRQUFRM0IsR0FBakMsRUFBc0MsSUFBdEM7O0FBRUEsVUFBSTJCLFFBQVExQixXQUFSLEtBQXdCLFNBQTVCLEVBQXVDO0FBQ3JDMkIsWUFBSU8sZUFBSixHQUFzQixJQUF0QjtBQUNEOztBQUVELFVBQUksa0JBQWtCUCxHQUFsQixJQUF5QjlJLFFBQVFJLElBQXJDLEVBQTJDO0FBQ3pDMEksWUFBSVEsWUFBSixHQUFtQixNQUFuQjtBQUNEOztBQUVEVCxjQUFRdkcsT0FBUixDQUFnQkUsT0FBaEIsQ0FBd0IsVUFBU1gsS0FBVCxFQUFnQk4sSUFBaEIsRUFBc0I7QUFDNUN1SCxZQUFJUyxnQkFBSixDQUFxQmhJLElBQXJCLEVBQTJCTSxLQUEzQjtBQUNELE9BRkQ7O0FBSUFpSCxVQUFJVSxJQUFKLENBQVMsT0FBT1gsUUFBUW5ELFNBQWYsS0FBNkIsV0FBN0IsR0FBMkMsSUFBM0MsR0FBa0RtRCxRQUFRbkQsU0FBbkU7QUFDRCxLQXRDTSxDQUFQO0FBdUNELEdBeENEO0FBeUNBNUYsT0FBS0MsS0FBTCxDQUFXMEosUUFBWCxHQUFzQixJQUF0QjtBQUNELENBNWNELEVBNGNHLE9BQU8zSixJQUFQLEtBQWdCLFdBQWhCLEdBQThCQSxJQUE5QixZQTVjSCIsImZpbGUiOiJmZXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgICByYXdIZWFkZXJzLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6JylcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKVxuICAgICAgaWYgKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5qb2luKCc6JykudHJpbSgpXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gaGVhZGVyc1xuICB9XG5cbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgICB0aGlzLnN0YXR1cyA9ICdzdGF0dXMnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1cyA6IDIwMFxuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSydcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KVxuICB9XG5cbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KVxuICAgIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuICBSZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxuICB9XG5cbiAgc2VsZi5IZWFkZXJzID0gSGVhZGVyc1xuICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZVxuXG4gIHNlbGYuZmV0Y2ggPSBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKVxuICAgICAgfVxuXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSlcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgICB9KVxuICB9XG4gIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcyk7XG4iXX0=
},{}]},{},[1])