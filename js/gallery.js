'use strict';
// gallery.js - sorting miniature images on the main screen.
(function () {
  var filtersForm = document.querySelector('.img-filters__form');
  var filtersbuttonAll = Array.from(document.querySelectorAll('.img-filters__button'));

  // Блок, с помощью которого производится фильтрация фотографий скрыт изначально и показывается только после окончания загрузки всех фотографий.
  // После завершения загрузки изображений с сервера покажите блок .img-filters, убрав у него класс .img-filters--inactive
  var updateFilter = function (evtChange) {
    switch (true) {
      case (evtChange.target.id === 'filter-new'):
        var newPhotos = window.pictureUsers.sort(function () {
          return 0.5 - Math.random();
        }).splice(10);
        window.addPicture(newPhotos);
        break;
      case evtChange.target.id === '#filter-discussed':
        var discussedPhoto = window.pictureUsers.sort(function (a, b) {
          return a.comments.length - b.comments.length;
        }).reverse();
        window.addPicture(discussedPhoto);
        break;
    }
  };

  var onClickFilter = function (evt) {
    filtersbuttonAll.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    updateFilter(evt);
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    var lastTimeout = window.setTimeout(function () {
      updateFilter(evt);
    }, 500);
  };

  filtersForm.addEventListener('click', onClickFilter);


  // При переключении фильтра все фотографии, отрисованные ранее, нужно убрать и вместо них показать те, которые подходят под новые условия - clearImg.js

  // Воспользуйтесь приёмом «устранение дребезга» для того, чтобы сделать так, чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.
  // При переключении фильтров, отрисовка изображений, подходящих под новый фильтр, должна производиться не чаще, чем один раз в полсекунды (устранение дребезга).
  // var getSortingDebounce = function () {
  //   window.debounce.debounce();
  // };
})();

