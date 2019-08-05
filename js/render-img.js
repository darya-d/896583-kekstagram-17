'use strict';
// render-img.js - sorting miniature images on the main screen.
(function () {
  var GET_URL = window.backend.GET_URL;
  var pictures = document.querySelector('.pictures');
  var picture = document.querySelector('#picture').content.querySelector('.picture');
  var filters = document.querySelector('.img-filters');

  /**
    * Функция генерации фото с количеством комментариев и лайков
    * @param {array} photo - массив объектов фотографий пользователей
    * @return {object} - объект фото пользователя с кол-ом комеентариев и лайков
  */
  var renderPhoto = function (photo) {
    var photoElement = picture.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    return photoElement;
  };

  window.addPicture = function (photoUser) {
    var fragment = document.createDocumentFragment();
    photoUser.forEach(function (photos) {
      fragment.appendChild(renderPhoto(photos));
    });
    pictures.appendChild(fragment);
  };

  var onSuccess = function (photoUsers) {
    window.pictureUsers = [];
    window.pictureUsers = photoUsers;
    filters.classList.remove('img-filters--inactive');
    window.addPicture(photoUsers);
  };

  window.backend.load(GET_URL, onSuccess, window.form.onLoadError);

  // Previous
  // var GET_URL = window.backend.GET_URL;
  // var template = document.querySelector('#picture');
  // var fragment = document.createDocumentFragment();
  // // Get user images from the remote server
  // var renderPhotos = window.backend.load(GET_URL, function (photoUsers) {
  //   window.filters.filters.classList.remove('img-filters--inactive');
  //   photoUsers.forEach(function (photo) {
  //     var photoElement = template.content.cloneNode(true);
  //     photoElement.querySelector('.picture__img').src = photo.url;
  //     photoElement.querySelector('.picture__comments').textContent = photo.comments.lenght;
  //     photoElement.querySelector('.picture__likes').textContent = photo.likes;
  //     fragment.appendChild(photoElement);
  //   });
  //   pictures.appendChild(fragment);
  // }, window.form.onLoadError);
})();
