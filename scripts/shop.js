import { navbar, generateProducts } from "./utils/general.js";
import { products } from "../data/products.js";

navbar();

function whichSection(){
  let section = document.querySelector('input[type=radio]:checked').value;
  return section
};

console.log(whichSection());

//price range
const minVal = document.querySelector('.min-val');
const maxVal = document.querySelector('.max-val');

const minTooltip = document.querySelector('.min-tooltip');
const maxTooltip = document.querySelector('.max-tooltip');

const minGap = 0;
const range = document.querySelector('.slider-track');
const sliderMinValue = parseInt(minVal.min);
const sliderMaxValue = parseInt(maxVal.max);

window.onload = function(){
  slideMin();
  slideMax();
};

function slideMin(){
  let gap = parseInt(maxVal.value) - parseInt(minVal.value);
  if(gap <= minGap){
    minVal.value = parseInt(maxVal.value) - minGap;
  }

  minTooltip.innerHTML = `$${minVal.value}`;
  setArea()
  let section = whichSection();
  generateProducts(products, section, minVal.value, maxVal.value);
};

function slideMax(){
  let gap = parseInt(maxVal.value) - parseInt(minVal.value);
  if(gap <= minGap){
    maxVal.value = parseInt(minVal.value) + minGap;
  }

  maxTooltip.innerHTML = `$${maxVal.value}`;
  setArea()
  let section = whichSection();
  generateProducts(products, section, minVal.value, maxVal.value);
};

document.querySelector('.min-val').addEventListener('input', ()=>{
  slideMin();
});

document.querySelector('.max-val').addEventListener('input', ()=>{
  slideMax();
});

function setArea(){
  range.style.left = (minVal.value / sliderMaxValue) * 100 + '%';
  minTooltip.style.left =(minVal.value / sliderMaxValue) * 100 + '%';
  range.style.right = 100- (maxVal.value / sliderMaxValue) * 100 + '%';
  maxTooltip.style.right = 100- (maxVal.value / sliderMaxValue) * 100 + '%';
}

//filter
const filterBtn = document.querySelectorAll('.js-filter-btn');
const resetBtn = document.querySelector('.js-reset-btn');
//let checkedFilter = document.querySelector('input[name="filter-button"]:checked').value;

filterBtn.forEach(button =>{
  button.addEventListener('click', ()=>{
    const checkedFilter = button.value;
    generateProducts(products, checkedFilter , minVal.value, maxVal.value);
  });
});

//reset button
resetBtn.addEventListener('click', ()=>{
  document.querySelector('input[name="filter-button"][id="all"]').checked = true;
  minVal.value = 0;
  maxVal.value = 120;
  slideMin();
  slideMax();
  generateProducts(products, 'every', minVal.value, maxVal.value);
});