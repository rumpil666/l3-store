export const analysis = (type: string, payload: object) => {
  const date = new Date();
  const timestamp = date.getTime();
  return fetch('/api/sendEvent', {
    method: 'POST',
    body: JSON.stringify({
      type: type,
      payload: payload,
      timestamp: timestamp
    })
  });
}

const setSecretKey = (id: number, product: { secretKey: string; }) => {
  return fetch(`/api/getProductSecretKey?id=${id}`)
    .then((res) => res.json())
    .then((secretKey) => {
      product.secretKey = secretKey
    });
}

export const productObserve = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const href = entry.target.getAttribute('href');

        const productViewPortId: number = href !== null ? Number(href.substr(href.indexOf("=") + 1)) : 0;

        async function getProduct() {
          const productsResp = await fetch('/api/getProducts');
          const products = await productsResp.json();

          const product = products.find((product: { id: number; }) => product.id === productViewPortId);

          await setSecretKey(productViewPortId, product);

          if (Object.keys(product.log).length !== 0) {
            analysis('viewCardPromo', product)
          } else {
            analysis('viewCard', product)
          }
        }

        getProduct()

        observer.unobserve(entry.target);
      }
    })
  },
  {}
);
