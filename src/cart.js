function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(basket, item, quantity) {
  const itemInBasket = basket.find((product) => product.id === item.id);
  if (item.stock < quantity) {
    throw new RangeError('Отствутствует количество торваров на складе');
  }

  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  if (!itemInBasket) {
    return [...basket, { ...item, quantity }];
  } else {
    return basket.map((product) => {
      if (product.id === item.id) {
        return { ...item, quantity: product.quantity + quantity };
      } else {
        return product;
      }
    });
  }
}
const headphones = { id: 1, name: 'Наушники', price: 49900, stock: 8 };
const cart = [{ ...headphones, quantity: 1 }];

function changeQuantity(item, id, newQuantity) {
  if (newQuantity <= 0) {
    throw new RangeError('Нельзя ввести 0');
  }
  const newQuant = item.map((product) => {
    if (product.id === id) {
      if (product.stock < newQuantity) {
        throw new RangeError('Недостаточно количества на складе');
      }
      return { ...product, quantity: newQuantity };
    } else {
      return product;
    }
  });

  return newQuant;
}
function removeFromCart() {
  return notImplemented();
}
function calculateCartSubtotal() {
  return notImplemented();
}
function calculateOrderTotal() {
  return notImplemented();
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;

const basket = [{ ...headphones, quantity: 1 }];
const result = addToCart(basket, headphones, 2);
console.log(changeQuantity(cart, 1, 3));
console.log('Корзина до:', basket);
console.log('Результат:', result);
