var diseaseData = new Array();
var pillsData = new Array();
var colors = ["#3366CC","#DC3912","#FF9900","#000000"];

//reading files
d3.csv("../csv/3.csv", function(data) {
  diseaseData = data.map((dataObj,i)=>{
    var entry = new Object();
    entry.label = dataObj.disease;
    entry.report = dataObj.report;
    entry.data = dataObj.count;
    entry.color = colors[i];
    return entry;
  });
  d3.csv("../csv/4.csv", function(data) {
    pillsData = data.map((dataObj,i)=>{
      var entry = new Object();
      entry.label = dataObj.tab;
      entry.data = dataObj.tab_sold;
      entry.color = colors[i];
      return entry;
    });
    drawGraph(diseaseData,pillsData);
  });
});

//drawig graph
function drawGraph(diseaseData,pillsData){
var svg = d3.select("body").append("svg").attr("width",800).attr("height",600);

svg.append("g").attr("id","diseaseData");
svg.append("g").attr("id","pillsData");

Donut3D.draw("diseaseData", positiveData(), 200, 150, 130, 100, 30, 0.4);
Donut3D.draw("pillsData", salesData(), 500, 400, 130, 100, 20, 0);

function positiveData(){
	return diseaseData.map(function(d,i){
		var temp = 100+50*(i);
		svg.append("rect").attr("x", 450).attr("y",temp).attr("width",20).attr("height",20).attr("fill",diseaseData[i].color);
		svg.append("text").attr("x", 480).attr("y",temp+15).attr("width",20).attr("height",20).text(diseaseData[i].label);
		return {label:d.label, value:(d.data*100)/6, color:d.color};});
}

function salesData(){
	return pillsData.map(function(d,i){
		var temp = 350+50*(i);
		svg.append("rect").attr("x", 100).attr("y",temp).attr("width",20).attr("height",20).attr("fill",pillsData[i].color);
		svg.append("text").attr("x", 130).attr("y",temp+15).attr("width",20).attr("height",20).text(pillsData[i].label);
		return {label:d.label, value:(d.data*100)/63397, color:d.color};});
}
}
