'use strict';
// big-picture.js - показываем первую фотографию из массива объектов в полноразмерном режиме и дополнительную информацию: описание, количество лайков, комментарии и т.д. Всю эту информацию следует вывести в соответствующие DOM-элементы.
(function () {
  // var COMMENTS_COUNT = 5;

  // var bigPicture = document.querySelector('.big-picture');
  // var bigPictureImg = bigPicture.querySelector('img');
  // var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

  // var likesCount = bigPicture.querySelector('.likes-count');
  // var description = bigPicture.querySelector('.social__caption');
  // var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  // var commentsCount = socialCommentCount.querySelector('.comments-count');
  // var commentsList = bigPicture.querySelector('.social__comments');
  // // var commentsLoader = bigPicture.querySelector('.comments-loader');

  // var showBigPicture = function (imgBig) {
  //   bigPicture.classList.remove('hidden');
  //   bigPictureImg.src = imgBig.url;
  //   likesCount.textContent = imgBig.likes;

  //   commentsCount.textContent =
  //     imgBig.comments.length > COMMENTS_COUNT ? ('5 из ' + imgBig.comments.length + ' комментариев') : (' ');

  //   description.textContent = imgBig.description;
  //   showComments(imgBig.comments);

  //   document.addEventListener('keydown', function (evt) {
  //     if (evt.keyCode === window.util.ESC_KEYCODE) {
  //       bigPicture.classList.add('hidden');
  //     }
  //   });
  // };

  // var createElement = function (element, elementClass) {
  //   var newElement = document.createElement(element);
  //   newElement.classList.add(elementClass);
  //   return newElement;
  // };

  // var showComments = function (comments) {
  //   var bigPictureComments = bigPicture.querySelectorAll('.social__comment');
  //   bigPictureComments.forEach(function (element) {
  //     element.remove();
  //   });
  //   comments.forEach(function (element) {
  //     var commentItem = createElement('li', 'social__comment');
  //     commentItem.style.display = 'none';

  //     var comment = createElement('p', 'social__text');
  //     var commentImg = createElement('img', 'social__picture');

  //     comment.textContent = element.message;
  //     commentImg.src = element.avatar;
  //     commentImg.alt = element.name;

  //     commentsList.appendChild(commentItem);
  //     commentItem.appendChild(commentImg);
  //     commentItem.appendChild(comment);
  //   });
  // };

  // var onBigPictureClick = function () {
  //   bigPicture.classList.add('hidden');
  // };

  // bigPictureClose.addEventListener('click', onBigPictureClick);

  // window.bigPicture = {
  //   showBigPicture: showBigPicture,
  //   onBigPictureClick: onBigPictureClick
  // };

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
      var i = 0;
      bigPicture.classList.remove('hidden');
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

  var onClickClose = function () {
    bigPicture.classList.add('hidden');
  };

  pictureBlock.addEventListener('click', onClickPicture);
  pictureClose.addEventListener('click', onClickClose);

})();
