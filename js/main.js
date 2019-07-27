'use strict';

(function () {
  // ==== 4th MODULE - EVENTS ====
  var KEYCODE_ESC = 27;

  var uploadFile = document.querySelector('#upload-file');
  var imgEditForm = document.querySelector('.img-upload__overlay');
  var closeImgEditForm = imgEditForm.querySelector('#upload-cancel');

  var commentsArea = document.querySelector('.text__description');
  // var hashtagsArea = document.querySelector('.text__hashtags');

  // Add validation: if the focus is in the comment input field, pressing Esc doesn't close the image editing form.
  // Open the edit form and auto add 'none' effect
  var onOpenUploadFile = function () {
    imgEditForm.classList.remove('hidden');
    document.addEventListener('keydown', onImgEditFormEscPress);
    addEffect('effects__preview--none');
    effectLevelLine.classList.add('hidden');
  };

  // Close the edit form
  var onCloseUploadFile = function () {
    imgEditForm.classList.add('hidden');
    document.removeEventListener('keydown', onImgEditFormEscPress);
  };

  // Create a handler for event of closing edit form by using ESC
  var onImgEditFormEscPress = function (evt) {
    if (evt.keyCode === KEYCODE_ESC && evt.target !== commentsArea) {
      onCloseUploadFile();
    }
  };

  // Create an event of opening edit form by adding `change` event
  uploadFile.addEventListener('change', onOpenUploadFile);

  // Create an event of closing edit form by clicking on the closing button
  closeImgEditForm.addEventListener('click', onCloseUploadFile);

  // ==== 4.2. Overlay effect on the image
  // Intensity of the effect is controlled by moving the pin in the `.effect-level__pin` slider. The effect level is recorded in the `.effect-level__value` field. When the intensity level of the effect changes, the CSS styles of the `.img-upload__preview` element are updated.
  // Reset the saturation level to the initial value (100%) by switching effects. The slider, CSS-style of the image and value of the field should be updated.

  window.imgPreview = document.querySelector('.img-upload__preview > img');
  var filterEffects = document.querySelector('.img-upload__effects');
  var effectLevelLine = document.querySelector('.img-upload__effect-level');

  // Add filter effects by changing classes; show the level line of filter effect
  var addEffect = function (className) {
    window.imgPreview.removeAttribute('class');
    window.imgPreview.classList.add(className);
    effectLevelLine.classList.remove('hidden');
  };

  filterEffects.addEventListener('click', function () {
    effectLevelValue.setAttribute('value', 100);
    getStyleSlider(effectPin.MAX);
  });

  // Add to the picture (which inside .img-upload__preview) the .CSS-class that corresponds to the effect by changing the effect
  // Hide level line of filter effect by choosing the `none` effect
  var changeEffect = function (evt) {
    switch (true) {
      case evt.target.classList.contains('effects__preview--none'):
        addEffect('effects__preview--none');
        effectLevelLine.classList.add('hidden');
        break;
      case evt.target.classList.contains('effects__preview--chrome'):
        addEffect('effects__preview--chrome');
        break;
      case evt.target.classList.contains('effects__preview--sepia'):
        addEffect('effects__preview--sepia');
        break;
      case evt.target.classList.contains('effects__preview--marvin'):
        addEffect('effects__preview--marvin');
        break;
      case evt.target.classList.contains('effects__preview--phobos'):
        addEffect('effects__preview--phobos');
        break;
      case evt.target.classList.contains('effects__preview--heat'):
        addEffect('effects__preview--heat');
        break;
    }
  };

  // Add 'Click' event, which calls change of filter effects
  imgEditForm.addEventListener('click', changeEffect);

  // ==== 5th MODULE - DRAG-AND-DROP ====
  // Add handlers for mousedown, mousemove и mouseup events
  var filters = {}; // an empty object

  var effectPin = {
    MAX: 450,
    MIN: 0
  };

  var effectLevelFieldset = document.querySelector('.effect-level');
  var effectLevelPin = effectLevelFieldset.querySelector('.effect-level__pin');
  var effectLevelValue = effectLevelFieldset.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevelFieldset.querySelector('.effect-level__depth');

  var getStyleSlider = function (value) {
    effectLevelPin.style.left = value + 'px';
    effectLevelDepth.style.width = value + 'px';
  };

  // The mousemove and mouseup handlers should be added only when users are calling the mousedown handler.
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // The mousemove handler runs change logic of the pin
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      // Calculate the new coordinates of the pin based on the change of its position
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Restrict dragging: the slider can only move horizontally. Dragging is limited to the outside of the slider fielset.
      // Apply new coordinates of the pin through the styles to the element and record it in the effect level field (coordinates of middle position of the pin are recorded in this field).
      // HTMLElement.offsetLeft - returns the offset of the upper left corner of the current element from the parent HTMLElement.offsetParent node in pixels .
      var valueEffectPin = effectLevelPin.offsetLeft - shift.x;

      // Используем тернарный оператор `?` по схеме `условие ? значение1 : значение2`. Проверяется условие, затем если оно верно – возвращается значение1, если неверно – значение2.
      valueEffectPin = valueEffectPin < effectPin.MAX ? valueEffectPin : effectPin.MAX;
      valueEffectPin = valueEffectPin > effectPin.MIN ? valueEffectPin : effectPin.MIN;

      var relationScaleToValue = Math.round(100 / effectPin.MAX * valueEffectPin);

      getStyleSlider(valueEffectPin);

      // Set to the element effectLevelValue an attribute according to the scheme `elem.setAttribute (name, value)`
      effectLevelValue.setAttribute('value', relationScaleToValue);

      // Change the depth of the effect by moving the pin. The value of the CSS filter is recorded in one bounds, and the position of the slider in others bounds. Use the proportion.
      // from 0 to 100
      var valuePin = effectLevelValue.value;
      // from 0 to 1
      var valueFromZeroToOne = valuePin / 100;
      // from 0 to 3
      var valueFromZeroToThree = Math.round(valueFromZeroToOne * 3);
      // from 1 to 3
      var valRoundFromOneToThree = valueFromZeroToThree > 0 ? valueFromZeroToThree : 1;

      // Change the values of the image CSS-filter
      var valueToEffect = {
        'chrome': 'grayscale(' + valueFromZeroToOne + ')',
        'sepia': 'sepia(' + valueFromZeroToOne + ')',
        'marvin': 'invert(' + valuePin + '%)',
        'phobos': 'blur(' + valueFromZeroToThree + 'px)',
        'heat': 'brightness(' + valRoundFromOneToThree + ')'
      };

      // `object.style.filter` - the DOM Style filter Property, which used to add visual effects or filter effects to images.
      window.imgPreview.style.filter = valueToEffect[filters.filterName];
    };

    // Calculation of pin coordinates and their record in the field are duplicated in the mouseup handler, because our user can click the mouse on the slider, but not move it anywhere.
    var onMoseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMoseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMoseUp);
  });

})();
