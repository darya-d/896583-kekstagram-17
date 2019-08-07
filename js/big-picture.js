'use strict';
// big-picture.js - showing photos in full size.

(function () {
  var COMMENT = 5;
  var bodyPage = document.querySelector('body');
  var pictureBlock = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var pictureClose = bigPicture.querySelector('.big-picture__cancel');
  var pictureCommentsCount = bigPicture.querySelector('.social__comment-count');
  var pictureCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureSocial = bigPicture.querySelector('.comments-count');
  var bigPictureCaption = bigPicture.querySelector('.social__caption');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var bigPictureComment = bigPicture.querySelector('.social__comment');

  // Функция, подгружающая данные для большого изображения кликнутой фотографии
  var onClickPicture = function (evt) {
    if (evt.target.className === 'picture__img') {
      var i = Number(evt.target.dataset.id);
      bodyPage.classList.add('modal-open');
      bigPicture.classList.remove('hidden');
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

      var commentAmmount = 0;
      var loadComments = null;
      var commentsCollection = Array.from(document.querySelectorAll('.social__comment'));
      var onCommentsLoaderClick = function () {
        commentAmmount = commentAmmount + COMMENT;
        loadComments = commentsCollection.length - commentAmmount;
        if (loadComments > 0) {
          pictureCommentsLoader.classList.remove('hidden');
          pictureCommentsCount.textContent = commentAmmount + ' из ' + commentsCollection.length + ' комментариев';
        } else if (loadComments <= 0) {
          pictureCommentsLoader.classList.add('hidden');
          pictureCommentsCount.textContent = commentsCollection.length + ' из ' + commentsCollection.length + ' комментариев';
        }
        commentsCollection.forEach(function (it, index) {
          if (index >= commentAmmount) {
            it.style.display = 'none';
          } else if (index < commentAmmount) {
            it.style.display = 'flex';
          }
        });
      };

      onCommentsLoaderClick();
      pictureCommentsLoader.addEventListener('click', onCommentsLoaderClick);
      document.addEventListener('keydown', onPopupEscPress);
    }
  };

  // Функция закрытия popup по нажатию ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.KEY_CODE.ESC) {
      onClickClose();
    }
  };

  var onClickClose = function () {
    bigPicture.classList.add('hidden');
    bodyPage.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  pictureBlock.addEventListener('click', onClickPicture);
  pictureClose.addEventListener('click', onClickClose);

})();

