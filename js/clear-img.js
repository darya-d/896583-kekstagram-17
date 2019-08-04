'use strict';
// clear.js -  delete information from pictures
(function () {
  var pictures = window.miniature.pictures;

  var clearImg = function () {
    var picturesCollection = pictures.querySelectorAll('.picture');
    // метод Array.from принимает итерируемый объект или псевдомассив и делает из него «настоящий» Array. После этого мы уже можем использовать методы массивов.
    var picturesArray = Array.from(picturesCollection);
    picturesArray.forEach(function (it) {
      pictures.removeChild(it);
    });
  };

  // add object to the global scope
  window.clear = {
    clearImg: clearImg
  };

})();
