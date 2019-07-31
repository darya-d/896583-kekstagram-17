'use strict';
// data.js - module of
(function () {
  var LikesNumber = {
    MIN: 15,
    MAX: 200
  };

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  /**
   * Функция генерации случайного числа в зависимости от указанного интервала.
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
   * Функция создания массива.
   *
   * @param {number} length - длина массива.
   * @return {array} - массив комментариев.
   */
  var createArray = function (length) {
    return Array.apply(null, {length: length});
  };

  /**
   * Функция генерации случайного комментария.
   *
   * @return {number} - номер случайного элемента массива.
   */
  var generateRandomComment = function () {
    return getRandomElement(COMMENTS);
  };

  /**
   * Функция генерации списка случайных комментариев.
   * @return {function}
   */
  var generateListOfComments = function () {
    var countOfComments = generateRandomNumber(1, COMMENTS.length);
    return createArray(countOfComments).map(function () {
      return generateRandomComment();
    });
  };

  /**
   * Функция для создания массива из 25 сгенерированных JS-объектов.
   *
   * @param {*} countPhotoUsers - количество пользователей.
   * @return {object} - описание фотографии, опубликованной пользователем.
   */
  var getPhotoUsers = function (countPhotoUsers) {
    return createArray(countPhotoUsers).map(function (_value, index) {
      return {
        url: 'photos/' + (index + 1) + '.jpg',
        likes: generateRandomNumber(LikesNumber.MIN, LikesNumber.MAX),
        comments: generateListOfComments()
      };
    });
  };

  window.data = {
    getPhotoUsers: getPhotoUsers
  };
})();
