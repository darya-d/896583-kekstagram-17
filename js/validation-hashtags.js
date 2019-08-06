'use strict';
// validation-hashtags.js - hashtags validation.

(function () {
  var HashtagMax = {
    AMOUNT: 5,
    LENGTH: 20,
  };

  var hashtagsArea = window.form.hashtagsArea;

  // Хэштег не начинается с символа решётки `#`
  var isNotStartWithHash = function (array) {
    return array.some(function (tag) {
      return tag[0] !== '#';
    });
  };

  // Хэштег состоит только из одной решётки
  var isOnlyHash = function (array) {
    return array.some(function (tag) {
      return tag[0] === '#' && tag.length === 1;
    });
  };

  // Хэштеги не разделяются пробелами
  var isNoSpaceBetween = function (array) {
    return array.some(function (tag) {
      return tag.indexOf('#', 1) > 0; // str.indexOf(searchValue, [fromIndex]), где searchValue - строка, представляющая искомое значение, [fromIndex] - местоположение внутри строки, откуда начинать поиск; может быть любым целым числом
    });
  };

  // Максимальная длина одного хэштега превышает 20 символов, включая решётку
  var isMoreThanMaxLength = function (array) {
    return array.some(function (tag) {
      return tag.length > HashtagMax.LENGTH;
    });
  };

  // Один и тот же хэштег использован дважды
  var isSameHash = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var lastElement = array[i];
      if (array.indexOf(lastElement) !== i) {
        return true;
      }
    }
    return false;
  };

  // Рисуем обводку в случае ошибки
  var drawOutline = function () {
    hashtagsArea.style = 'outline: 2px solid #D30000';
  };

  // Превращаем набор Хэштегов в массив методом split, который разбивает строки на массивы. Если хотя бы один из тегов не проходит нужных проверок, можно воспользоваться методом setCustomValidity для того, чтобы задать полю правильное сообщение об ошибке.
  // Теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
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
      case isNoSpaceBetween(tagsArray):
        hashtagsArea.setCustomValidity('Каждый хэштег должен разделяться пробелом');
        drawOutline();
        break;
      case isMoreThanMaxLength(tagsArray, HashtagMax.LENGTH):
        hashtagsArea.setCustomValidity('Длина тега не может быть больше ' + HashtagMax.LENGTH + ' символов, включая решётку');
        drawOutline();
        break;
      case isSameHash(tagsArray):
        hashtagsArea.setCustomValidity('Нельзя использовать несколько одинаковых хэштегов');
        drawOutline();
        break;
    }
  };

  hashtagsArea.addEventListener('change', checkHashtagsValidity);

})();
