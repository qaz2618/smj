let regionSelAll = document.getElementsByName('regionall');
let productSelAll = document.getElementsByName('productall');
let region = document.getElementsByName('region');
let product = document.getElementsByName('product');
let gettable = document.querySelector('#table-wrapper');
initLocalStorage();

for (let i = 0; i < region.length; i++) {
  region[i].onchange = function () {
    getNewTable(getNum());
    getHash();
  }
}
regionSelAll[0].onchange = function () {  
  getNewTable(getNum());
  getHash();
}
for (let i = 0; i < product.length; i++) {
  product[i].onchange = function () {
    getNewTable(getNum());
    getHash();
  }
}
productSelAll[0].onchange = function () {
  getNewTable(getNum());
  getHash();
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
let newSourceData = getLocalStorage();
function getNum() {
  let regionText = getNumBefore(region);
  let productText = getNumBefore(product);
  let arr = new Array();
  for (let i = 0; i < newSourceData.length; i++) {
    for (let j = 0; j < regionText.length; j++) {
      for (let z = 0; z < productText.length; z++) {
        if (newSourceData[i].region == regionText[j] && newSourceData[i].product == productText[z]) {
          arr.push(newSourceData[i]);
        }
      }
    }
  }
  // console.log(arr);
  return arr;
}
function qc(arr){
  var result=[];
  for (var i = 0; i < arr.length; i++) {
     if(result.indexOf(arr[i])==-1){
      result.push(arr[i]);
     }
  }
  return result;
}

function getHash() {
  let arr7 = getNum();
  let hash;
  let product1 = [], region1 = [];
  for (let i = 0; i < arr7.length; i++) {  
    product1.push(arr7[i]['product']);
  }
  for (let i = 0; i < arr7.length; i++) {
    region1.push(arr7[i]['region']);
  }
  product1 = qc(product1);
  region1 = qc(region1);
  product1 = product1.join("+");
  region1 = region1.join("+");
  if (product1 == '' || region1 == '') {
    hash = '';
  }else {
    hash = product1 + '&' + region1;
  }
  window.location.hash = hash;
}
getNewTable(getNum());
window.addEventListener("hashchange", function () {
  render();
  getNewTable(getNum());
}, false);

