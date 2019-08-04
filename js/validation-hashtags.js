'use strict';
(function () {
  var HashtagMax = {
    AMOUNT: 5,
    LENGTH: 20,
  };

  var hashtagsArea = window.form.hashtagsArea; // document.querySelector('.text__hashtags')

  // если фокус находится в поле ввода Хэштега, нажатие на Esc НЕ ДОЛЖНО приводить к закрытию формы редактирования изображения.
  // hashtagsArea.addEventListener('focus', ?);
  // hashtagsArea.addEventListener('blur', ?);

  // Хэштег не начинается с символа #
  var isNotStartWithHash = function (array) {
    return array.some(function (tag) {
      return tag[0] !== '#';
    });
  };

  // хеш-тег состоит только из одной решётки
  var isOnlyHash = function (array) {
    return array.some(function (tag) {
      return tag[0] === '#' && tag.length === 1;
    });
  };

  // Хэштеги не разделяются пробелами
  // var isNoSpaceBetween = function (array) {
  //   return array[0] !== undefined && array[array.length - 1].search(/\w/) !== 0 || array[array.length - 1] === '_';
  // };

  // максимальная длина одного Хэштега превышает 20 символов, включая решётку
  var isMoreThanMaxLength = function (array) {
    return array.some(function (tag) {
      return tag.length > HashtagMax.LENGTH;
    });
  };

  // один и тот же Хэштег использован дважды
  // var isSameHash = function (array) {
  //   //??
  // };

  var drawOutline = function () {
    hashtagsArea.style = 'outline: 2px solid #D30000';
  };

  // Для проверки валидности Хэштегов, вам придётся набор Хэштегов превратить в массив, воспользовавшись методом split. Он разбивает строки на массивы. После этого, вы можете написать цикл, который будет ходить по полученному массиву и проверять каждый из Хэштегов на предмет соответствия ограничениям. Если хотя бы один из тегов не проходит нужных проверок, можно воспользоваться методом setCustomValidity для того, чтобы задать полю правильное сообщение об ошибке.
  // Теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
  // Сообщения о неправильном формате хэштега задаются с помощью метода setCustomValidity у соответствующего поля.
  var checkHashtagsValidity = function () {
    var tagsArray = hashtagsArea.value.toLowerCase().split(' ');
    hashtagsArea.setCustomValidity('');
    hashtagsArea.style = '';

    switch (true) {
      case hashtagsArea.value.trim() === '': // str.trim() — убирает пробелы в начале и конце строки.
        hashtagsArea.setCustomValidity('');
        hashtagsArea.style = '';
        break;
      case tagsArray.length > HashtagMax.AMOUNT:
        hashtagsArea.setCustomValidity('Количество хэштегов не должно быть больше ' + HashtagMax.AMOUNT);
        drawOutline();
        break;
      case isNotStartWithHash(tagsArray):
        hashtagsArea.setCustomValidity('Каждый хэштег должен начинаться с решётки');
        drawOutline();
        break;
      case isOnlyHash(tagsArray):
        hashtagsArea.setCustomValidity('Хэштег не может состоять только из одной решетки');
        drawOutline();
        break;
      // case isNoSpaceBetween(tagsArray):
      //   hashtagsArea.setCustomValidity('Каждый хэштег должен разделяться пробелом');
      //   drawOutline();
      //   break;
      case isMoreThanMaxLength(tagsArray, HashtagMax.LENGTH):
        hashtagsArea.setCustomValidity('Длина тега не может быть больше ' + HashtagMax.LENGTH + ' символов, включая решётку');
        drawOutline();
        break;
      // case isSameHash(tagsArray):
      //   hashtagsArea.setCustomValidity('Нельзя использовать несколько одинаковых Хэштегов');
      //   drawOutline();
      //   break;
    }
  };

  // Если форма заполнена верно, то должна показываться страница с успешно отправленными данными, если же форма пропустила какие-то некорректные значения, то будет показана страница с допущенными ошибками. В идеале у пользователя не должно быть сценария, при котором он может отправить некорректную форму.

  hashtagsArea.addEventListener('change', checkHashtagsValidity);

})();
