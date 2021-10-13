import { getData } from './fetch.js';
import { togglePhotoOverlay } from './to-full.js';
import { renderUserPhotos } from './thumbnails.js';
import { uploadFile } from './upload-photo.js';

getData((photos) => {
  renderUserPhotos(photos);
  togglePhotoOverlay(photos);
})

uploadFile();
