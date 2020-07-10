function getNewTable() {
  arr=getNum();
  gettable.removeChild(gettable.childNodes[0]);
  table = document.createElement("table");

  regionText = getNumBefore(region);
  productText = getNumBefore(product);
  if (productText.length == 1 && regionText.length >= 1) {
    table1();
  }
  if (regionText.length == 1 && productText.length > 1) {
    table2();
  }
  if (regionText.length > 1 && productText.length > 1) {
    table3();
  }
  gettable.appendChild(table);
}

function table1() {
  let headTable = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  let header = table.createTHead();
  let tr0=header.insertRow(0);
  for (let i = 0; i < headTable.length; i++) {
        let th = tr0.insertCell(tr0.cells.length);
        th.innerHTML = headTable[i];
      }
  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      let tr = table.insertRow(table.rows.length);
      let td = tr.insertCell(0);
        td.innerHTML = arr[i].product;
        td.rowSpan = arr.length;
        td = tr.insertCell(1);
        td.innerHTML = arr[i].region;

        for (let j = 0; j < 12; j++) {
          let td = tr.insertCell(j + 2);
            td.innerHTML = arr[i].sale[j];
        }
    } else {
      let tr = table.insertRow(table.rows.length);
      let td = tr.insertCell(0);//合并单元格后，后面行少一个单元格
        td.innerHTML = arr[i].region;

        for (let j = 0; j < 12; j++) {
          let td = tr.insertCell(j + 1);
            td.innerHTML = arr[i].sale[j];
        }
    }
  }
  return table;
}

function table2() {
  let headTable = ["地区", "商品", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  let header = table.createTHead();
  let tr0=header.insertRow(0);
  for (let i = 0; i < headTable.length; i++) {
    let th = tr0.insertCell(tr0.cells.length);
    th.innerHTML = headTable[i];
  }
  for (let i = 0; i < arr.length; i++) {

    if (i == 0) {
      let tr = table.insertRow(table.rows.length);
      let td = tr.insertCell(0);
      td.innerHTML = arr[i].region;
      td.rowSpan = arr.length;
      td = tr.insertCell(1);
      td.innerHTML = arr[i].product;

      for (let j = 0; j < 12; j++) {
        let td = tr.insertCell(j + 2);
        td.innerHTML = arr[i].sale[j];
      }
    } else {
      let tr = table.insertRow(table.rows.length);
      let td = tr.insertCell(0);//合并单元格后，后面行少一个单元格
      td.innerHTML = arr[i].product;

      for (let j = 0; j < 12; j++) {
        let td = tr.insertCell(j + 1);
        td.innerHTML = arr[i].sale[j];
      }
    }
  }
  return table;
}

function table3() {
  let headTable = ["商品", "地区", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  let header = table.createTHead();
  let tr0=header.insertRow(0);
  for (let i = 0; i < headTable.length; i++) {
    let th = tr0.insertCell(tr0.cells.length);
    th.innerHTML = headTable[i];
  }
  for (let i = 0; i < productText.length; i++) {
    for (let z = 0; z < regionText.length; z++) {
      if (z == 0) {
        let tr = table.insertRow(table.rows.length);
        let td = tr.insertCell(0);
        td.innerHTML = arr[z + i * regionText.length].product;
        td.rowSpan = regionText.length;
        td = tr.insertCell(1);
        td.innerHTML = arr[z + i * regionText.length].region;

        for (let j = 0; j < 12; j++) {
          let td = tr.insertCell(j + 2);
            td.innerHTML = arr[z + i * regionText.length].sale[j];
        }
      } else {
          let tr = table.insertRow(table.rows.length);
          let td = tr.insertCell(0);//合并单元格后，后面行少一个单元格
          td.innerHTML = arr[z + i * regionText.length].region;

          for (let j = 0; j < 12; j++) {
            let td = tr.insertCell(j + 1);
              td.innerHTML = arr[z + i * regionText.length].sale[j];
          }
        }
    }
  }
  return table;
}
