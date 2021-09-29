import { openOverlay } from './to-full.js';
import { photoDescriptions, getPhotoDescription } from './photo-description.js'
import { renderUserPhotos } from './thumbnails.js'

// console.log(photoDescriptions);
// console.log(getComments());

getPhotoDescription();
renderUserPhotos(photoDescriptions);
openOverlay(photoDescriptions);
