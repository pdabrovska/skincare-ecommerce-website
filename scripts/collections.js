import { navbar, updateCartAmount, generateProducts } from "./utils/general.js";
import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

navbar();
updateCartAmount(cart);
generateProducts(products, 'body', 0, 120000, cart)