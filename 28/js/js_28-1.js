var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
let input1 = document.querySelector('#email-input');
let list = document.querySelector('#email-sug-wrapper');
// input.addEventListener('input',function(){
//   console.log('event handle');
// },false);
input1.focus();
input1.oninput = function(e) {
  list.innerHTML = '';
  addul();
  getHide();
  if (!(e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13)) {
    getReturn();
  }
}

function getValue() {
  let trim = input1.value.trim();  
  return trim;
}

// 产生新数组
function newArry() {
  let trim = getValue();
  let i = trim.indexOf('@');
  let afterNewtrim;
  let trimarry = [];
  if (i !== -1) {
    afterNewtrim = trim.slice(i + 1);
    for (let i = 0; i < postfixList.length; i++) {
      if (postfixList[i].indexOf(afterNewtrim) !== -1) {
        trimarry.push(postfixList[i]);
      }
    }
    if (trimarry == '') {
      result = postfixList;
    } else {
      result = trimarry;
    }
    return result;
  }
}

function getPrompt() {
  let trim = htmlEncode(getValue());
  let i = trim.indexOf('@');
  let beforeNewtrim;
  let trimarry = [];
  if (i !== -1) {
    beforeNewtrim = trim.slice(0, i);
    afterNewtrim = trim.slice(i + 1);
    for (let i = 0; i < newArry().length; i++) {
      result = beforeNewtrim + '@' + newArry()[i];  
      
      trimarry.push(result); 
    } 
  } else {
    beforeNewtrim = trim;
    for (let i = 0; i < postfixList.length; i++) {
      result = beforeNewtrim + '@' + postfixList[i];  
      trimarry.push(result); 
    }
  }
  return trimarry;
}

function addul() {
  let trimarry = getPrompt();
  for (let i = 0; i < trimarry.length; i++) {
    let li1 = document.createElement('li');
    li1.innerHTML = trimarry[i];
    list.appendChild(li1); 
  }
  let li2 = document.querySelectorAll("li");
  li2[0].setAttribute("class", "active"); 
}

list.onclick = function (e) {
  var e =e||window.event;
   var target=e.target||e.srcElement;
  if (target.nodeName.toLowerCase() == "li") {  
    input1.value = htmlDecode(target.innerHTML);
    hide();
  }
  input1.focus();
}

function getReturn() {
  let j;
  let li1 = document.querySelectorAll('li');
  for (let i = 0; i < li1.length; i++) {
    if (li1[i].className.indexOf("active") !== -1) {
      j = i;
    }
  }
  if (j !== 0) {
    li1[j].classList.remove("active");
    li1[0].classList.add("active");
  }
}

// // 监听特殊3个键的键盘事件，这个事件可能就是inputDom的输入监听，也有可能是另外一个，请自己测试后判断
document.onkeydown = function(e) {
  let j;
  let li1 = document.querySelectorAll('li');
  let m = li1.length;
  for (let i = 0; i < li1.length; i++) {
    if (li1[i].className.indexOf("active") !== -1) {
      j = i;   
    }
  }
  
  var e = e || window.event;
  var key = e.which || e.keyCode;
  if (key == 38) {
    for (i = 0; i < li1.length; i++) {
      li1[i].classList.remove("active");
     }
      if (j !== 0) {
        li1[j-1].classList.add("active");
      } else {
        li1[m-1].classList.add("active");
      } 
  }
  if (key == 40) {
    for (i = 0; i < li1.length; i++) {
      li1[i].classList.remove("active");
     }
    if (j !== m - 1) {
      li1[j+1].classList.add("active");
      } else {
        li1[0].classList.add("active");
      }
  }

  if (key == 13) {
    // input.value = htmlDecode(li.innerHTML);
    var x = document.querySelectorAll(".active");
    input1.value = htmlDecode(x[0].innerHTML);
    hide();
  }
  if (key == 27) {
    input1.setSelectionRange(0, -1); //ESC全选上文本框内容
    hide();
   }
}

function getHide() {
  if (getValue() === '') {
    hide();
  } else {
    get();
  }
}

function hide() {
  list.style.display = 'none';
}

function get() {
  list.style.display = 'block';
}

/*1.用浏览器内部转换器实现html转码*/
function htmlEncode(html){
  //1.首先动态创建一个容器标签元素，如DIV
  var temp = document.createElement ("div");
  //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
  (temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
  //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
  var output = temp.innerHTML;
  temp = null;
  return output;
 }

 /*2.用浏览器内部转换器实现html解码*/
 function htmlDecode(text){
  //1.首先动态创建一个容器标签元素，如DIV
  var temp = document.createElement("div");
  //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
  temp.innerHTML = text;
  //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
 }