export function navbar(){
  const menu = document.querySelector('.js-burger');
  const navbar = document.querySelector('.js-middle-section');
  const cart = document.querySelector('.js-cart');

  menu.onclick = () =>{
    menu.classList.toggle('close-menu');
    navbar.classList.toggle('open');
    cart.classList.toggle('non-visible');

    document.querySelector('.js-about-us').addEventListener('click',()=>{
      menu.classList.toggle('close-menu');
      navbar.classList.toggle('open');
      cart.classList.toggle('non-visible');
    });

    document.querySelector('.js-contact').addEventListener('click',()=>{
      menu.classList.toggle('close-menu');
      navbar.classList.toggle('open');
      cart.classList.toggle('non-visible');
    });
  }
};

export function formatCurrency(priceCents){
  return (priceCents / 100).toFixed(2);
}

export function generateProducts(products, whatBadge){
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
              <img src="images/cart-white.png">
            </button>
          </div>
        </div>
      </div>
      `;

      carouselHTML += html;
    }
    if(whatBadge === 'every'){
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
              <img src="images/cart-white.png">
            </button>
          </div>
        </div>
      </div>
      `;

      carouselHTML += html;
    }
    if(section === whatBadge){
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
              <img src="images/cart-white.png">
            </button>
          </div>
        </div>
      </div>
      `;

      carouselHTML += html;
    }
    if(keywords === whatBadge){
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
              <img src="images/cart-white.png">
            </button>
          </div>
        </div>
      </div>
      `;

      carouselHTML += html;
    }
  });

  carousel.innerHTML =  carouselHTML;
}