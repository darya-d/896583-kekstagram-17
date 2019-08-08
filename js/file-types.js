'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileInput = document.querySelector('.img-upload__input');
  var preview = document.querySelector('.img-upload__preview img');
  var photosPreview = Array.from(document.querySelectorAll('.effects__preview'));

  fileInput.addEventListener('change', function () {
    var file = fileInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;

        for (var i = 0; i < photosPreview.length; i++) {
          photosPreview[i].style.backgroundImage = 'url(' + preview.src + ')';
        }
      });

      reader.readAsDataURL(file);
    }
  });
})();
