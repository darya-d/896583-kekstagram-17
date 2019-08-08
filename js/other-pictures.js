'use strict';
// other-pictures.js - ability to download different pictures.

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imgUploader = window.form.imgUploader;
  var imgPreview = window.form.imgPreview;
  var fileInput = imgUploader.querySelector('.img-upload__input');
  var effectsPreview = Array.from(imgUploader.querySelectorAll('.effects__preview'));

  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgPreview.src = reader.result;

        for (var i = 0; i < effectsPreview.length; i++) {
          effectsPreview[i].style.backgroundImage = 'url(' + imgPreview.src + ')';
        }
      });

      reader.readAsDataURL(file);
    }
  });
})();
