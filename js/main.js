d3.csv("../csv/1.csv", function(data) {
  console.log(data);
});

var diseaseData=[
	{label:"Cold", color:"#3366CC",data:3},
	{label:"Fever", color:"#DC3912",data:2},
	{label:"Headache", color:"#FF9900",data:1}
];

var pillsData=[
	{label:"Anacin", color:"#3366CC",data:1000},
	{label:"CPM", color:"#DC3912",data:60910},
	{label:"Dolo", color:"#FF9900",data:1408},
	{label:"Vicks", color:"#000000",data:79},
];

var svg = d3.select("body").append("svg").attr("width",1000).attr("height",600);

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
