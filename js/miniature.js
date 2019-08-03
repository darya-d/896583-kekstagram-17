'use strict';
// miniature.js - rendering miniature images on the main screen.
(function () {
  var GET_URL = window.backend.GET_URL;
  var load = window.backend.load;
  var template = document.querySelector('#picture');
  var pictures = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  // Get user images from the remote server
  load(GET_URL, function (photoUsers) {
    photoUsers.forEach(function (photo) {
      var photoElement = template.content.cloneNode(true);
      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.lenght;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      fragment.appendChild(photoElement);
    });
    pictures.appendChild(fragment);
  }, window.form.onLoadError);

  // add object to the global scope
  window.miniature = {
    pictures: pictures
  };

})();

