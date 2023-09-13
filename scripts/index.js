import { navbar } from "./utils/general.js";

navbar();

//slider

var counter = 1;
setInterval(()=>{
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if(counter > 4){
    counter = 1;
  }
}, 15000);

//product carousel

const carousel = document.querySelector('.js-products-container');
let firstImg = carousel.querySelectorAll('.product-card')[0];
const arrowIconLeft = document.querySelector('.js-arrow-left');
const arrowIconLRight = document.querySelector('.js-arrow-right');
let isDragStart = false, prevPageX, prevScrollLeft;

let firstImgWidth = window.matchMedia("(max-width: 290)") ? firstImg.clientWidth + 12 : (window.matchMedia("(max-width: 425)") ? firstImg.clientWidth + 20 : firstImg.clientWidth + 30);

arrowIconLeft.addEventListener('click', ()=>{
    carousel.scrollLeft +=  -firstImgWidth;
});

arrowIconLRight.addEventListener('click', ()=>{
  carousel.scrollLeft +=  firstImgWidth;
});

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if(!isDragStart) return;
  e.preventDefault();
  carousel.classList.add('dragging');
  let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove('dragging');
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);

carousel.addEventListener('touchstart', dragStart);
carousel.addEventListener('touchmove', dragging);
carousel.addEventListener('touchend', dragStop);