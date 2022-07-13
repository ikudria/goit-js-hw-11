'use strict';
import axios from 'axios';

export class PixabayApi {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KYE = '28573564-97f60c4d957dbff469bce67d7';

  constructor() {
    this.page = 1;
    this.velue = null;
    this.totalPages = null;
  }

  fetchImages() {
    const search = new URLSearchParams({
      key: this.#API_KYE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      q: this.value,
      per_page: 40,
      page: this.page,
    });

    return axios
      .get(`${this.#BASE_URL}?${search}`)
      .then(response => response.data)
      .catch(err => console.log('Error'));
  }

  increasePage() {
    this.page += 1;
  }

  setValue(value) {
    this.value = value;
  }

  calcTotalPages(totalHits) {
    this.totalPages = Math.ceil(totalHits / 40);
  }
}
