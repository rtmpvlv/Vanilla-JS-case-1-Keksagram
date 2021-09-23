'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.open('GET', 'https://intensive-javascript-server-pedmyactpq.now.sh/kekstagram/data');

  var pictureTemplate = document.querySelector('#picture-template').content;
  var picturesContainer = document.querySelector('.pictures');

  xhr.onload = function () {
    var data = xhr.response;
    data.forEach(function (it) {
      var node = pictureTemplate.cloneNode(true);

      var image = node.querySelector('img');
      image.src = it.url;

      picturesContainer.appendChild(node);
    });
  };

  xhr.send();
})();
