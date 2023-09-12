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
//firstImg = carousel.querySelectorAll('.product-card')[0];
const arrowIcons = document.querySelectorAll('.js-arrow');

let isDragStart = false, prevPageX, prevScrollLeft;
//let firstImgWidth = firstImg.clientWidth + 25;
/*
arrowIcons.forEach( icon =>{
  icon.addEventListener('click', ()=>{
    carousel.scrollLeft
  });
});
*/
const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if(!isDragStart) return;
  e.preventDefault();
  let positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
};

const dragStop = () => {
  isDragStart = false;
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);

carousel.addEventListener('touchstart', dragStart);
carousel.addEventListener('touchmove', dragging);
carousel.addEventListener('touchend', dragStop);