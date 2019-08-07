'use strict';
// big-picture.js - showing photos in full size.

(function () {
  var COMMENT_AMMOUNT = 0;
  var COMMENT = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('img');
  var pictureClose = bigPicture.querySelector('.big-picture__cancel');
  var pictureCommentsCount = bigPicture.querySelector('.social__comment-count');
  var pictureCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureSocial = bigPicture.querySelector('.comments-count');
  var bigPictureCaption = bigPicture.querySelector('.social__caption');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPicture.querySelector('.social__comment');
  var pictures = document.querySelector('.pictures');

  var onClickPicture = function (evt) {
    if (evt.target.className === 'picture__img') {
      var i = Number(evt.target.dataset.id);
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onEscClose);
      pictureCommentsCount.classList.add('visually-hidden');

      bigPictureImg.src = window.pictureUsers[i].url;
      bigPictureLikes.textContent = window.pictureUsers[i].likes;
      bigPictureSocial.textContent = window.pictureUsers[i].comments.length > COMMENT ? ('5 из ' + window.pictureUsers[i].comments.length + ' комментариев') : (' ');
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

      var loadComments = null;
      var commentsCollection = Array.from(document.querySelectorAll('.social__comment'));
      var onCommentsLoaderClick = function () {
        COMMENT_AMMOUNT = COMMENT_AMMOUNT + COMMENT;
        loadComments = commentsCollection.length - COMMENT_AMMOUNT;
        if (loadComments > 0) {
          pictureCommentsLoader.classList.remove('hidden');
        } else if (loadComments <= 0) {
          pictureCommentsLoader.classList.add('hidden');
        }
        commentsCollection.forEach(function (it, index) {
          if (index >= COMMENT_AMMOUNT) {
            it.style.display = 'none';
          } else if (index < COMMENT_AMMOUNT) {
            it.style.display = 'flex';
          }
        });
      };

      onCommentsLoaderClick();
      pictureCommentsLoader.addEventListener('click', onCommentsLoaderClick);
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

  pictures.addEventListener('click', onClickPicture);
  pictureClose.addEventListener('click', onClickClose);

})();

