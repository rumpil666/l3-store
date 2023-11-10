import { Component } from '../component';
import html from './searchSuggestions.tpl.html';

class SearchSuggestions extends Component {

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();
    const arrProductName: string[] = [];
    products.forEach(({ name }: { name: string }) => {
      arrProductName.push(name);
    })
    const arrHintEl = this.view.searchSuggestions.querySelectorAll('.search-suggestions__background--gradient');
    arrHintEl.forEach((elem: HTMLElement) => {
      const textHint: string = arrProductName[Math.floor(Math.random()*arrProductName.length)];
      elem.innerText = textHint.split(' ').slice(0, 2).join(' ').toLowerCase();
    })
  }
}

export const searchSuggestionsComp = new SearchSuggestions(html);