import { navbar, updateCartAmount, generateProducts } from "./utils/general.js";
import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

navbar();
updateCartAmount(cart);
generateProducts(products, 'js-products-container-body', 'body', 0, 120000, cart);
generateProducts(products, 'js-products-container-serums', 'serums', 0, 120000, cart);