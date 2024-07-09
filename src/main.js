// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import fetchingGallery from './js/pixabay-api';
import renderGallery from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const userRequest = event.target.elements.requestValue.value.trim();

  if (!userRequest) {
    return;
  }

  galleryList.innerHTML = '<span class="loader"></span>';

  fetchingGallery(userRequest)
    .then(processedHits => {
      if (!processedHits.length) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        galleryList.innerHTML = '';

        return;
      }

      setTimeout(() => {
        renderGallery(processedHits, galleryList);
      }, 1000);
    })
    .catch(error => console.error(error));

  searchForm.reset();
});
