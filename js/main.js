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
 * Функцию для создания массива из 25 сгенерированных JS объектов.
 *
 * @param {number} countPhotoUsers - количество пользователей
 * @param {string} url — адрес картинки вида photos/{{i}}.jpg, где {{i}} это число от 1 до 25. Адреса картинок не должны повторяться.
 * @param {number} likes - количество лайков, поставленных фотографии. Случайное число от 15 до 200.
 * @param {array} comments - список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев определяется на своё усмотрение. Все комментарии генерируются случайным образом.
 * @return {object} - описание фотографии, опубликованной пользователем.
 */
var NUMBER_OF_LIKES_MIN = 15;
var NUMBER_OF_LIKES_MAX = 200;
var NUMBER_OF_PHOTO_USERS = 25;

var getPhotoUsers = function (countPhotoUsers) {
  return createArray(countPhotoUsers).map(function (_value, index) {
    return {
      url: 'photos/' + (index + 1) + '.jpg',
      likes: generateRandomNumber(NUMBER_OF_LIKES_MIN, NUMBER_OF_LIKES_MAX),
      comments: generateListOfComments()
    };
  });
};

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


// 4th MODULE - EVENTS
// 4.1. Обработка изменения значения поля выбора файла #upload-file. При наступлении события change на этом поле, можно сразу показывать форму редактирования изображения.
var fileUploader = document.querySelector('#upload-file');
var imgEditingForm = document.querySelector('.img-upload__overlay');
var buttonClosingForm = document.querySelector('#upload-cancel');

fileUploader.addEventListener('change', function () {
  imgEditingForm.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      imgEditingForm.classList.add('hidden');
    }
  });
});

buttonClosingForm.addEventListener('click', function () {
  imgEditingForm.classList.add('hidden');
});

// 4.2. Наложение эффекта на изображение:
// 4.2.1. На изображение может накладываться только один эффект.
// 4.2.2. При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
// var imgItem = document.querySelectorAll('.effects__item');
var imgPreview = document.querySelector('.img-upload__preview > img');
var radioButtonsOfImgPreview = document.querySelectorAll('.effects__radio');

var effectNone = document.querySelector('.effects__preview--none');

// var pinOfLevelEffect = document.querySelector('.effect-level__pin');
var lineOfLevelEffect = document.querySelector('.img-upload__effect-level');
// var levelOfValueEffect = document.querySelector('.effect-level__value');

radioButtonsOfImgPreview.forEach(function (radioButton) {
  radioButton.addEventListener('click', function (evt) {
    var imgPreviewTarget = evt.target.parentElement.querySelector('.effects__preview');
    imgPreview.classList = imgPreviewTarget.classList[1];
    // lineOfLevelEffect.classList.remove('hidden');
  });

  effectNone.addEventListener('click', function () {
    lineOfLevelEffect.classList.add('hidden');
    // lineOfLevelEffect.classList.remove('hidden');
  });
});

// 4.2.4. При выборе эффекта «Оригинал» слайдер скрывается.
// var deleteEffectsClasses = function (nameOfEffect) {
//   imgPreview.removeAttribute('class');
//   imgPreview.classList.add(nameOfEffect);
//   lineOfLevelEffect.classList.remove('hidden');
// };

// effectNone.addEventListener('click', function () {
//   deleteEffectsClasses();
//   lineOfLevelEffect.classList.add('hidden');
// });

// 4.2.3. Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin. Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта, CSS-стили элемента .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1);
// Для эффекта «Сепия» — filter: sepia(0..1);
// Для эффекта «Марвин» — filter: invert(0..100%);
// Для эффекта «Фобос» — filter: blur(0..3px);
// Для эффекта «Зной» — filter: brightness(1..3).

// 4.2.5. При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться
