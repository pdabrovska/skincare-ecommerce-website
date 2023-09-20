import { navbar, updateCartAmount, formatCurrency } from "./utils/general.js";
import { products } from "../data/products.js";
import { cart, deleteProduct } from "../data/cart.js";

navbar();
updateCartPage();


if(updateCartAmount(cart) !== 0){
  document.querySelector('.empty-cart').classList.add('empty-cart-inactive');
  document.querySelector('.cart-products-container').classList.add('cart-not-empty');
} else{
  document.querySelector('.empty-cart').classList.remove('empty-cart-inactive');
  document.querySelector('.cart-products-container').classList.remove('cart-not-empty');
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
                  <select name="quantity" class="js-quantity-${id}" id="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                  </select> 
                </form>
              </span>
              <span>
                <p>Total:</p>
                <p class="js-product-total-${id}">$${formatCurrency(price*quantity)}</p>
              </span>
            </div>
            <button class="delete-product" data-product-id="${id}">
              <img src="images/delete-bin.png" >
            </button>
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
      const productId = button.dataset.productId;
      deleteProduct(productId);
      if(updateCartAmount(cart) === 0){
        document.querySelector('.empty-cart').classList.remove('empty-cart-inactive');
        document.querySelector('.cart-products-container').classList.remove('cart-not-empty');
      }else{
        updateCartPage();
        selectorDefaultQuantity()
      }

    });
  });

  selectQuantity();
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

function updateCartPage(){
  updateCartAmount(cart);
  generateCart();
  document.querySelector('.js-products-amount').innerHTML = `Products (${updateCartAmount(cart)} items):`;
  updateProductsTotal();
  updateTotal();
  selectorDefaultQuantity()
}

selectorDefaultQuantity();

function selectorDefaultQuantity(){
  cart.forEach(item =>{
    const {productId, quantity} = item;
    if(quantity > 20){
      document.querySelector(`.js-quantity-${productId}`).innerHTML += `<option value="more">${quantity}</option>`;
      document.querySelector(`.js-quantity-${productId}`).selectedIndex = `${quantity - 1}`;
    } else{
      document.querySelector(`.js-quantity-${productId}`).selectedIndex = `${quantity - 1}`;
    }
  })
};

function selectQuantity(){
  cart.forEach(item =>{
    const {productId} = item;
    const itemQuantity = item.quantity;
      document.querySelectorAll(`.js-quantity-${productId}`).forEach(option => {
        option.addEventListener('click', ()=>{
          item.quantity = option.selectedIndex + 1;
          localStorage.setItem('cart', JSON.stringify(cart));
          if(itemQuantity !== item.quantity){
            updateCartAmount(cart);
            document.querySelector('.js-products-amount').innerHTML = `Products (${updateCartAmount(cart)} items):`;
            updateProductsTotal();
            updateTotal();

            let cartPrice;
            products.forEach(product =>{
              if(product.id === productId){
                cartPrice = product.price;
              }
            })
            document.querySelector(`.js-product-total-${productId}`).innerHTML = `$${formatCurrency(cartPrice * item.quantity)}`;
          }

          document.body.addEventListener('click', ()=>{
            updateCartAmount(cart);
            document.querySelector('.js-products-amount').innerHTML = `Products (${updateCartAmount(cart)} items):`;
            updateProductsTotal();
            updateTotal();

            let cartPrice;
            products.forEach(product =>{
              if(product.id === productId){
                cartPrice = product.price;
              }
            })
            document.querySelector(`.js-product-total-${productId}`).innerHTML = `$${formatCurrency(cartPrice * item.quantity)}`;
          })
        });
      });
  })
};

