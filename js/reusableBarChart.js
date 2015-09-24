d3.models = {};

//var rlegend = d3.edge.legend().fontSize(15)
//svg.datum(yearMean).call(rlegend)

// d3.models.createSvg = function () {
//     function exports (_selection) {
//         console.log(_selection)
//         _selection.each(function(_data)  { 
//          var selection = d3.select(_data).append("svg")
//         .attr("width", width_stackedbar + margin.left + margin.right)
//         .attr("height", height_stackedbar + margin.top + margin.bottom)
//         .append('g').attr("transform","translate(" + 40 + "," + margin.top + ")") 
//       //  .append('g').attr("transform","translate(" + margin.left + "," + margin.top + ")") 

//           selection.append('rect')
//             .attr("width",width_stackedbar)
//             .attr("height", height_stackedbar)
//             .attr("y", 0)
//             .attr("x",0)
//             .style("stroke","black")
//             .style("stroke-width",1)
//             .style("fill","none")
//           return selection
//         });//_selection  
//     }//exports
//     return exports;
// };//module

d3.models.barChart = function () {

    var w;
	//var w = 500;
    var h = 500;
	var margin = {top: 20, right: 30, bottom: 20, left: 30},
        barWidth = 40;
        barOffset = 5;

    function exports(_selection) {
        _selection.each(function(_data) {

            var width = w - margin.left - margin.right
            var height = h - margin.top - margin.bottom
            // Trick to just append the svg skeleton once
            var svg = d3.select(this).selectAll("svg").data([_data])

            svg.enter().append("svg")
               .attr("width", width + margin.left + margin.right)
               .attr("height", height + margin.top + margin.bottom)
               .classed("chart", true)
               .append('g').attr("transform","translate(" + margin.left + "," + margin.top + ")") 
               // .append('g').attr("transform","translate("+ centerx + ",30)")
               //  .append('text').text("Data Join using .data(data)").attr("text-anchor","middle")
               .append('rect')
                    .attr("width",width)
                    .attr("height", height )
                    .attr("y", 0)
                    .attr("x",0)
                    .style("stroke","black")
                    .style("stroke-width",1)
                    .style("fill","none")

            var bars = d3.select('svg').select('g').selectAll(".bar")
            //var bars = svg.selectAll(".bar")
            		.data(_data)
                //.data(function(d, i) { return d; /* d === _data */ });
           //UPDATE
            bars
		        .classed("update",true)
		        .transition().duration(2500) 
		        .style("fill", "green")
		        .attr("x", function(d,i) {  return i * (barWidth + barOffset)})
			      //ENTER
            bars.enter().append("rect")
               .attr("width",barWidth)
			        .attr("x",function(d,i) { return i * (barWidth+ barOffset)})
			        .attr("height", function(d) { return d})
			        .attr("y",function(d) { return height - d } )
			        .style("fill", "steelblue")
			        .attr("class","bar")
			        .classed("enter",true)

            bars.exit().transition().duration(2000).style("fill","black").attr("height",0).remove()
        });
    }
    exports.w = function(_x) {
        if (!arguments.length) return w;
        w = _x;
        return this;
    };
    exports.h = function(_x) {
        if (!arguments.length) return h;
        h = _x;
        return this;
    };
    exports.title = function(_x) {
        if(!arguments.length) return title
        title = _x;
        return this;
    }
    return exports;
};




//1. old bars not being removed
//2. bars begin created ouside of g element
//RESOLUTION:   changed code from  var bars = svg.selectAll(".bar") to
// var bars = d3.select('svg').select('g').selectAll(".bar")
//Originally tried using just d3.select('g').selectAll(".bar") but no data was being written..no errors either
//3. data positioned bottom of svg
//RESOLUTION: removed //svg.transition().attr({width: width, height: height_stackedbar});
