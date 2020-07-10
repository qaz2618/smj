let regionWrapper = document.querySelector('#region-radio-wrapper');
let productWrapper = document.querySelector('#product-radio-wrapper');
function checkBoxGroup(checkBoxName) {
  let input1 = checkBoxName.getElementsByTagName('input');
  let len = input1.length;
  checkBoxName.onclick = function (event) {
    let count = 0;
    event = event || window.event;
    target = event.target || event.srcElement;
    let checkBoxType = target.getAttribute("checkbox-type");
    
    if (checkBoxType == 'all') {
      if (target.checked == true) {
        for (var i = 1; i < len; i++) {
          input1[i].checked = true;
        }
      } else {
        target.checked = true;
      }
    }
    if (checkBoxType == 'single') {
      for (var i = 1; i < len; i++) {
        if (input1[i].checked == true) {
            count++;
        }
    }
    
    if (count == 3 && input1[0].checked == false) {
      input1[0].checked = true;
    }
    else if (count < 3 && count > 0) {
      input1[0].checked = false;
    }
    else if (count == 0) {
        target.checked = true;
    }
    }
  }
}
checkBoxGroup(regionWrapper);
checkBoxGroup(productWrapper);
