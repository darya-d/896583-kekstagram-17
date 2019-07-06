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
 * Функция генерации случайного комментария
 *
 * @return {number} - номер случайного элемента массива
 */
var generateRandomComment = function () {
  return COMMENTS[Math.floor(Math.random() * COMMENTS.length)];
};

/**
 * Функцию для создания массива из 25 сгенерированных JS объектов.
 *
 * @param {number} countPhotoUsers - количество пользователей
 * @param {string} url — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25. Адреса картинок не должны повторяться.
 * @param {number} likes - количество лайков, поставленных фотографии. Случайное число от 15 до 200.
 * @param {array} comments - список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев определяется на своё усмотрение. Все комментарии генерируются случайным образом.
 * @return {object} - описание фотографии, опубликованной пользователем.
 */
var getPhotoUsers = function (countPhotoUsers) {
  var photoUsers = [];

  for (var i = 1; i <= countPhotoUsers; i++) {
    photoUsers[i] = {
      url: 'photos/' + i + '.jpg',
      likes: generateRandomNumber(15, 200),
      comments: generateRandomComment()
    };
  }
  return photoUsers;
};

// На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива:
// Адрес изображения url подставьте как src изображения
var template = document.querySelector('#picture');
var pictures = document.querySelector('.pictures');

var photoUsers = getPhotoUsers(25);

photoUsers.forEach(function () {
  var photoElement = template.content.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photoUsers.url;
  photoElement.querySelector('.picture__comments').textContent = photoUsers.comments;
  photoElement.querySelector('.picture__likes').textContent = photoUsers.likes;
  pictures.appendChild(photoElement);
});

// documentFragment
