'use strict';

(function () {
  var fileUpload = document.querySelector('#upload-file');
  var overlay = document.querySelector('.upload-overlay');

  fileUpload.onchange = function () {
    overlay.classList.remove('hidden');
  };
})();
