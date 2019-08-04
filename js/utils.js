'use strict';

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

  // Сообщение об ошибке
  var createErrorMessage = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; outline: 3px solid blue; text-align: center; background-color: rbga(255, 0, 0, 0.8);';
    node.style.fontSize = '24px';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);

    node.addEventListener('click', function () {
      node.classList.add('hidden');
    });
  };

  window.utils = {
    KEY_CODE: KEY_CODE,
    open: open,
    close: close,
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber,
    createErrorMessage: createErrorMessage
  };

})();
