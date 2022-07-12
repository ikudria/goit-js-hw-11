'use strict';
import Notiflix from 'notiflix';
import axios from 'axios';

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KYE = '28573564-97f60c4d957dbff469bce67d7';

  constructor() {
    this.page = 1;
    this.velue = null;
  }

  fetchImages() {
    const search = new URLSearchParams({
      key: this.#API_KYE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      q: this.value,
      per_page: 200,
      page: this.page,
    });

    return axios
      .get(`${this.#BASE_URL}?${search}`)
      .then(response => response.data.hits)
      .catch(err =>
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        )
      );

    // return fetch(`${this.#BASE_URL}?${search}`)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw Notiflix.Notify.failure(
    //         'Sorry, there are no images matching your search query. Please try again.'
    //       );
    //     }
    //     return response.json();
    //   })
    //   .catch(err => console.log(err));
  }

  increasePage() {
    this.page += 1;
  }

  setValue(value) {
    this.value = value;
  }
}
