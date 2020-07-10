// function 绘制一个柱状图(柱状图数据) {
//   定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
//   定义好每一个柱子的宽度及柱子的间隔宽度
//   定义好柱子颜色，轴的颜色

//   拿到柱状图中的最大值Max
//   根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例

//   绘制横轴及纵轴
//   遍历数据 {
//       计算将要绘制柱子的高度和位置
//       绘制每一个柱子
//   }    
// }

const SVGNS = "http://www.w3.org/2000/svg";

drawHistogram = {
  wrapperId: "",
  drawHeight: 400,
  drawWidth: 800,
  xAxis: 0,
  yAxis: 0,
  barWidth: 0,
  barSpace: 0,
  barColor: "#37A2DA",
  axisColor: "#000",
  strokeWidth: 2,
  pxDataRatio: 0,
  histogram: null,
  data: [],
  init: function () {
      this.xAxis = this.drawWidth - 20;
      this.yAxis = this.drawHeight - 20;
      this.histogram = document.createElementNS(SVGNS, "svg");
      this.histogram.setAttribute("version", "1.1");
      this.histogram.setAttribute("baseProfile", "full");
      this.histogram.setAttribute("width", this.drawWidth);
      this.histogram.setAttribute("height", this.drawHeight);
      this.histogram.setAttribute("xmlns", SVGNS);
      let line = document.createElementNS(SVGNS, "line");
      line.setAttribute("x1", 10);
      line.setAttribute("y1", this.drawHeight - 10);
      line.setAttribute("x2", 10 + this.xAxis);
      line.setAttribute("y2", this.drawHeight - 10);
      line.setAttribute("stroke", this.axisColor);
      line.setAttribute("stroke-width", this.strokeWidth);
      this.histogram.appendChild(line);
      line = document.createElementNS(SVGNS, "line");
      line.setAttribute("x1", 10);
      line.setAttribute("x1", 10);
      line.setAttribute("x2", 10);
      line.setAttribute("y1", this.drawHeight - 10);
      line.setAttribute("y2", 10);
      line.setAttribute("stroke", this.axisColor);
      line.setAttribute("fill", "transparent");
      line.setAttribute("stroke-width", this.strokeWidth);
      this.histogram.appendChild(line);
  },
  drawSingle: function () {
      this.barWidth = parseInt(this.xAxis / this.data.length * 0.8);
      this.barSpace = parseInt(this.xAxis / this.data.length * 0.2);
      let max = Math.max(...this.data);
      let flag = this.data.every(function (item) {
              return !isNaN(item);
          }) 
              if (flag) {
                  this.pxDataRatio = this.yAxis / max;
                  let xpos = 10 + this.barSpace / 2;
                  for (let i = 0; i < this.data.length; i++) {
                      let ypos = 10 + this.yAxis - this.data[i] * this.pxDataRatio;
                      let rect = document.createElementNS(SVGNS, "rect");
                      rect.setAttribute('width', this.barWidth);
                      rect.setAttribute('height', this.data[i] * this.pxDataRatio);
                      rect.setAttribute('x', xpos);
                      rect.setAttribute('y', ypos);
                      xpos = xpos + this.barWidth + this.barSpace;
                      rect.setAttribute("stroke", this.barColor);
                      rect.setAttribute("fill", this.barColor);
                      rect.setAttribute("stroke-width", this.strokeWidth);
                      this.histogram.appendChild(rect);
                  }
              }
          },
          setSingle: function (data) {
              this.data = data;
              this.init();
              this.drawSingle();
              document.querySelector(this.wrapperId).appendChild(this.histogram);
          }

  }