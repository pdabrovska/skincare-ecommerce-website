import { navbar, generateProducts } from "./utils/general.js";
import { products } from "../data/products.js";

navbar();

generateProducts(products, 'every');