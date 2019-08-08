'use strict';
// other-pictures.js - ability to download different pictures.

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imgUploader = window.form.imgUploader;
  var imgPreview = window.form.imgPreview;
  var fileInput = imgUploader.querySelector('.img-upload__input');

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
      });

      reader.readAsDataURL(file);
    }
  });
})();
