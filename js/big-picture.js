'use strict';
// big-picture.js - showing photos in full size.

(function () {
  var pictureBlock = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var pictureClose = document.querySelector('.big-picture__cancel');
  var pictureCommentsCount = document.querySelector('.social__comment-count');
  var pictureCommentsLoader = document.querySelector('.social__comments-loader');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var bigPictureLikes = document.querySelector('.likes-count');
  var bigPictureSocial = document.querySelector('.comments-count');
  var bigPictureCaption = document.querySelector('.social__caption');
  var bigPictureComments = document.querySelector('.social__comments');
  var bigPictureComment = document.querySelector('.social__comment');

  var onClickPicture = function (evt) {
    if (evt.target.className === 'picture__img') {
      var i = Number(evt.target.dataset.id);
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onEscClose);
      pictureCommentsCount.classList.add('visually-hidden');
      pictureCommentsLoader.classList.add('visually-hidden');
      bigPictureImg.src = window.pictureUsers[i].url;
      bigPictureLikes.textContent = window.pictureUsers[i].likes;
      bigPictureSocial.textContent = window.pictureUsers[i].comments.length;
      bigPictureCaption.textContent = window.pictureUsers[i].description;

      var renderComments = function (comments) {
        while (bigPictureComments.firstChild) {
          bigPictureComments.removeChild(bigPictureComments.firstChild);
        }
        var commentElement = bigPictureComment.cloneNode(true);
        commentElement.querySelector('.social__picture').src = comments.avatar;
        commentElement.querySelector('.social__text').textContent = comments.message;
        return commentElement;
      };

      var fragmentComments = document.createDocumentFragment();
      window.pictureUsers[i].comments.forEach(function (comment) {
        fragmentComments.appendChild(renderComments(comment));
      });
      bigPictureComments.appendChild(fragmentComments);
    }
  };

  var onEscClose = function (evt) {
    if (evt.keyCode === window.utils.KEY_CODE.ESC) {
      bigPicture.classList.add('hidden');
    }
  };

  var onClickClose = function () {
    bigPicture.classList.add('hidden');
  };

  pictureBlock.addEventListener('click', onClickPicture);
  pictureClose.addEventListener('click', onClickClose);

})();

