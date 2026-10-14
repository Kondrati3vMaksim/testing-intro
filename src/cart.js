function addToCart(basket, item, quantity) {
  const itemInBasket = basket.find((product) => product.id === item.id);
  const currentQuantity = itemInBasket ? itemInBasket.quantity : 0;
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше нуля');
  }

  if (currentQuantity + quantity > item.stock) {
    throw new RangeError('Отствутствует количество торваров на складе');
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
function removeFromCart(cart, id) {
  return cart.filter((product) => product.id !== id);
}
function calculateCartSubtotal(basket) {
  return basket.reduce((sum, item) => sum + item.quantity * item.price, 0);
}
function calculateOrderTotal(basket, promo) {
  const subTotal = calculateCartSubtotal(basket);
  const delivery = subTotal < 50000 ? 30000 : 0;
  const discount = subTotal >= 20000 && promo === 'SAVE10' ? subTotal * 0.1 : 0;
  return {
    subtotal: subTotal,
    discount: discount,
    delivery: delivery,
    total: subTotal + delivery - discount,
  };
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
