'use strict';
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

/**
 * Функция генерации случайного элемента массива
 *
 * @return {number} - номер случайного элемента массива
 */
var generateRandomComment = function () {
  return COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
};

/**
 * Функцию для создания массива из 25 сгенерированных JS объектов.
 *
 * @return {object} - описание фотографии, опубликованной пользователем
 * @param {string} url — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25. Адреса картинок не должны повторяться.
 * @param {number} likes - количество лайков, поставленных фотографии. Случайное число от 15 до 200.
 * @param {array} comments - список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев определяется на своё усмотрение. Все комментарии генерируются случайным образом.
 */

var followers = [];

var generateArrayOfFollowers = function () {
  for (var i = 1; i <= 25; i++) {
    followers[i] = {
      url: 'photos/' + i + '.jpg',
      likes: generateRandomNumber(15, 200),
      comments: generateRandomComment()
    };
  }
  return followers;
};

generateArrayOfFollowers();

// На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива:
// Адрес изображения url подставьте как src изображения

var template = document.getElementById('picture');
var pictures = document.querySelector('.pictures');

followers.forEach(function () {
  var photoElement = template.cloneNode(true);
  // function (objectItem);
  // photoElement.querySelector('.picture__img').src = objectItem.url;
  // photoElement.querySelector('.picture__comments').textContent = objectItem.comments;
  // photoElement.querySelector('.picture__likes').textContent = objectItem.likes;
  pictures.appendChild(photoElement);
});

// Количество лайков likes подставьте как текстовое содержание элемента .picture__likes
// var likes = document.querySelector('.picture__likes');
// if (likes) {
//   likes.textContent = 25;
// }

// Количество комментариев comments подставьте как текстовое содержание элемента .picture__comments
// var comments = document.querySelector('.picture__comments');
// if (comments) {
//   comments.textContent = 'Всё отлично!';
// }

