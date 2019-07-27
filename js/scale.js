'use strict';

(function () {
  // ==== Масштаб
  // 1. При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value. Значение должно изменяться с шагом в 25. Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
  // 2. При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).
  var SCALE_STEP = 25;
  var Scale = {
    VALUE_MIN: 25,
    VALUE_MAX: 100,
  };

  var imgPreviewSizeValueFieldset = document.querySelector('.img-upload__scale');
  var imgPreviewSizeValue = parseInt(document.querySelector('.scale__control--value').value, 10);

  // ? именование window.main.imgPreview не работает
  var zoomImg = function () {
    window.imgPreview.style.transform = 'scale(' + imgPreviewSizeValue / 100 + ')';
  };

  var onChangeSizeOfImgPreview = function (evt) {
    if ((evt.target.classList.contains('scale__control--bigger') && imgPreviewSizeValue < Scale.VALUE_MAX)) {
      document.querySelector('.scale__control--value').value = imgPreviewSizeValue + SCALE_STEP + '%';
      imgPreviewSizeValue += SCALE_STEP;
      zoomImg();
    } else if ((evt.target.classList.contains('scale__control--smaller') && imgPreviewSizeValue > Scale.VALUE_MIN)) {
      document.querySelector('.scale__control--value').value = imgPreviewSizeValue - SCALE_STEP + '%';
      imgPreviewSizeValue -= SCALE_STEP;
      zoomImg();
    }
  };

  imgPreviewSizeValueFieldset.addEventListener('click', onChangeSizeOfImgPreview);
})();


