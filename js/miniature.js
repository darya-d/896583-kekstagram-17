'use strict';
// miniature.js - module of miniature images drawing on the main screen
(function () {
  // DOM-элементы, которые соответствуют фотографиям и заполняются данными из массива.
  var NUMBER_OF_PHOTO_USERS = 25;
  var template = document.querySelector('#picture');
  var pictures = document.querySelector('.pictures');
  var photoUsers = window.data.getPhotoUsers(NUMBER_OF_PHOTO_USERS);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoUsers.length; i++) {
    var photoElement = template.content.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photoUsers[i].url;
    photoElement.querySelector('.picture__comments').textContent = photoUsers[i].comments.length;
    photoElement.querySelector('.picture__likes').textContent = photoUsers[i].likes;

    fragment.appendChild(photoElement);
  }
  pictures.appendChild(fragment);
})();
