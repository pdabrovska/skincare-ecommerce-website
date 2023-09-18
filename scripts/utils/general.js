export function navbar(){
  const menu = document.querySelector('.js-burger');
  const navbar = document.querySelector('.js-middle-section');
  const cart = document.querySelector('.js-cart');

  menu.onclick = () =>{
    menu.classList.toggle('close-menu');
    navbar.classList.toggle('open');
    cart.classList.toggle('non-visible');

    document.querySelector('.js-about-us').addEventListener('click',()=>{
      menu.classList.remove('close-menu');
      navbar.classList.remove('open');
      cart.classList.remove('non-visible');
    });

    document.querySelector('.js-contact').addEventListener('click',()=>{
      menu.classList.remove('close-menu');
      navbar.classList.remove('open');
      cart.classList.remove('non-visible');
    });
  }
};

export function formatCurrency(priceCents){
  return (priceCents / 100).toFixed(2);
}

export function generateProducts(products, whatBadge, minPrice, maxPrice, cart){
  const carousel = document.querySelector('.js-products-container');
  let carouselHTML = ''

  products.forEach(product => {
    const {img, name, price, id, badge, section, keywords} = product;

    if(badge === whatBadge){
      const html = `
      <div class="product-card">
        <div class="product-img">
          <img src=${img}>
        </div>
        <div class="product-info">
          <p class="product-name">${name}</p>
          <div class="buy-container">
            <p class="price">$${formatCurrency(price)}</p>
            <button class="js-add-to-cart add-to-cart" data-product-id="${id}">
              <img id="js-product-${id}" src="images/cart-white.png">
            </button>
          </div>
        </div>
      </div>
      `;

      carouselHTML += html;
    }
    if(whatBadge === 'every' && (price / 100 >= minPrice && price /100 <= maxPrice)){
      const html = `
      <div class="product-card">
        <div class="product-img">
          <img src=${img}>
        </div>
        <div class="product-info">
          <p class="product-name">${name}</p>
          <div class="buy-container">
            <p class="price">$${formatCurrency(price)}</p>
            <button class="js-add-to-cart add-to-cart" data-product-id="${id}">
              <img id="js-product-${id}" src="images/cart-white.png">
            </button>
          </div>
        </div>
      </div>
      `;

      carouselHTML += html;
    }
    if(section === whatBadge && (price / 100 >= minPrice && price /100 <= maxPrice)){
      const html = `
      <div class="product-card">
        <div class="product-img">
          <img src=${img}>
        </div>
        <div class="product-info">
          <p class="product-name">${name}</p>
          <div class="buy-container">
            <p class="price">$${formatCurrency(price)}</p>
            <button class="js-add-to-cart add-to-cart" data-product-id="${id}">
              <img id="js-product-${id}" src="images/cart-white.png">
            </button>
          </div>
        </div>
      </div>
      `;

      carouselHTML += html;
    }
    if(keywords === whatBadge && (price / 100 >= minPrice && price /100 <= maxPrice)){
      const html = `
      <div class="product-card">
        <div class="product-img">
          <img src=${img}>
        </div>
        <div class="product-info">
          <p class="product-name">${name}</p>
          <div class="buy-container">
            <p class="price">$${formatCurrency(price)}</p>
            <button class="js-add-to-cart add-to-cart" data-product-id="${id}">
              <img id="js-product-${id}" src="images/cart-white.png">
            </button>
          </div>
        </div>
      </div>
      `;

      carouselHTML += html;
    }
  });

  carousel.innerHTML =  carouselHTML;

  document.querySelectorAll('.js-add-to-cart').forEach(button =>{
    button.addEventListener('click', ()=>{
      const productId = button.dataset.productId;
      addToCart(productId, cart);
    });
  });
}

function addToCart(productId, cart){
  const cartImg =  document.getElementById(`js-product-${productId}`);
  cartImg.src = "images/cart-white.gif"
  setTimeout(()=>{
    cartImg.src = "images/cart-white.png"
  }, 1100)

  let matchingProduct;
  cart.forEach(cartProduct => {
    if(cartProduct.productId === productId){
      matchingProduct = cartProduct
    }
  });

  if(matchingProduct){
    matchingProduct.quantity++;
  } else{
    cart.push({
      productId,
      quantity: 1,
    })
  }

  updateCartAmount(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function updateCartAmount(cart){
  let cartAmount = 0;
  cart.forEach(item =>{
    cartAmount += item.quantity;
  })

  document.querySelector('.cart-amount').innerHTML = cartAmount;
  return cartAmount
}