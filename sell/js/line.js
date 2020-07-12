function getLine(data) {
  //定义好折线图绘制区域的高度，宽度，轴的高度，宽度
  var w = 1200,
      h = 350,
      axisX = 500,
      axisY = 300,
      startX = 600,
      startY = 325;
  //定义好每一个数据点的直径，颜色，线的颜色，宽度
  var pDiameter = 3,
      lColor = "#37A2DA";
  //定义好每两个数据点之间的横向间隔距离
  var interval = 40;
  //拿到折线图中的最大值Max
  var max = 0;
  for (var i in data) {
      if (data[i] > max) {
          max = data[i];
      }
  }
  //根据Max和你用来绘制折线图图像区域的高度， 进行一个数据和像素的折算比例
  let bl = axisY/max;
  let arry4 = [];
  for (let i in data) {
    arry4[i] = data[i] * bl;
  }
  //绘制横轴及纵轴
  var svgStart = '<svg width=' + w + ' height=' + h + ' version="1.1" xmlns="http://www.w3.org/2000/svg">';
  var svgEnd = '</svg>';
    // 绘制横轴及纵轴
  var row = "<line x1=" + startX + " y1=" + startY + " x2=" + (startX + axisX) + " y2=" + startY + ' style="stroke:rgb(0,99,99);stroke-width:1"/>';
  var col = "<line x1=" + startX + " y1=" + startY + " x2=" + startX + " y2=" + (startY - axisY) + ' style="stroke:rgb(0,99,99);stroke-width:1"/>';
  var svgT = svgStart + row + col;
  //遍历数据，计算将要绘制数据点的坐标，绘制数据点
  for (let i = 0; i < arry4.length; i++) {
    let rectStartX = startX + interval * (i + 1) + pDiameter;
    let rectStartY = startY - arry4[i];
    var circle = "<circle cx=" + rectStartX + " cy=" + rectStartY + " r=" + pDiameter + '  style="fill="#000000""/>';
    svgT += circle;
  }
  for (let i = 0; i < arry4.length; i++) {
 
    let rectStartX = startX + interval * (i + 1) + pDiameter;
    let rectStartY = startY - arry4[i];
    let rectEndX = rectStartX + interval;
    let rectEndY = startY - arry4[i + 1];
    if (i == arry4.length - 1) {
      break;
    }
    var line = "<line x1=" + rectStartX + " y1=" + rectStartY + " x2=" + rectEndX + " y2=" + rectEndY + " stroke:" +' style="stroke:' + lColor + ';stroke-width:2"/>';
    svgT += line;
  }
  svgT += svgEnd;
  return svgT;
}

function getLineAll(data) {
  
  //定义好折线图绘制区域的高度，宽度，轴的高度，宽度
  var w = 1200,
      h = 350,
      axisX = 500,
      axisY = 300,
      startX = 600,
      startY = 325;
  //定义好每一个数据点的直径，颜色，线的颜色，宽度
  var pDiameter = 3,
  //定义好每两个数据点之间的横向间隔距离
  interval = 40;
  var max = 0;
  for (let i in data) {
    for (let j in data[i]) {
      if (data[i][j] > max) {
        max = data[i][j];
      }
    }
  }

  let bl = axisY/max;
  let arry4 = [];
  let arry5 = [];
  for (let i in data) {
    for (let j in data[i]) {
      arry4.push(data[i][j]);
    }
    arry5.push(arry4);
    arry4 = [];
  }
  for (let i in arry5) {
    for (let j in arry5[i]) {
      arry5[i][j] = arry5[i][j] * bl;
    }
  }

  //绘制横轴及纵轴
  var svgStart = '<svg width=' + w + ' height=' + h + ' version="1.1" xmlns="http://www.w3.org/2000/svg">';
  var svgEnd = '</svg>';
    // 绘制横轴及纵轴
  var row = "<line x1=" + startX + " y1=" + startY + " x2=" + (startX + axisX) + " y2=" + startY + ' style="stroke:rgb(0,99,99);stroke-width:1"/>';
  var col = "<line x1=" + startX + " y1=" + startY + " x2=" + startX + " y2=" + (startY - axisY) + ' style="stroke:rgb(0,99,99);stroke-width:1"/>';
  var svgT = svgStart + row + col;
  let color = ["#37A7DA","#FF1493","#4B0082","#E6E6FA","#B0E0E6","#00FFFF","#00CED1","#556B2F","#6B8E23"];
  for (let i = 0; i < arry5.length; i++) {
    for (let z = 0; z < color.length; z++) {
      for (let j = 0; j < arry5[i].length; j++) {
        let rectStartX = startX + interval * (j + 1) + pDiameter;
        let rectStartY = startY - arry5[i][j];
        var circle = "<circle cx=" + rectStartX + " cy=" + rectStartY + " r=" + pDiameter + '  style="fill="#000000""/>';
        svgT += circle;
      }
      for (let j = 0; j < arry5[i].length; j++) {
        let rectStartX = startX + interval * (j + 1) + pDiameter;
        let rectStartY = startY - arry5[i][j];
        let rectEndX = rectStartX + interval;
        let rectEndY = startY - arry5[i][j + 1];
        if (j == arry5[i].length - 1) {
          break;
        }
        var line = "<line x1=" + rectStartX + " y1=" + rectStartY + " x2=" + rectEndX + " y2=" + rectEndY + " stroke:" +' style="stroke:' + color[i] + ';stroke-width:1"/>';
        svgT += line;
      }
    }
    
  }
  svgT += svgEnd;
  return svgT;
}