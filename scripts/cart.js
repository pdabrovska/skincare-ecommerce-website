import { navbar, updateCartAmount, formatCurrency } from "./utils/general.js";
import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

navbar();
updateCartAmount(cart);
generateCart();
document.querySelector('.js-products-amount').innerHTML = `Products (${updateCartAmount(cart)} items):`;
updateProductsTotal();
updateTotal();


if(updateCartAmount(cart) !== 0){
  document.querySelector('.empty-cart').classList.add('empty-cart-inactive');
} else{
  document.querySelector('.empty-cart').classList.remove('empty-cart-inactive');
}

//generate cart
function generateCart(){
  let productsHTML =  '';
  cart.forEach(cartItem => {
    const cartItemId = cartItem.productId;
    const {quantity} = cartItem;
    products.forEach(product =>{
      const {name, price, img, id} = product;
      if(product.id === cartItemId){
        let html = `
        <div class="product-card">
          <img class="product-img" src=${img}>
          <div class="info">
            <div class="name-price">
              <p>${name}</p>
              <p>$${formatCurrency(price)}</p>
            </div>
            <div class="details">
              <span>
                <p>Details:</p>
                <p>30ml</p>
              </span>
              <span>
                <form class="quantity-form">
                  <p>Quantity:</p>
                  <select name="quantity" id="quantity">
                    <option value="">${quantity}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select> 
                </form>
              </span>
              <span>
                <p>Total:</p>
                <p>$${formatCurrency(price*quantity)}</p>
              </span>
            </div>
            <img class="delete-product" src="images/delete-bin.png">
          </div>
        </div>
        `;

        productsHTML += html;
      }
    });
  });

  document.querySelector('.cart-items').innerHTML = productsHTML;

  document.querySelectorAll('.delete-product').forEach(button => {
    button.addEventListener('click', ()=>{
      console.log(0)
    });
  });
};

function updateProductsTotal(){
  let productsTotal = 0;

  cart.forEach(cartItem => {
    const {productId, quantity} = cartItem;
    products.forEach(product =>{
      if(product.id === productId){
        productsTotal += (product.price*quantity);
      }
    })
  });
  document.querySelector('.js-products-total').innerHTML = `$${formatCurrency(productsTotal)}`;
  return productsTotal;
}

function updateTotal(){
  let total = 0;
  const shippingCost = 799;

  total = shippingCost + updateProductsTotal();
  document.querySelector('.js-order-total').innerHTML = `$${formatCurrency(total)}`;
};

function deleteProduct(){

};