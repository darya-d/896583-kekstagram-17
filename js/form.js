'use strict';
// form.js - module of images uploading and editing
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var imgEditForm = document.querySelector('.img-upload__overlay');
  var closeImgEditForm = imgEditForm.querySelector('#upload-cancel');
  var imgPreview = document.querySelector('.img-upload__preview > img');
  var effectLevelLine = document.querySelector('.img-upload__effect-level');

  var commentsArea = document.querySelector('.text__description');
  var hashtagsArea = document.querySelector('.text__hashtags');

  var onOpenUploadFile = function () {
    imgEditForm.classList.remove('hidden');
    document.addEventListener('keydown', onEditFormEscPress);
    changeEffect('effects__preview--none');
    effectLevelLine.classList.add('hidden');
    document.querySelector('.effects__label').click();// 'none' effect by default
  };

  /**
   * Function of closing the edit form (handler)
   */
  var onCloseUploadFile = function () {
    imgEditForm.classList.add('hidden');
    document.removeEventListener('keydown', onEditFormEscPress);
    document.removeEventListener('keydown', onEditFormEscPress);
    document.removeEventListener('click', onOutsideAreaClick);
  };

  // Create an event of opening edit form by adding `change` event
  uploadFile.addEventListener('change', onOpenUploadFile);

  // Create an event of closing edit form by clicking on the closing button
  closeImgEditForm.addEventListener('click', onCloseUploadFile);


  var clearForm = function () {
    uploadFile.value = '';
    hashtagsArea.value = '';
    commentsArea.value = '';
  };

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


  // ВЫНЕСТИ в отдельный модуль form-upload.js, отвечающий за отправку данных на сервер
  var form = document.querySelector('.img-upload__form');
  var successTemplate = document.querySelector('#success');
  var errorTemplate = document.querySelector('#error');
  var messageTemplate = document.querySelector('#messages');
  var main = document.querySelector('main');

  var createUploadMessage = function () {
    var message = messageTemplate.content.cloneNode(true);
    return message;
  };

  var showUploadMessage = function () {
    var uploadMessage = createUploadMessage();
    main.appendChild(uploadMessage);
  };

  var hideUploadMessage = function () {
    var currentMessage = main.querySelector('.img-upload__message--loading');
    main.removeChild(currentMessage);
  };

  var currentBlock = '';
  var innerBlock = '';

  var createMessage = function (template) {
    var message = template.content.cloneNode(true);
    main.appendChild(message);
    // Разметку сообщения, которая находится блоке #success внутри шаблона template, нужно разместить в main.
    if (template === successTemplate) {
      currentBlock = main.querySelector('.success');
      innerBlock = main.querySelector('.success__inner');
      var successButton = currentBlock.querySelector('.success__button');
      // Сообщение должно исчезать после нажатия на кнопку .success__button, по нажатию на клавишу Esc и по клику на произвольную область экрана.
      var onSuccessButtonClick = function () {
        main.removeChild(currentBlock);
        successButton.removeEventListener('click', onSuccessButtonClick);
        document.removeEventListener('keydown', onEditFormEscPress);
        document.removeEventListener('click', onOutsideAreaClick);
      };
      successButton.addEventListener('click', onSuccessButtonClick);
      // Разметку сообщения, которая находится блоке #error внутри шаблона template, нужно разместить в main.
    } else if (template === errorTemplate) {
      currentBlock = main.querySelector('.error');
      innerBlock = main.querySelector('.error__inner');
      var errorButtons = currentBlock.querySelectorAll('.error__button');
      errorButtons.forEach(function (errorButton) {
        var onErrorButtonClick = function () {
          main.removeChild(currentBlock);
          errorButton.removeEventListener('click', onErrorButtonClick);
          document.removeEventListener('keydown', onEditFormEscPress);
          document.removeEventListener('click', onOutsideAreaClick);
        };
        errorButton.addEventListener('click', onErrorButtonClick);
      });
    }
  };

  /**
   * Function of closing the edit form by using ESC (handler)
   * @param {*} evt
   */
  var onEditFormEscPress = function (evt) {
    if (evt.keyCode === window.utils.KEY_CODE.ESC && evt.target !== commentsArea) {
      onCloseUploadFile();
      main.removeChild(currentBlock);
    }
  };

  /**
   * Function of closing the edit form by clicking on the outside area
   *
   * @param {*} evt
   */
  var onOutsideAreaClick = function (evt) {
    if (evt.target !== innerBlock && evt.target === currentBlock) {
      onCloseUploadFile();
      main.removeChild(currentBlock);
    }
  };

  document.addEventListener('keydown', onEditFormEscPress);
  document.addEventListener('click', onOutsideAreaClick);

  /**
   * Function of successful sending form data
   *
   * @param {*} response
   */
  // При успешной отправке формы, форма редактирования изображения закрывается, все данные, введённые в форму и контрол фильтра, приходят в исходное состояние. Поле загрузки фотографии, стилизованное под букву «О» в логотипе, очищается.
  // На экран выводится сообщение об успешной загрузке изображения.
  var onLoadSuccess = function (response) {
    if (response) {
      createMessage(successTemplate);
      imgEditForm.classList.add('hidden');
      clearForm();
      hideUploadMessage();
    }
  };

  /**
   * Function of unsuccessful sending form data
   *
   * @param {*} response
   */
  var onLoadError = function (response) {
    if (response) {
      createMessage(errorTemplate);
      imgEditForm.classList.add('hidden');
      clearForm();
      hideUploadMessage();
    }
  };

  /**
   * Function of sending data to the server
   *
   * @param {*} evt
   */
  var onFormSubmissionSend = function (evt) {
    evt.preventDefault();
    showUploadMessage();
    // var save = function (data, onLoad, onError)
    window.backend.save(new FormData(form), onLoadSuccess, onLoadError);
  };

  // Event `submit` on button for sending data to the server
  form.addEventListener('submit', onFormSubmissionSend);

  // add object to the global scope
  window.form = {
    imgPreview: imgPreview,
    clearForm: clearForm
  };

})();
