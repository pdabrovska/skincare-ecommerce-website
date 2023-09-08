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
}, 5000);