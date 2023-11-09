import { Component } from '../component';
import html from './favourites.tpl.html';

import { ProductList } from '../productList/productList';

class Favourites extends Component {
  favouriteProduct: ProductList;

  constructor(props: any) {
    super(props);

    this.favouriteProduct = new ProductList();
    this.favouriteProduct.attach(this.view.favourites);
  }

  async render() {
    const favourites = localStorage.getItem('favourites');

    const products = await JSON.parse(`${favourites}`);
    this.favouriteProduct.update(products);
  }
}

export const favouritesComp = new Favourites(html);
