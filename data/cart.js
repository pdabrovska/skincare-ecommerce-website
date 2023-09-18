export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function deleteProduct(productId){
  const newCart = [];

  cart.forEach(item =>{
    if(item.productId !== productId){
      newCart.push(item);
    }
  });

  cart = newCart;
  localStorage.setItem('cart', JSON.stringify(cart));
};