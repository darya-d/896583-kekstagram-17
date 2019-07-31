'use strict';
// debounce.js - module of debounce by using timer
(function () {
  var DEBOUNCE_INTERVAL = 500; // 0.5 seconds

  var debounce = function (callback) {
    var lastTimeout = null;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;
})();
