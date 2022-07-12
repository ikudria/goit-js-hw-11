import { PixabayApi, PixabayApi } from './js/api-service';
import addImageCards from './templates/image-card.hbs';

// access to form and handler setup

const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', onSearch);

// access to load-more button and handler setup
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.addEventListener('click', onLoadMore);

// access to gallery
const gallery = document.querySelector('.gallery');

// rest of the code
const pixabayApi = new PixabayApi();
// console.log(pixabayApi);

function onSearch(e) {
  e.preventDefault();

  const { value } = e.currentTarget.elements.searchQuery;

  pixabayApi.setValue(value);
  pixabayApi.page = 1;

  pixabayApi.fetchImages().then(images => {
    console.log(images);

    gallery.innerHTML = addImageCards(images);
    console.log(pixabayApi);

    loadMoreBtn.classList.remove('is-hidden');
  });
}

function onLoadMore() {
  pixabayApi.increasePage();

  pixabayApi.fetchImages().then(images => {
    gallery.insertAdjacentHTML('beforeend', addImageCards(images));

    console.log(pixabayApi);

    if (!images) {
      loadMoreBtn.classList.add('is-hidden');
    }
  });
}
