import { Component } from '../component';
import html from './catalog.tpl.html';
import { productObserve } from '../../utils/eventAnalysis';

import { ProductList } from '../productList/productList';

class Catalog extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();

    this.productList.update(products);

    this.view.products.querySelectorAll('a').forEach((product: Element) => productObserve.observe(product,));
  }
}

export const catalogComp = new Catalog(html);
