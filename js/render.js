'use strict';
// render-img.js - sorting miniature images on the main screen.

(function () {
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
    photoElement.querySelector('.picture__img').dataset.id = (photo.url.length === 7 ? photo.url[7] : photo.url.slice(7, 9)) - 1;
    return photoElement;
  };

  var addPicture = function (photoUser) {
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
    addPicture(photoUsers);
  };

  window.backend.load(onSuccess, window.form.onLoadError);

  window.render = {
    addPicture: addPicture,
    pictures: pictures
  };
})();
