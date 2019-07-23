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
// Variables
var SCALE_VALUE = {
  MIN: 25,
  MAX: 100
};
var SCALE_STEP = 25;
var KEYCODE_ESC = 27;

var imgEditForm = document.querySelector('.img-upload__overlay');

var buttonPopupOpen = document.querySelector('#upload-file');
var buttonPopupClose = document.querySelector('#upload-cancel');

// var imgItem = document.querySelectorAll('.effects__item');
var imgPreview = document.querySelector('.img-upload__preview > img');
var imgPreviewButtons = document.querySelectorAll('.effects__radio');
var imgPreviewSizeButtons = document.querySelector('.scale__control');
var imgPreviewSize = document.querySelector('.scale__control--value').value;

// var effects = {
//   chrome: ['grayscale', 0, 1],
//   sepia: ['sepia', 0, 1],
//   marvin: ['invert', 0, 100 + '%'],
//   phobos: ['blur', 0, 3 + '%'],
//   heat: ['brightness', 1, 3]
// };
var effectNone = document.querySelector('.effects__preview--none');

// var imgEffectPin = document.querySelector('.effect-level__pin');
var imgEffectLine = document.querySelector('.img-upload__effect-level');
// var imgEffectValue = document.querySelector('.effect-level__value');
// var imgEffectValueDefault = SCALE_VALUE.MAX;

var commentsArea = document.querySelector('.text__description');
// var hashtagsArea = document.querySelector('.text__hashtags');


// ==== 4.1. Обработка изменения значения поля выбора файла #upload-file. При наступлении события change на этом поле, можно сразу показывать форму редактирования изображения.
// ==== 4.4. Валидация: если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

buttonPopupOpen.addEventListener('change', function () {
  imgEditForm.classList.remove('hidden');

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ESC && evt.target !== commentsArea) {
      imgEditForm.classList.add('hidden');
    }
  });
});

buttonPopupClose.addEventListener('click', function () {
  imgEditForm.classList.add('hidden');
});

// ==== 4.2. Наложение эффекта на изображение
// 4.2.1. На изображение может накладываться только один эффект.
// 4.2.2. При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
// 4.2.3. Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin. Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта, CSS-стили элемента .img-upload__preview обновляются.
// 4.2.4. При выборе эффекта «Оригинал» слайдер скрывается.
// 4.2.5. При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.

imgPreviewButtons.forEach(function (radioButton) {
  radioButton.addEventListener('click', function (evt) {
    var imgPreviewTarget = evt.target.parentElement.querySelector('.effects__preview');
    imgPreview.classList = imgPreviewTarget.classList[1];
    // imgEffectLine.classList.remove('hidden');
  });

  effectNone.addEventListener('click', function () {
    imgEffectLine.classList.add('hidden');
    // imgEffectLine.classList.remove('hidden');
  });
});

// var deleteEffectsClasses = function (nameOfEffect) {
//   imgPreview.removeAttribute('class');
//   imgPreview.classList.add(nameOfEffect);
//   imgEffectLine.classList.remove('hidden');
// };

// effectNone.addEventListener('click', function () {
//   deleteEffectsClasses();
//   imgEffectLine.classList.add('hidden');
// });


// ==== 4.3. Масштаб
// 4.3.1. При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value. Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%, после нажатия на «+», значение должно стать равным 75%. Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
// 4.3.2. При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).
// var TRANSFORM_SCALE_MAX = 1;
// var imgPreviewTransform = imgPreviewTransform.TRANSFORM_SCALE_MAX;

// var changeTransformScale = function (valueOfScale) {
//   imgPreview.style.transform = valueOfScale;
// };
// //  changeImgScale('scale(1)');

// var decreaseValue = function () {
//   if (imgPreviewSize > SCALE_VALUE.MIN) {
//     imgPreviewSize = imgPreviewSize - SCALE_STEP;
//   }
// };

// var increaseValue = function () {
//   if (imgPreviewSize < SCALE_VALUE.MAX) {
//     imgPreviewSize = imgPreviewSize + SCALE_STEP;
//   }
// };

// document.addEventListener('click', function (evt) {
//   if (evt.target.classList.contains('scale__control--bigger')) {
//     increaseValue();
//   } else if (evt.target.classList.contains('scale__control--smaller')) {
//     decreaseValue();
//   } return imgEffectValueDefault;
// });

var changeSizeOfImgPreview = function (button) {
  if ((button.target.classList.contains('scale__control--bigger') && imgPreviewSize < SCALE_VALUE.MAX)) {
    imgPreviewSize += SCALE_STEP;
  } else if ((button.target.classList.contains('scale__control--smaller') && imgPreviewSize > SCALE_VALUE.MIN)) {
    imgPreviewSize -= SCALE_STEP;
  }
};

imgPreviewSizeButtons.addEventListener('click', changeSizeOfImgPreview);
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
