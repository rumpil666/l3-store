import { ProductData } from 'types';

class FavouriteService {
  init() {
    this._updCounters();
    this._toggleVisible();
  }

  private async _getFavouritesList() {
    const favourites = localStorage.getItem('favourites');
    const favouritesList = await JSON.parse(`${favourites}`);
    return favouritesList;
  }

  async addFavourite(product: ProductData) {
    const favourites = localStorage.getItem('favourites');
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
    this._toggleVisible();
  }

  async removeFavourites(product: ProductData) {
    const favouritesList = await this._getFavouritesList();
    const newFavouritesList = favouritesList.filter(({ id }: { id: number}) => id !== product.id)
    localStorage.setItem('favourites', JSON.stringify(newFavouritesList));
    await this._updCounters();
    await this._toggleVisible();
  }

  async isInFavourites(product: ProductData) {
    const favouritesList = await this._getFavouritesList();
    if (favouritesList === null) return;
    return favouritesList.some(({ id }: { id: number}) => id === product.id);
  }

  private async _updCounters() {
    const favouritesList = await this._getFavouritesList();
    let count = 0;
    if (favouritesList === null) {
      count = 0;
    } else {
      count = favouritesList.length >= 10 ? '9+' : favouritesList.length;
    }
    //@ts-ignore
    document.querySelectorAll('.js__favourites-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }

  private async _toggleVisible() {
    const favouritesList = await this._getFavouritesList();
    if (favouritesList.length === 0) {
      //@ts-ignore
      document.querySelector('.favourites').style.visibility = "hidden"
    } else {
      //@ts-ignore
      document.querySelector('.favourites').style.visibility = "visible"
    }
  }
}

export const favouriteService = new FavouriteService();