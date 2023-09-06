const menu = document.querySelector('.js-burger');
const navbar = document.querySelector('.js-middle-section');
const cart = document.querySelector('.js-cart');

menu.onclick = () =>{
  navbar.classList.toggle('open');
  cart.classList.toggle('non-visible');
}