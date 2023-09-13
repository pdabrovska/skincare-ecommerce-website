import { navbar, generateProducts } from "./utils/general.js";
import { products } from "../data/products.js";

navbar();

generateProducts(products, 'every');

document.querySelector('.js-body-products').addEventListener('click', ()=>{
  console.log(1);
});