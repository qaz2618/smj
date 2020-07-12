function render() {
  let regionState = [];
let productState = [];
let hash1 = decodeURIComponent(window.location.hash).slice(1).split("&");
productState = hash1[0];
regionState = hash1[1];
regionState = regionState.split("+");
// if (productState !== '' && productState !== undefined) {
  productState = productState.split("+");
// }

  let regionCheckboxs = document.getElementsByName('region');
  let productCheckboxs = document.getElementsByName('product');
  let regionAllCheckbox = document.getElementsByName('regionall');
  let productAllCheckbox = document.getElementsByName('productall');
  let i;
    if (regionState.length === 0 || productState.length === 0) {
      return ;
    }
    if (regionState.length === 3) {
      regionAllCheckbox[0].checked = true;
  }
  if (productState.length === 3) {
      productAllCheckbox[0].checked = true;
  }
  for (i = 0; i < regionState.length; i++) {
    if (regionState[i] === "华东") {
        regionCheckboxs[0].checked = true;
 }
    if (regionState[i] === "华南") {
        regionCheckboxs[1].checked = true;
    }
    if (regionState[i] === "华北") {
        regionCheckboxs[2].checked = true;
    }
}
for (i = 0; i < productState.length; i++) {
    if (productState[i] === "手机") {
        productCheckboxs[0].checked = true;
    }
    if (productState[i] === "笔记本") {
        productCheckboxs[1].checked = true;
    }
    if (productState[i] === "智能音箱") {
        productCheckboxs[2].checked = true;
    }
}
  }
  render();
  