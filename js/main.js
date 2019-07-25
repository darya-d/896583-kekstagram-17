'use strict';
// ==== 3th MODULE - DOM ====
// ==== 3.1. Напишите функцию для создания массива из 25 сгенерированных JS объектов. Каждый объект массива ‐ описание фотографии, опубликованной пользователем.
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

// ==== 3.2. На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива.
// ==== 3.3. Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.
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


// ==== 4th MODULE - EVENTS ====
var KEYCODE_ESC = 27;

// ==== 4.1. Обработка изменения значения поля выбора файла #upload-file. При наступлении события change на этом поле, можно сразу показывать форму редактирования изображения.
// ==== 4.4. Валидация: если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
var uploadFile = document.querySelector('#upload-file');
var imgEditForm = document.querySelector('.img-upload__overlay');
var closeImgEditForm = imgEditForm.querySelector('#upload-cancel');

var commentsArea = document.querySelector('.text__description');
// var hashtagsArea = document.querySelector('.text__hashtags');

// Open edit form
var onOpenUploadFile = function () {
  imgEditForm.classList.remove('hidden');
  document.addEventListener('keydown', onImgEditFormEscPress);
  addEffect('effects__preview--none');
  imgEffectLine.classList.add('hidden');
};

// Close edit form
var onCloseUploadFile = function () {
  imgEditForm.classList.add('hidden');
  document.removeEventListener('keydown', onImgEditFormEscPress);
};

// Create a handler for event of closing edit form by using ESC
var onImgEditFormEscPress = function (evt) {
  if (evt.keyCode === KEYCODE_ESC && evt.target !== commentsArea) {
    onCloseUploadFile();
  }
};

// Create an event of opening edit form by add change
uploadFile.addEventListener('change', onOpenUploadFile);

// Create an event of closing edit form by clicking on the closing button
closeImgEditForm.addEventListener('click', onCloseUploadFile);

// ==== 4.2. Наложение эффекта на изображение
// 4.2.1. На изображение может накладываться только один эффект.
// 4.2.2. При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
// 4.2.3. Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin. Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта, CSS-стили элемента .img-upload__preview обновляются.
// 4.2.4. При выборе эффекта «Оригинал» слайдер скрывается.
// 4.2.5. При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.
var imgPreview = document.querySelector('.img-upload__preview > img');

// var imgEffectPin = document.querySelector('.effect-level__pin');
var imgEffectLine = document.querySelector('.img-upload__effect-level');
// var imgEffectValue = document.querySelector('.effect-level__value');
// var imgEffectValueDefault = Scale.VALUE_MAX;


// var effects = {
//   chrome: ['grayscale', 0, 1, ''],
//   sepia: ['sepia', 0, 1, ''],
//   marvin: ['invert', 0, 100, '%'],
//   phobos: ['blur', 0, 3, '%'],
//   heat: ['brightness', 1, 3]
// };
// var effectNone = document.querySelector('.effects__preview--none');

// Add filter effects by changing classes; show thу depth level line of filter effect
var addEffect = function (className) {
  imgPreview.removeAttribute('class');
  imgPreview.classList.add(className);
  imgEffectLine.classList.remove('hidden');
};

// Add classes for filter effects
var changeEffect = function (evt) {
  switch (true) {
    case evt.target.classList.contains('effects__preview--none'):
      addEffect('effects__preview--none');
      imgEffectLine.classList.add('hidden');
      break;
    case evt.target.classList.contains('effects__preview--chrome'):
      addEffect('effects__preview--chrome');
      break;
    case evt.target.classList.contains('effects__preview--sepia'):
      addEffect('effects__preview--sepia');
      break;
    case evt.target.classList.contains('effects__preview--marvin'):
      addEffect('effects__preview--marvin');
      break;
    case evt.target.classList.contains('effects__preview--phobos'):
      addEffect('effects__preview--phobos');
      break;
    case evt.target.classList.contains('effects__preview--heat'):
      addEffect('effects__preview--heat');
      break;
  }
};
// 'Click' event, which calls change of filter effects
imgEditForm.addEventListener('click', changeEffect);

// ==== 4.3. Масштаб
// 4.3.1. При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value. Значение должно изменяться с шагом в 25. Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
// 4.3.2. При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).
var SCALE_STEP = 25;
var Scale = {
  VALUE_MIN: 25,
  VALUE_MAX: 100,
};

var imgPreviewSizeButtons = document.querySelector('.scale__control');
var imgPreviewSize = parseInt(document.querySelector('.scale__control--value').value, 10);

var onChangeSizeOfImgPreview = function (evt) {
  if ((evt.target.classList.contains('scale__control--bigger') && imgPreviewSize < Scale.VALUE_MAX)) {
    document.querySelector('.scale__control--value').value = imgPreviewSize + SCALE_STEP + '%';
  } else if ((evt.target.classList.contains('scale__control--smaller') && imgPreviewSize > Scale.VALUE_MIN)) {
    document.querySelector('.scale__control--value').value = imgPreviewSize - SCALE_STEP + '%';
  }
};

// var imgPreviewSize = document.querySelector('.scale__control--value').value;

// var onChangeSizeOfImgPreview = function (evt) {
//   if ((evt.target.classList.contains('scale__control--bigger') && imgPreviewSize < Scale.VALUE_MAX)) {
//     imgPreviewSize = parseInt(document.querySelector('.scale__control--value').value, 10) + SCALE_STEP + '%';
//   } else if ((evt.target.classList.contains('scale__control--smaller') && imgPreviewSize > Scale.VALUE_MIN)) {
//     imgPreviewSize = parseInt(document.querySelector('.scale__control--value').value, 10) - SCALE_STEP + '%';
//   }
// };

imgPreviewSizeButtons.addEventListener('click', onChangeSizeOfImgPreview);

// Предыдущая попытка
// var changeValue = function (increase, decrease) {
//   var value = parseInt(document.querySelector('.scale__control--value').value, 10);
//   value = isNaN(value) ? 0 : value;
//   value = value + increase;
//   value = value - decrease;
//   document.querySelector('.scale__control--value').value = value;
// };

// var increaseValue = function () {
//   changeValue(25, 0);
// };

// var decreaseValue = function () {
//   changeValue(0, 25);
// }
