import { navbar, generateProducts } from "./utils/general.js";
import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

navbar();
openCloseFilters();

function whichSection(){
  let section = document.querySelector('input[type=radio]:checked').value;
  return section
};

function openCloseFilters(){
  const filterMenu = document.querySelector('.js-open-close-filters');
  const filters = document.querySelectorAll('.input-container');
  const priceRange = document.querySelector('.price-range-container');
  const resetBtn = document.querySelector('.js-reset-btn');

  filterMenu.onclick = () => {
    filters.forEach(filter =>{
      filter.classList.toggle('close-filters');
    });
    priceRange.classList.toggle('close-filters');
    resetBtn.classList.toggle('close-filters');

    if(priceRange.classList.contains('close-filters')){
      document.getElementById('filters-icon').src = 'images/x-close.png';
    } else{
      document.getElementById('filters-icon').src = 'images/filters-open.png';
    }
  };
}

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
  generateProducts(products, section, minVal.value, maxVal.value, cart);
};

function slideMax(){
  let gap = parseInt(maxVal.value) - parseInt(minVal.value);
  if(gap <= minGap){
    maxVal.value = parseInt(minVal.value) + minGap;
  }

  maxTooltip.innerHTML = `$${maxVal.value}`;
  setArea()
  let section = whichSection();
  generateProducts(products, section, minVal.value, maxVal.value, cart);
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
    generateProducts(products, checkedFilter , minVal.value, maxVal.value, cart);
  });
});

//reset button
resetBtn.addEventListener('click', ()=>{
  document.querySelector('input[name="filter-button"][id="all"]').checked = true;
  minVal.value = 0;
  maxVal.value = 120;
  slideMin();
  slideMax();
  generateProducts(products, 'every', minVal.value, maxVal.value, cart);
});