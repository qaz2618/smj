gettable = document.querySelector('#table-wrapper');
//编辑td单元格
function editTd(target) {
  let numValue = target.innerText;
  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  target.style.fontSize = 0;
  target.appendChild(input);
  input.focus();
  document.querySelector('table input').value = +numValue;
  for (let i = 0; i < 2; i++) {
      const button = document.createElement('button');
      if (i === 0) {
          button.setAttribute('class', 'cancel');
          button.textContent = '取消';
      } else {
          button.setAttribute('class', 'confirm');
          button.innerText = '确定';
      }
      target.appendChild(button);
  }
}
let preValue = 0; //设置一个变量来记录未更改前的值
//判断当target等于button时需要修改的td
function editButton(target, preValue) {
    
    if (target.className === "confirm") {
        let rtt = target.parentElement;
        let inputValue = target.parentElement.querySelector('input').value;
        let product = target.parentElement.getAttribute("data-product");
        let region = target.parentElement.getAttribute("data-region");
        let index = target.parentElement.getAttribute("data-month");
        
        if (isNaN(inputValue)) {
            alert('请输入数字');
            target.parentElement.innerText = preValue;
        } else {
          target.parentElement.innerText = inputValue;
          updateLocalStorage(product, region, +index, +inputValue);//数组的序号要减一
          rtt.setAttribute("value",inputValue);
        }
    }
  }
  
  
  function editButton1(target, preValue) {
      if (target.className === "cancel") {
        target.parentElement.innerText = preValue;
      }
    }

let flag = true; //设置一个变量来控制只有一个td会变成编辑状态




gettable.onclick = function (event) {
    if (event.target.nodeName.toLowerCase() === 'td') {
        if (flag && event.target.hasAttribute('class')) {
            preValue = event.target.innerText;
            editTd(event.target);
            flag = false;
        }
    }
    if (event.target.nodeName.toLowerCase() === 'button') {
        target.parentElement.style.fontSize = 16 +'px';
        flag = true;
          editButton(event.target, preValue);
          editButton1(event.target, preValue);
    }
}