import { PixabayApi, PixabayApi } from './js/api-service';
import Notiflix from 'notiflix';
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

async function onSearch(e) {
  e.preventDefault();

  const { value } = e.currentTarget.elements.searchQuery;

  pixabayApi.setValue(value);
  pixabayApi.page = 1;

  try {
    const data = await pixabayApi.fetchImages();
    const totalHits = data.totalHits;
    const images = data.hits;
    // console.log(images);
    pixabayApi.calcTotalPages(totalHits);

    if (images.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtn.classList.add('is-hidden');
    } else {
      gallery.innerHTML = addImageCards(images);
      console.log(pixabayApi.page);

      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  pixabayApi.page += 1;

  try {
    const data = await pixabayApi.fetchImages();
    gallery.insertAdjacentHTML('beforeend', addImageCards(data.hits));

    console.log(pixabayApi.page);

    if (pixabayApi.page === pixabayApi.totalPages) {
      loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
  }
}
