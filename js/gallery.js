'use strict';
// gallery.js - sorting miniature images on the main screen.

(function () {
  var MAX_PHOTOS = 10;
  var filtersForm = document.querySelector('.img-filters__form');
  var filtersbuttonAll = Array.from(document.querySelectorAll('.img-filters__button'));
  var pictures = document.querySelector('.pictures');

  // Блок, с помощью которого производится фильтрация фотографий, скрыт изначально и показывается только после окончания загрузки всех фотографий.
  var clearImg = function () {
    var picturesCollection = pictures.querySelectorAll('.picture');
    // метод Array.from принимает итерируемый объект или псевдомассив и делает из него «настоящий» Array. После этого мы уже можем использовать методы массивов.
    var picturesArray = Array.from(picturesCollection);
    picturesArray.forEach(function (it) {
      pictures.removeChild(it);
    });
  };

  var updateFilter = function (evtChange) {
    switch (true) {
      case (evtChange.target.id === 'filter-popular'):
        clearImg();
        var popularPhotos = window.pictureUsers;
        window.renderImg.addPicture(popularPhotos);
        break;
      case (evtChange.target.id === 'filter-new'):
        clearImg();
        var newPhotos = window.pictureUsers.slice().sort(function () {
          return 0.5 - Math.random();
        }).slice(0, MAX_PHOTOS);
        window.renderImg.addPicture(newPhotos);
        break;
      case (evtChange.target.id === 'filter-discussed'):
        clearImg();
        var discussedPhoto = window.pictureUsers.slice().sort(function (a, b) {
          return a.comments.length - b.comments.length;
        }).reverse();
        window.renderImg.addPicture(discussedPhoto);
        break;
    }
  };

  var lastTimeout = null;
  var onClickFilter = function (evt) {
    filtersbuttonAll.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updateFilter(evt);
    }, 500);
  };

  filtersForm.addEventListener('click', onClickFilter);
})();

