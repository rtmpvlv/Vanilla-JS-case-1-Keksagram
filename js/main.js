import { openOverlay } from './to-full.js';
import { photoDescriptions, getPhotoDescription } from './photo-description.js'
import { renderUserPhotos } from './thumbnails.js'

getPhotoDescription();
renderUserPhotos(photoDescriptions);
openOverlay(photoDescriptions);
