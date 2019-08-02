'use strict';
// miniature.js - rendering miniature images on the main screen.
(function () {
  var template = document.querySelector('#picture');
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var GET_URL = window.backend.GET_URL;

  // Загрузка изображений от других пользователей производится сразу после открытия страницы с удалённого сервера через XHR: https://js.dump.academy/kekstagram/data.
  //
  window.backend.load(GET_URL, function (photoUsers) {
    for (var i = 0; i < photoUsers.length; i++) { // forEach
      // DOM-элемент миниатюры генерируется на основе шаблонного элемента picture, расположенного в элементе template на странице.
      var photoElement = template.content.cloneNode(true);

      photoElement.querySelector('.picture__img').src = photoUsers[i].url;
      photoElement.querySelector('.picture__comments').textContent = photoUsers[i].comments.length;
      photoElement.querySelector('.picture__likes').textContent = photoUsers[i].likes;

      fragment.appendChild(photoElement);
    }
    pictures.appendChild(fragment);
  }, window.form.onLoadError);

  // window.backend.load(GET_URL, function (photoUsers) {
  //   photoUsers.forEach(function () {
  //     var photoElement = template.content.cloneNode(true);

  //     photoElement.querySelector('.picture__img').src = photoUsers[i].url;
  //     photoElement.querySelector('.picture__comments').textContent = photoUsers[i].comments.length;
  //     photoElement.querySelector('.picture__likes').textContent = photoUsers[i].likes;

  //     fragment.appendChild(photoElement);
  //   })
  //   pictures.appendChild(fragment);
  //   }, window.form.onLoadError);


  // add object to the global scope
  window.miniature = {
    pictures: pictures
  };

})();

