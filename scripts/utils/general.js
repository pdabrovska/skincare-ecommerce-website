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