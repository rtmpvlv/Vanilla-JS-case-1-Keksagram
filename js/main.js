import { togglePhotoOverlay } from './to-full.js';
import { photoDescriptions, getPhotoDescription } from './photo-description.js';
import { renderUserPhotos } from './thumbnails.js';
import { uploadFile } from './upload-photo.js';

getPhotoDescription();
renderUserPhotos(photoDescriptions);
togglePhotoOverlay(photoDescriptions);
uploadFile();
