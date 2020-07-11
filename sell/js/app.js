let regionSelAll = document.getElementsByName('regionall');
let productSelAll = document.getElementsByName('productall');
let region = document.getElementsByName('region');
let product = document.getElementsByName('product');
let gettable = document.querySelector('#table-wrapper');
initLocalStorage();

for (let i = 0; i < region.length; i++) {
  region[i].onchange = function () {
    getNewTable();
  }
}
regionSelAll[0].onchange = function () {  
  getNewTable();
}
for (let i = 0; i < product.length; i++) {
  product[i].onchange = function () {
    getNewTable();
  }
}
productSelAll[0].onchange = function () {
  getNewTable();
}
function getNumBefore(name) {
  let  len = name.length;
  let arry = new Array();
  for (var i = 0; i < len; i++) {
    if (name[i].checked == true) {
      arry.push(name[i].value);
    }
  }
  return arry;
}

function getNum() {
  let regionText = getNumBefore(region);
  let productText = getNumBefore(product);
  let arr = new Array();
  for (let i = 0; i < sourceData.length; i++) {
    for (let j = 0; j < regionText.length; j++) {
      for (let z = 0; z < productText.length; z++) {
        if (sourceData[i].region == regionText[j] && sourceData[i].product == productText[z]) {
          arr.push(sourceData[i]);
        }
      }
    }
  }
  return arr;
}


