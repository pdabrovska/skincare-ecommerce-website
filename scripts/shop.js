import { navbar, generateProducts } from "./utils/general.js";
import { products } from "../data/products.js";

navbar();

generateProducts(products, 'every');

//filter
const filterBtn = document.querySelectorAll('.js-filter-btn');
const resetBtn = document.querySelector('.js-reset-btn');
//let checkedFilter = document.querySelector('input[name="filter-button"]:checked').value;

filterBtn.forEach(button =>{
  button.addEventListener('click', ()=>{
    const checkedFilter = button.value;
    generateProducts(products, checkedFilter);
  });
});

resetBtn.addEventListener('click', ()=>{
  generateProducts(products, 'every');
  document.querySelector('input[name="filter-button"][id="all"]').checked = true;
});