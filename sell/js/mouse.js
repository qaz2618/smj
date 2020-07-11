let bar = document.getElementById("chart-wrapper");
let line = document.getElementById("line-wrapper");
gettable = document.querySelector('#table-wrapper');
let wrapper = document.querySelector('#wrapper');
gettable.onmouseover = function (e) {
  wrapper.style.display = "block";
  let arry = [];
  e = e || window.e;
  target = e.target || e.srcElement;
  let tr = target.parentNode;
  let td = tr.querySelectorAll('td');
  
  if ((td[0].innerHTML !== '商品') && (td[0].innerHTML !== '地区')) {
    if (td.length == 14) {
      for (let i = 2; i < td.length; i++) {
        arry.push(Number(td[i].innerHTML));
      }
    } else {
      for (let i = 1; i < td.length; i++) {
        arry.push(Number(td[i].innerHTML));
      }
    } 
    bar.innerHTML = getBar(arry);
    line.innerHTML = getLine(arry);
  }
}

gettable.onmouseout = function (e) {
  wrapper.style.display = "block";
  let td1;
  let arr1 = [];
  let arr2 = [];
  e = e || window.e;
  target = e.target || e.srcElement;
  let tr = target.parentNode;
  let end = tr.parentNode;
  let tr1 = end.querySelectorAll('tr');
  for (let i = 0; i < tr1.length; i++) {
    td1 = tr1[i].querySelectorAll('td');
    if ((td1[0].innerHTML !== '商品') && (td1[0].innerHTML !== '地区')) {
      if (td1.length == 14) {
        for (let j = 2; j < td1.length; j++) {
          arr1.push(Number(td1[j].innerHTML));
        }
      } else {
        for (let j = 1; j < td1.length; j++) {
          arr1.push(Number(td1[j].innerHTML));
        }
      }
    arr2.push(arr1);
    arr1 = [];
  }
}
    line.innerHTML = getLineAll(arr2);
}