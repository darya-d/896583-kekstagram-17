'use strict';
// miniature.js - module of miniature images drawing on the main screen
(function () {
  var NUMBER_OF_PHOTO_USERS = 25;
  var photoUsers = window.data.getPhotoUsers(NUMBER_OF_PHOTO_USERS);
  var template = document.querySelector('#picture');
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  // var GET_URL = window.backend.GET_URL;

  // DOM-элементы соответствуют фотографиям и заполняются данными из массива.
  for (var i = 0; i < photoUsers.length; i++) {
    // DOM-элемент миниатюры генерируется на основе шаблонного элемента picture, расположенного в элементе template на странице.
    var photoElement = template.content.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photoUsers[i].url;
    photoElement.querySelector('.picture__comments').textContent = photoUsers[i].comments.length;
    photoElement.querySelector('.picture__likes').textContent = photoUsers[i].likes;

    fragment.appendChild(photoElement);
  }

  // window.load(GET_URL, function (countPhotoUsers) {
  //   ???
  // }
  pictures.appendChild(fragment);
})();

