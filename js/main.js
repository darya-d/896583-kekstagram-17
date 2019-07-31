'use strict';
// main.js - module of images uploading and editing
(function () {
  var KEYCODE_ESC = 27;

  var uploadFile = document.querySelector('#upload-file');
  var imgEditForm = document.querySelector('.img-upload__overlay');
  var closeImgEditForm = imgEditForm.querySelector('#upload-cancel');

  var commentsArea = document.querySelector('.text__description');
  // var hashtagsArea = document.querySelector('.text__hashtags');

  var onOpenUploadFile = function () {
    imgEditForm.classList.remove('hidden');
    document.addEventListener('keydown', onImgEditFormEscPress);
    changeEffect('effects__preview--none');
    effectLevelLine.classList.add('hidden');
    document.querySelector('.effects__label').click();// 'none' effect by default
  };

  /**
   * Function of closing the edit form (handler)
   */
  var onCloseUploadFile = function () {
    imgEditForm.classList.add('hidden');
    document.removeEventListener('keydown', onImgEditFormEscPress);
  };

  /**
   * Function of closing the edit formby by using ESC (handler)
   * @param {*} evt
   */
  var onImgEditFormEscPress = function (evt) {
    if (evt.keyCode === KEYCODE_ESC && evt.target !== commentsArea) {
      onCloseUploadFile();
    }
  };

  // Create an event of opening edit form by adding `change` event
  uploadFile.addEventListener('change', onOpenUploadFile);

  // Create an event of closing edit form by clicking on the closing button
  closeImgEditForm.addEventListener('click', onCloseUploadFile);

  var imgPreview = document.querySelector('.img-upload__preview > img');
  var effectLevelLine = document.querySelector('.img-upload__effect-level');

  /**
   * Функция изменения эффектов: добавляет класс, удаляет ненужные свойства, устанавливает значения по умолчанию
   *
   * @param {*} className - название добавляемого класса
   */
  var changeEffect = function (className) {
    effectLevelLine.classList.remove('hidden');
    imgPreview.removeAttribute('class');
    imgPreview.classList.add(className);
    imgPreview.style.removeProperty('filter');
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
  };

  /**
   * Функция добавления классов в соответствии с выбранным эффектом
   * @param {*} evt
   */
  var onChangeEffect = function (evt) {
    switch (true) {
      case evt.target.classList.contains('effects__preview--none'):
        changeEffect('effects__preview--none');
        effectLevelLine.classList.add('hidden'); // Hide level line of filter effect by choosing the `none` effect
        break;
      case evt.target.classList.contains('effects__preview--chrome'):
        changeEffect('effects__preview--chrome');
        break;
      case evt.target.classList.contains('effects__preview--sepia'):
        changeEffect('effects__preview--sepia');
        break;
      case evt.target.classList.contains('effects__preview--marvin'):
        changeEffect('effects__preview--marvin');
        break;
      case evt.target.classList.contains('effects__preview--phobos'):
        changeEffect('effects__preview--phobos');
        break;
      case evt.target.classList.contains('effects__preview--heat'):
        changeEffect('effects__preview--heat');
        break;
    }
  };

  // Add 'Click' event, which calls change of filter effects
  imgEditForm.addEventListener('click', onChangeEffect);

  // ==== 5th MODULE - DRAG-AND-DROP ====
  // Add handlers for mousedown, mousemove и mouseup events
  var EffectPinValue = {
    MAX: 450,
    MIN: 0
  };

  var effectLevelFieldset = document.querySelector('.effect-level');
  var effectLevelPin = effectLevelFieldset.querySelector('.effect-level__pin');
  var effectLevelDepth = effectLevelFieldset.querySelector('.effect-level__depth');
  var effectLevelValue = effectLevelFieldset.querySelector('.effect-level__value');

  var limits = effectLevelLine.getBoundingClientRect();

  // The mousemove and mouseup handlers should be added only when users are calling the mousedown handler.
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };

    /**
     * Function of the mousemove handler which runs the change logic of the pin
     *
     * @param {*} moveEvt
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if (startCoords.x < limits.left) {
        effectLevelPin.style.left = EffectPinValue.MIN + 'px';
        effectLevelDepth.style.width = EffectPinValue.MIN + 'px';
      } else if (startCoords.x > limits.left && startCoords.x < limits.right) {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
        effectLevelDepth.style.width = (effectLevelDepth.offsetWidth - shift.x) + 'px';

        switch (true) {
          case document.activeElement.value === 'chrome':
            effectLevelValue.value = (effectLevelPin.offsetLeft - shift.x) / (limits.right - limits.left);
            imgPreview.style.filter = 'grayscale(' + effectLevelValue.value + ')';
            break;
          case document.activeElement.value === 'sepia':
            effectLevelValue.value = (effectLevelPin.offsetLeft - shift.x) / (limits.right - limits.left);
            imgPreview.style.filter = 'sepia(' + effectLevelValue.value + ')';
            break;
          case document.activeElement.value === 'marvin':
            effectLevelValue.value = (((effectLevelPin.offsetLeft - shift.x) / (limits.right - limits.left)) * 100);
            imgPreview.style.filter = 'invert(' + effectLevelValue.value + '%' + ')';
            break;
          case document.activeElement.value === 'phobos':
            effectLevelValue.value = (3 * (effectLevelPin.offsetLeft - shift.x) / (limits.right - limits.left));
            imgPreview.style.filter = 'blur(' + effectLevelValue.value + 'px' + ')';
            break;
          case document.activeElement.value === 'heat':
            effectLevelValue.value = ((2 * (effectLevelPin.offsetLeft - shift.x) + (limits.right - limits.left)) / (limits.right - limits.left));
            imgPreview.style.filter = 'brightness(' + effectLevelValue.value + ')';
            break;
        }

      } else if (startCoords.x > limits.right) {
        effectLevelPin.style.left = EffectPinValue.MAX + 'px';
        effectLevelDepth.style.width = EffectPinValue.MAX + 'px';
      }
    };

    /**
     * Function of the mouseup handler which duplicate pin coordinates
     *
     * @param {*} upEvt
     */
    var onMoseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMoseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMoseUp);
  });

  // add object to the global scope
  window.main = {
    imgPreview: imgPreview
  };
})();
