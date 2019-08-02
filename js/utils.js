'use strict';

(function () {
  var KEY_CODE = {
    ENTER: 13,
    ESC: 27
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KEY_CODE.ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      action();
    }
  };

  window.utils = {
    KEY_CODE: KEY_CODE,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };

})();
