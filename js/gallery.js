'use strict';
// gallery.js - rendering and sorting miniature images on the main screen.
(function () {
  // var NEW_PICTURES_LIMIT = 15; // max количество новых фотографий
  // var mainPage = document.querySelector('main');
  var pictures = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var filterPopular = filters.querySelector('#filter-popular');
  var filterNew = filters.querySelector('#filter-new');
  var filterDiscussed = filters.querySelector('#filter-discussed');

  var GET_URL = window.backend.GET_URL;
  var template = document.querySelector('#picture');
  var fragment = document.createDocumentFragment();

  // Get user images from the remote server
  var renderPhotos = window.backend.load(GET_URL, function (photoUsers) {
    window.filters.filters.classList.remove('img-filters--inactive');
    photoUsers.forEach(function (photo) {
      var photoElement = template.content.cloneNode(true);
      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.lenght;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      fragment.appendChild(photoElement);
    });
    pictures.appendChild(fragment);
  }, window.form.onLoadError);

  // После завершения загрузки изображений с сервера покажите блок .img-filters, убрав у него класс .img-filters--inactive
  // При переключении фильтра все фотографии, отрисованные ранее, нужно убрать и вместо них показать те, которые подходят под новые условия - clearImg.js
  // Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:
  // Популярные — фотографии в изначальном порядке;
  var getPopularSorting = function () {
    filterPopular.classList.add('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  };

  // Новые — 10 случайных, не повторяющихся фотографий;
  var getNewSorting = function () {
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  };

  // Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
  var getDiscussedSorting = function () {
    filterPopular.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
  };

  // Воспользуйтесь приёмом «устранение дребезга» для того, чтобы сделать так, чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.
  // При переключении фильтров, отрисовка изображений, подходящих под новый фильтр, должна производиться не чаще, чем один раз в полсекунды (устранение дребезга).
  // var getSortingDebounce = function () {
  //   window.debounce.debounce();
  // };

  // 5.4. Блок, с помощью которого производится фильтрация фотографий скрыт изначально и показывается только после окончания загрузки всех фотографий.
  var onClickSort = function (evt) {
    switch (true) {
      case evt.target === filterPopular:
        getPopularSorting();
        break;
      case evt.target === filterNew:
        getNewSorting();
        break;
      case evt.target === filterDiscussed:
        getDiscussedSorting();
        break;
    }
  };

  filterPopular.addEventListener('click', onClickSort);
  filterNew.addEventListener('click', onClickSort);
  filterDiscussed.addEventListener('click', onClickSort);

  // add object to the global scope
  window.filters = {
    filters: filters,
    renderPhotos: renderPhotos
  };

})();

