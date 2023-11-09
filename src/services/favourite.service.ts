import { ProductData } from 'types';

const favourites = localStorage.getItem('favourites');

class FavouriteService {
  init() {
    this._updCounters();
    this._checkVisible();
  }

  async addFavourite(product: ProductData) {
    const arr = [];
    if (favourites === null) {
      arr.push(product);
      localStorage.setItem('favourites', JSON.stringify(arr));
    } else {
      const favouritesList = JSON.parse(`${favourites}`);
      favouritesList.push(product);
      localStorage.setItem('favourites', JSON.stringify(favouritesList));
    }
    this._updCounters();
    this._checkVisible();
  }

  // async removeFavourites(product: ProductData) {
  //   const favouritesList = await JSON.parse(`${favourites}`);
  //   const newFavouritesList = favouritesList.filter(({ id }: { id: number}) => id !== product.id)
  //   localStorage.setItem('favourites', JSON.stringify(newFavouritesList));
  //   await this._updCounters();
  //   await this._checkVisible();
  // }

  async isInFavourites(product: ProductData) {
    const favouritesList = await JSON.parse(`${favourites}`);
    if (favouritesList === null) return;
    return favouritesList.some(({ id }: { id: number}) => id === product.id);
  }

  private async _updCounters() {
    const favourites = localStorage.getItem('favourites');
    const favouritesList = await JSON.parse(`${favourites}`);
    let count = 0;
    if (favouritesList === null) {
      count = 0;
    } else {
      count = favouritesList.length >= 10 ? '9+' : favouritesList.length;
    }
    //@ts-ignore
    document.querySelectorAll('.js__favourites-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }

  private async _checkVisible() {
    const favourites = localStorage.getItem('favourites');
    const favouritesList = await JSON.parse(`${favourites}`);
    if (favouritesList === null) {
      //@ts-ignore
      document.querySelector('.favourites').style.visibility = "hidden"
    } else {
      //@ts-ignore
      document.querySelector('.favourites').style.visibility = "visible"
    }
  }
}

export const favouriteService = new FavouriteService();