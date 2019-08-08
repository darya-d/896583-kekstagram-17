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
  var scaleValue = document.querySelector('.scale__control--value');
  var imgPreview = window.form.imgPreview;

  /**
   * Function which change the scale of the image
   * @param {number} sizeValue
   */
  var zoomImg = function (sizeValue) {
    imgPreview.style.transform = 'scale(' + sizeValue / 100 + ')';
  };

  /**
   * Function which change the value of the .scale__control - value field
   *
   * @param {event} evt
   */
  var onChangeSizeOfImgPreview = function (evt) {
    var imgPreviewSizeValue = parseInt(scaleValue.value, 10);
    if ((evt.target.classList.contains('scale__control--bigger') && imgPreviewSizeValue < ScaleValue.MAX)) {
      scaleValue.value = imgPreviewSizeValue + ScaleValue.STEP + '%';
      imgPreviewSizeValue += ScaleValue.STEP;
      zoomImg(imgPreviewSizeValue);
    } else if ((evt.target.classList.contains('scale__control--smaller') && imgPreviewSizeValue > ScaleValue.MIN)) {
      scaleValue.value = imgPreviewSizeValue - ScaleValue.STEP + '%';
      imgPreviewSizeValue -= ScaleValue.STEP;
      zoomImg(imgPreviewSizeValue);
    }
    // if ((evt.target.classList.contains('scale__control--bigger') && imgPreviewSizeValue < ScaleValue.MAX)) {
    //   document.querySelector('.scale__control--value').value = imgPreviewSizeValue + ScaleValue.STEP + '%';
    //   imgPreviewSizeValue += ScaleValue.STEP;
    //   zoomImg();
    // } else if ((evt.target.classList.contains('scale__control--smaller') && imgPreviewSizeValue > ScaleValue.MIN)) {
    //   document.querySelector('.scale__control--value').value = imgPreviewSizeValue - ScaleValue.STEP + '%';
    //   imgPreviewSizeValue -= ScaleValue.STEP;
    //   zoomImg();
    // }
  };

  imgPreviewSizeValueFieldset.addEventListener('click', onChangeSizeOfImgPreview);

  // add object to the global scope
  window.scale = {
    zoomImg: zoomImg,
    scaleValue: scaleValue
  };
})();
