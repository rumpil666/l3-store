import { Component } from '../component';
import html from './searchSuggestions.tpl.html';

import { ProductData } from 'types';

class SearchSuggestions extends Component {

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();

    const arrHintEl = this.view.searchSuggestions.querySelectorAll('.search-suggestions__hint--link');
    arrHintEl.forEach((elem: HTMLElement) => {
      const getProduct: ProductData = products[Math.floor(Math.random()*products.length)];

      const name = getProduct['name'].split(' ').slice(0, 2).join(' ').toLowerCase();
      const link = getProduct['src'];

      elem.innerText = name;
      elem.setAttribute('href', link);
    })
  }
}

export const searchSuggestions = new SearchSuggestions(html);