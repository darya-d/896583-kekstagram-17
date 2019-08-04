'use strict';
// debounce.js - debounce by using timer
(function () {
  var DEBOUNCE_INTERVAL = 500; // 0.5 seconds - call frequency

  // Решение проблемы потенциального конфликта таймеров: чтобы функция debounce возвращала другую функцию, у которой будет свой таймер и она будет контролировать свое выполнение самостоятельно.
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  // var debounce = function (cb) {
  //   var lastTimeout = null;
  //   if (lastTimeout) {
  //     clearTimeout(lastTimeout);
  //   }
  //   lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
  // };

  // add object to the global scope
  window.debounce = {
    debounce: debounce,
    clearTimeout: clearTimeout,
    setTimeout: setTimeout,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL
  };
})();
