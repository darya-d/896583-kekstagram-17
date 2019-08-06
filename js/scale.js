'use strict';
// scale.js - module of image scale managing.

(function () {
  var ScaleValue = {
    DEFAULT: 100,
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var imgPreviewSizeValueFieldset = document.querySelector('.img-upload__scale');
  var imgPreviewSizeValue = parseInt(document.querySelector('.scale__control--value').value, 10);
  var imgPreview = window.form.imgPreview;

  /**
   * Function which change the scale of the image
   */
  var zoomImg = function () {
    imgPreview.style.transform = 'scale(' + imgPreviewSizeValue / 100 + ')';
  };

  /**
   * Function which change the value of the .scale__control - value field
   *
   * @param {*} evt
   */
  var onChangeSizeOfImgPreview = function (evt) {
    if ((evt.target.classList.contains('scale__control--bigger') && imgPreviewSizeValue < ScaleValue.MAX)) {
      document.querySelector('.scale__control--value').value = imgPreviewSizeValue + ScaleValue.STEP + '%';
      imgPreviewSizeValue += ScaleValue.STEP;
      zoomImg();
    } else if ((evt.target.classList.contains('scale__control--smaller') && imgPreviewSizeValue > ScaleValue.MIN)) {
      document.querySelector('.scale__control--value').value = imgPreviewSizeValue - ScaleValue.STEP + '%';
      imgPreviewSizeValue -= ScaleValue.STEP;
      zoomImg();
    }
  };

  imgPreviewSizeValueFieldset.addEventListener('click', onChangeSizeOfImgPreview);

  // add object to the global scope
  window.scale = {
    zoomImg: zoomImg
  };
})();


