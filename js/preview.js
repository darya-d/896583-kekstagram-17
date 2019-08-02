'use strict';

(function () {
  var bigPictures = document.querySelector('.big-picture');
  var buttonBigPictureClose = document.querySelector('.big-picture__cancel');

  var onShowBigPicture = function (evt) {
    if (evt.target.className === 'picture__img') {
      bigPictures.classList.remove('hidden');
    }
  };

  document.addEventListener('click', onShowBigPicture);

  // 4.4. Выход из полноэкранного режима просмотра фотографии осуществляется либо нажатием на иконку крестика .big-picture__cancel в правом верхнем углу блока .big-picture, либо нажатием на клавишу Esc.
  // var onBigPictureClose = function (evt) {
  //   if (evt.keyCode === window.utils.KEY_CODE.ESC | evt.target === buttonBigPictureClose) {
  //     bigPictures.classList.add('hidden');
  //   }
  // };

  var onBigPictureClose = function (evt) {
    if (evt.keyCode === window.utils.KEY_CODE.ESC | evt.target === buttonBigPictureClose) {
      bigPictures.classList.add('hidden');
    }
  };

  bigPictures.addEventListener('click', onBigPictureClose);
  /**
   * 4. Просмотр загруженных изображений
    4.1. Загрузка изображений от других пользователей производится СРАЗУ ПОСЛЕ открытия страницы с удалённого сервера через XHR: https://js.dump.academy/kekstagram/data.

    4.3. При нажатии на любую из миниатюр, показывается блок .big-picture, содержащий полноэкранное изображение с количеством лайков и комментариев. Злементу body задаётся класс modal-open. Данные, описывающие изображение должны подставляться в соответствующие элементы в разметке.
    4.5. Все комментарии к изображению выводятся в блок .social__comments. Сразу после открытия изображения в полноэкранном режиме отображается не более 5 комментариев. Пример разметки списка комментариев приведен в блоке .social__comments. Комментарий оформляется отдельным элементом списка li с классами social__comment и social__text. Аватарка автора комментария отображается в блоке .social__picture. Имя автора комментария отображается в атрибуте alt элемента с изображением аватарки автора. Текст комментария выводится в элементе li.
    4.6. Отображение дополнительных комментариев происходит при нажатии на кнопку .comments-loader. При нажатии на кнопку отображается не более 5 новых комментариев.
    4.7. Если все комментарии показаны, кнопку .comments-loader следует скрыть, добавив класс hidden.
   */
})();
