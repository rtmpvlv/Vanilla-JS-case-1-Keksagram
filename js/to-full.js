
const openOverlay = () => {

  const galleryOverlay = document.querySelector('.gallery-overlay');
  const closeButton = galleryOverlay.querySelector('.gallery-overlay-close');

  const thumbnails = document.querySelectorAll('.picture');

  thumbnails.forEach(item => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();

      galleryOverlay.classList.remove('hidden');

      galleryOverlay.querySelector('img').src = item.querySelector('img').src;
      galleryOverlay.querySelector('.likes-count').textContent = item.querySelector('.picture-likes').textContent;
      galleryOverlay.querySelector('.comments-count').textContent = item.querySelector('.picture-comments').textContent;
    });
  });

  closeButton.addEventListener('click', () => {
    galleryOverlay.classList.add('hidden');
  });
}

export {
  openOverlay
}
