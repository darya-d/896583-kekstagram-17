'use strict';
// utils.js - universal vars.

(function () {
  var KEY_CODE = {
    ENTER: 13,
    ESC: 27
  };

  var open = function (hiddenBlock) {
    hiddenBlock.classList.remove('hidden');
  };

  var close = function (shownBlock) {
    shownBlock.classList.add('hidden');
  };

  // Получаем рандомное число
  var getRandomNumber = function (range, isNoZero) {
    var randomNumber = Math.floor(Math.random() * range);
    if (isNoZero) {
      randomNumber = Math.floor(Math.random() * (range - 1) + 1);
    }
    return randomNumber;
  };

  // Получаем рандомное элемент массива
  var getRandomElement = function (elements) {
    return elements[getRandomNumber(0, elements.length - 1)];
  };

  window.utils = {
    KEY_CODE: KEY_CODE,
    open: open,
    close: close,
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber
  };

})();
