import { navbar, updateCartAmount } from "./utils/general.js";
import { cart } from "../data/cart.js";

navbar();
updateCartAmount(cart);

if(updateCartAmount(cart) !== 0){
  document.querySelector('.empty-cart').classList.add('empty-cart-inactive');
} else{
  document.querySelector('.empty-cart').classList.remove('empty-cart-inactive');
}