'use strict';

(function () {
  // ==== 3th MODULE - DOM ====
  // ==== Напишите функцию для создания массива из 25 сгенерированных JS объектов. Каждый объект массива ‐ описание фотографии, опубликованной пользователем.
  /**
   * @param {array} comments - комментарии пользователей
   */
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  /**
   * Функция генерации случайного числа в зависимости от указанного интервала
   *
   * @param {number} min - минимальное значение числа
   * @param {number} max - максимальное значение числа
   * @return {number} - значение случайного числа
   */
  var generateRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
  };

  var getRandomElement = function (elements) {
    return elements[generateRandomNumber(0, elements.length - 1)];
  };

  /**
   * Функция генерации случайного комментария
   *
   * @return {number} - номер случайного элемента массива
   */

  var createArray = function (length) {
    return Array.apply(null, {length: length});
  };

  var generateRandomComment = function () {
    return getRandomElement(COMMENTS);
  };

  var generateListOfComments = function () {
    var countOfComments = generateRandomNumber(1, COMMENTS.length);
    return createArray(countOfComments).map(function () {
      return generateRandomComment();
    });
  };

  /**
   * Функция для создания массива из 25 сгенерированных JS объектов.
   *
   * @param {number} countPhotoUsers - количество пользователей
   * @param {string} url — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25. Адреса картинок не должны повторяться.
   * @param {number} likes - количество лайков, поставленных фотографии. Случайное число от 15 до 200.
   * @param {array} comments - список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев определяется на своё усмотрение. Все комментарии генерируются случайным образом.
   * @return {object} - описание фотографии, опубликованной пользователем.
   */
  var NUMBER_OF_PHOTO_USERS = 25;

  var Likes = {
    NUMBER_MIN: 15,
    NUMBER_MAX: 200
  };

  var getPhotoUsers = function (countPhotoUsers) {
    return createArray(countPhotoUsers).map(function (_value, index) {
      return {
        url: 'photos/' + (index + 1) + '.jpg',
        likes: generateRandomNumber(Likes.NUMBER_MIN, Likes.NUMBER_MAX),
        comments: generateListOfComments()
      };
    });
  };

  // На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива.
  // Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.
  var template = document.querySelector('#picture');
  var pictures = document.querySelector('.pictures');
  var photoUsers = getPhotoUsers(NUMBER_OF_PHOTO_USERS);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoUsers.length; i++) {
    var photoElement = template.content.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photoUsers[i].url;
    photoElement.querySelector('.picture__comments').textContent = photoUsers[i].comments.length;
    photoElement.querySelector('.picture__likes').textContent = photoUsers[i].likes;

    fragment.appendChild(photoElement);
  }
  pictures.appendChild(fragment);
})();