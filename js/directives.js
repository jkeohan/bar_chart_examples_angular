

myApp.directive('barChart1', function() {
  function link (scope,el,attr) {

    var margin = {top: 20, right: 20, bottom: 20, left: 30},
    //height = 250 - margin.top - margin.bottom,
    barWidth = 40;
    barOffset = 5;
   var w = el[0].clientWidth
   //h is 0 from the start, unless height has been defined in css
   //height has been define (250) in .example class in css
   var h = el[0].clientHeight
   var centerx = w/2 - margin.left
   var barChart = d3.models.barChart().w(w).h(h)
     //var barChart = d3.models.barChart().w(500).h(400)
   var selection = d3.select(el[0])
    .data(scope.data)//using datum immediately transitions bars to green 
    .call(barChart);

    d3.select('svg').selectAll('g').append('g')
    .attr("transform","translate("+ centerx + ",30)")
    .append('text').text(scope.title).attr("text-anchor","middle")

    console.log(scope.barData)

    scope.$watch('data', function(data) {
      selection.datum(data)
      //data(scope.data) used with datum(data) works
      //data used with data produces empty chart
      //datum used with data tranistions out all bars
      //datum used with datum immediatley tranistions bars to green
        .transition()
        .ease("linear")
        .call(barChart);
    },true);
  }//link
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=', title: '='},
    controller: 'OverviewController'
    //scope: { data: '=', title: '='}  
  };
});

myApp.directive('barChart2', function() {
  function link (scope,el,attr) {
    //var height = 250 - margin.top - margin.bottom;

    var elWidth = el[0].clientWidth;
    var margin = {top: 20, right: 20, bottom: 20, left: 30},
    width = elWidth - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom,
    barWidth = 40,
    barOffset = 5,
    centerx = width/2;

    //createSvg is function defined outside this directive at the end this js file
    //var basicBar = createSvg(el[0],"svg2",w,250)
    var basicBar = d3.select(el[0]).append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append('g').attr("transform","translate(" + margin.left + "," + margin.top + ")") 
    
    basicBar.append('g').attr("transform","translate("+ centerx + ",30)")
    .append('text').text(scope.t).attr("text-anchor","middle")

    var rect2 = basicBar.selectAll('.rect');

    //code below placed in controller to monitor window size
    //angular.element($window).on('resize', function(){ $scope.$apply() })
    scope.$watch(function() {
      w=el[0].clientWidth - margin.left - margin.right; 
      h=el[0].clientHeight - margin.top - margin.bottom;
      return w * h;
    }, resize );

    function resize() {
      //console.log(w)
      d3.select(".svg2")
        .attr({width: (w + margin.left + margin.right), 
              height: (h + margin.top + margin.bottom) 
              });
      basicBar.attr({width: w, height, h });
      update();
    }

    scope.$watch('data', update)
    var count = 0

    function update() {
      //$watch kicks off the update function 2x and causes the 
      console.log(scope.data)
      console.log(d3.selectAll('.rect'))

      count++
      if (JSON.stringify(scope.data) != JSON.stringify(d3.selectAll('.rect').data())) { 

     // if(!data){ return; }
      var rect2 = basicBar.selectAll('.rect').data(scope.data, function(d) { return d })
     //rect2 = rect2.data(scope.data, function(d) { return d })
      //UPDATE
      rect2
        .classed("update",true)
        .transition().duration(2500) 
        .style("fill", "green")
        //.attr("x", function(d,i) { return i * (barWidth + barOffset)})
      //ENTER
      rect2.enter().append('rect')
        .attr("width",barWidth)
        //.attr("x",function(d,i) { return i * (barWidth+ barOffset)})
        .attr("height", function(d) { return d})
        .attr("y",function(d) { return height - d } )
        .style("fill", "steelblue")
        .attr("class","rect")
        .classed("enter",true)
        .classed("rect2",true)
        //.append("text").text(function(d) { return d})

      rect2.transition().duration(2500).attr("x", function(d,i) { return i * (barWidth + barOffset)})
      //EXIT
      rect2.exit().transition().duration(2000).style("fill","black").attr("height",0).remove()

      var da = d3.select("bar-chart2").selectAll("rect").data()
      // var rectMax = d3.max(da, function(d) {return d });
      //console.log(da)
      }
    };
  }//link
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=', t: '='},
    controller: 'OverviewController'
    //scope: { data: '=', title: '='}  
  };
});

//Uses Link: template to replace directive name with <svg>
//This required that var basicBar be changed to d3.select(el[0])
myApp.directive('barChart3', function() {
  function link (scope,el,attr) {

    var margin = {top: 20, right: 20, bottom: 20, left: 30},
   // width = w - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom,
      barWidth = 40;
      barOffset = 5;
    var yScale = d3.scale.linear().range([height, 50]);
    var w = el[0].clientWidth

    var basicBar = d3.select(el[0])
    var g = basicBar.append('g').attr("transform","translate(" + [margin.left, margin.top] + ")")
    basicBar.append('g').attr("transform","translate("+ w/2 + ",30)")
    .append('text').text(scope.title).attr("text-anchor","middle")

    scope.$watch('data', update)

    function update() {

      yScale.domain([0,d3.max(scope.data, function(d) { return d })])
      //DATA JOIN
      var rect3 = g.selectAll('.rect').data(scope.data, function(d) { return d })
      //UPDATE
      rect3
        .classed("update",true)
        .transition().duration(2500) 
        .style("fill", "green")
        .attr("x", function(d,i) {  return i * (barWidth + barOffset)})
        .attr("height", function(d) { return height - yScale(d)})
        .attr("y",function(d) { return yScale(d) } )
      //ENTER
      rect3.enter().append('rect')
        .attr({
          width:barWidth, 
          height: function(d) { return height - yScale(d)},
          x: function(d,i) { return i * (barWidth+ barOffset)},
          y: function(d) { return yScale(d) },
          class: "rect"
        })
        .style("fill", "steelblue")
        .classed("enter",true)
      //EXIT
      rect3.exit().transition().duration(2000).style("fill","black").attr("height",0).remove()
        };
  }//link
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=', title: '='},
    controller: 'OverviewController',
    replace: true,
    template: '<svg class="barChart3"></svg>',
    //scope: { data: '=', title: '='}  
  };
});

myApp.directive('barChart4', function() {
  function link (scope,el,attr) {

    var margin = {top: 20, right: 20, bottom: 20, left: 30},
      height = 250 - margin.top - margin.bottom,
      barWidth = 40;
      barOffset = 5;
    var w = el[0].clientWidth

    var yScale = d3.scale.linear().range([height, 50]);
    //var basicBar = createSvg(el[0])
    var basicBar = d3.select(el[0])//.attr("height",210)
    var g = basicBar.append('g').attr("transform","translate(" + [margin.left, margin.top] + ")")
    basicBar.append('g').attr("transform","translate("+ w/2 + ",30)")
    .append('text').text(scope.title).attr("text-anchor","middle")

  scope.$watch(function() {
      w=el[0].clientWidth; 
      h=el[0].clientHeight;
      return w + h;
    }, resize );

    function resize() {
      basicBar.attr({width: w, height, h });
      //update();
    }
    basicBar.append('g').attr("transform","translate("+ w/2 + ",30)")
    .append('text').text(scope.title)
    .attr("text-anchor","middle")

    scope.$watch('data', update)

    function update() {
      yScale.domain([0,d3.max(scope.data, function(d) { return d })])
      //DATA JOIN
      var rect4 = g.selectAll('.rect').data(scope.data, function(d) { return d })
      //UPDATE
      rect4
        .classed("update",true)
        .transition().duration(2500) 
        .style("fill", "green")
        .attr("x", function(d,i) {  return i * (barWidth + barOffset)})
        .attr("height", function(d) { return height - yScale(d)})
        .attr("y",function(d) { return yScale(d) } )
      //ENTER
      rect4.enter().append('rect')
        .attr({
          width:barWidth, 
          height: function(d) { return height - yScale(d)},
          x: function(d,i) { return i * (barWidth+ barOffset)},
          y: function(d) { return yScale(d) },
          class: "rect"
        })
        .style("fill", "steelblue")
        .classed("enter",true)
      //EXIT
      rect4.exit().transition().duration(2000).style("fill","black").attr("height",0).remove()
        };
  }//link
  return {
    link: link,
    restrict: 'E',
    scope: { data: '=', title: '='},
    controller: 'OverviewController',
    replace: true,
    template: '<svg class="barChart4"></svg>',
    //scope: { data: '=', title: '='}  
  };
});

// myApp.directive('donutChart', function(){
//   function link(scope, el, attr){
//     var color = d3.scale.category10();
//     var width = 200;
//     var height = 200;
//     var min = Math.min(width, height);
//     var svg = d3.select(el[0]).append('svg');
//     var pie = d3.layout.pie().sort(null);
//     var arc = d3.svg.arc()
//       .outerRadius(min / 2 * 0.9)
//       .innerRadius(min / 2 * 0.5);

//     svg.attr({width: width, height: height});

//     // center the donut chart
//     var g = svg.append('g')
//       .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
//     // add the <path>s for each arc slice
//     var arcs = g.selectAll('path');

//     scope.$watch('data', function(data){
//       if(!data){ return; }
//       arcs = arcs.data(pie(data));
//       arcs.exit().remove();
//       arcs.enter().append('path')
//         .style('stroke', 'white')
//         .attr('fill', function(d, i){ return color(i) });
//       // update all the arcs (not just the ones that might have been added)
//       arcs.attr('d', arc);
//     }, true);
//   }
//   return {
//     link: link,
//     restrict: 'E',
//     scope: { data: '=' }
//   };
// });

// myApp.directive('scatter', function(){
//   function link(scope, el, attr){
//     el = el[0];
//     var w, h;
//     var svg = d3.select(el).append('svg');
//     var xAxisG = svg.append('g').attr('class', 'x-axis');
//     var yAxisG = svg.append('g').attr('class', 'y-axis');
//     var points = svg.append('g').attr('class', 'points').selectAll('g.point');
//     var x = d3.scale.linear();
//     var y = d3.scale.linear();
//     var xAxis = d3.svg.axis().scale(x).orient('bottom')
//       .tickFormat(function(d, i){ return i + 1; }); // 1 index the company ranks
//     var yAxis = d3.svg.axis().scale(y).orient('left');
//     var m = 50;

//     scope.$watch(function(){
//       w = el.clientWidth;
//       h = el.clientHeight;
//       return w + h;
//     }, resize);

//     function resize(){
//       svg.attr({width: w, height: h});
//       x.range([m, w - m]);
//       y.range([h - m, m]);
//       xAxis.tickSize(-h + 2 * m);
//       yAxis.tickSize(-w + 2 * m);
//       xAxisG.attr('transform', 'translate(' + [0, y.range()[0] + 0.5] + ')');
//       yAxisG.attr('transform', 'translate(' + [x.range()[0], 0] + ')');
//       update();
//     }

//     // scope.$watch('data', update);

//     function update(){
//       if(!scope.data){ return };
//       var data = scope.data;
//       var x_extent = d3.extent(data, function(d, i){ return i });
//       x.domain(x_extent);
//       var y_max = d3.max(data, function(d){ return d.value });
//       y.domain([0, y_max]);
//       points = points.data(data);
//       points.exit().remove();
//       var point = points.enter().append('g').attr('class', 'point');
//       point.append('circle').attr('r', 5)

//       // update the position of all the points
//       points.attr('transform', function(d, i){
//         return 'translate(' + [x(i), y(d.value)] + ')';
//       });

//       xAxisG.call(xAxis);
//       yAxisG.call(yAxis);

//     };
//   }
//   return {
//     link: link,
//     restrict: 'E',
//     scope: { data: '=' }
//   };
// });

function createSvg(sel,className,width,height) { 
  var selection = d3.select(sel).append("svg")
    .attr("width", width)
    //.attr("width", width + margin.left + margin.right)
   // .attr("height", height + margin.top + margin.bottom)
       .attr("height", height)
    .classed(className,true)
    .append('g').attr("transform","translate(" + margin.left + "," + margin.top + ")") 

  // selection.append('rect')
  //   .attr("width",width)
  //   .attr("height", height)
  //   .attr("y", 0)
  //   .attr("x",0)
  //   .style("stroke","black")
  //   .style("stroke-width",1)
  //   .style("fill","none")
  return selection
}//createSvgs

// myApp.directive('barChart1', function() {
//   function link (scope,el,attr) {
//     //var selection = d3.select(el[0]).append("svg")
//     // var w = el[0].clientWidth
//   var basicBar1 = createSvg()
//   var barChart = d3.models.barchart().width(w)//.height(height)
//   basicBar1.call(barChart)

//     var w = 500;
//     //var w = parseInt(d3.select(el[0]).style('width'));
//     //console.log(w)
//     var margin = {top: 20, right: 20, bottom: 20, left: 30},
//         width = w - margin.left - margin.right,
//         height = 250 - margin.top - margin.bottom,
//         barWidth = 40;
//         barOffset = 5;
//     var centerx = w/2 - margin.left

//     // //var xScale = d3.scale.linear().range([margin.left,width])
//     // var yScale = d3.scale.linear().range([height, 0]);
//     // //var yScale = d3.scale.linear().range([margin.top, height - margin.bottom])
   
//     function createSvg() { 
//       var selection = d3.select(el[0]).append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append('g').attr("transform","translate(" + margin.left + "," + margin.top + ")") 

//       selection.append('rect')
//         .attr("width",width)
//         .attr("height", height)
//         .attr("y", 0)
//         .attr("x",0)
//         .style("stroke","black")
//         .style("stroke-width",1)
//         .style("fill","none")
//       return selection
//     }//createSvg
//     //var basicBar1 = createSvg("Data Join using .data(data)")
//     scope.$watch('title', function(title) {
//        basicBar1.append('g').attr("transform","translate("+ centerx + ",30)")
//       .append('text').text(title)
//       .attr("text-anchor","middle")
//     })

//     scope.$watch('data', function(data) {
//       console.log(data)

//       //if(!data){ return; }
//       var rect1 = basicBar1.selectAll('.rects').data(data)
//       //UPDATE
//       rect1
//         .classed("update",true)
//         .transition().duration(2500) 
//         .style("fill", "green")
//         .attr("x", function(d,i) {  return i * (barWidth + barOffset)})
//       //ENTER
//       rect1.enter().append('rect')
//         .attr("width",barWidth)
//         .attr("x",function(d,i) { return i * (barWidth+ barOffset)})
//         // .attr("height", function(d) { return height - yScale(d)})
//         // .attr("y",function(d) { return yScale(d) } )
//         .attr("height", function(d) { return d})
//         .attr("y",function(d) { return height - d } )
//         .style("fill", "steelblue")
//         .attr("class","rects")
//         .classed("enter",true)
//       //EXIT
//       rect1.exit().transition().duration(2000).style("fill","black").attr("height",0).remove()
//     },true);


//   }//link
//   return {
//     link: link,
//     restrict: 'E',
//     scope: { data: '=', title: '='},
//     controller: 'OverviewController'
//     //scope: { data: '=', title: '='}  
//   };
// });

//1. data variable outside of scope.$watch errors out as not defined
//RESOLUTION: Variable changed to scope.title not scope.barTitle and it worked
//2. first bar graph appends during the creation of the svg in order to create it once
// the data is then immediatly reapplied chaning the bars to green while the other charts are 
// are still blue.  
//RESOLUTION:  changing .datum(scope.data) t .data(scope.data)
//3. Hovering over svg displays title text as tooltip
//RESOLUTION: Removing title attr from directive in html.  Changing title to t in directive link 
//and updating the variable name in html dir and scope.t worked as well
//4. Adding this to directive 2 causes bars to turn green 
  // scope.$watch(function() {
    //   w=el[0].clientWidth; console.log(w);
    //   h=el[0].clientHeight;
    //   return w + h;
    // }, resize );

    // function resize() {
    //   console.log(w)
    //   basicBar.attr({width: w, height, h });
    //   update();
    // }
