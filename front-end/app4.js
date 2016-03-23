
d3.json("http://localhost:3000/api/males", function(error, root) {
  var result = [];
  data = root.reduce(function(result, person) {
    // console.log(person)
  person.variants.forEach(function(variant) {
    result[variant.name] = result[variant.name] || 0
    result[variant.name] = result[variant.name] + 1 
  })
  return result
}, {})
  console.log(data)
  for(name in data){
    result.push({
                name: name,
                size: data[name]
               })
            }
  console.log(result)

// var newNest = d3.nest()
// .data(data)
// .key(function(d){return

var nodes = result
// [{techName: 'USB'}, {techName: 'HDMI'}, {techName: 'DVI'}, {techName: 'VGA'}]; 

var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 3000 - margin.left - margin.right,
    height = 3000 - margin.top - margin.bottom;
 

 var force = d3.layout.force()
     .charge(-700)
     .linkDistance(20)
     .size([width, height]);
 
 var svg = d3.select("#chart").append("svg")
     .attr("width", width)
     .attr("height", height)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   force
       .nodes(nodes)
       .start();
  
   var node = svg.selectAll("circle.node")
       .data(nodes)
     .enter().append("circle")
       .attr("class", "node")
       .attr("r", function(d){
        return d.size
       })
       .style("fill", "#48D5FF" )
       .on("click", function(d){
        d3.selectAll("#nodeInfo > text").remove()
        d3.select("#nodeInfo")
        .append("text")
        .text(function(){
          return d.size
        })
       })
       .call(force.drag);
 
  var text = svg.selectAll('text')
      .data(nodes)
      .enter().append("svg:text")
      .style("font-size", "24px")
      .text(function(d) { return d.name; })
      .style("fill", "gray")

     
   force.on("tick", function() {
 
     text.attr("x", function(d) { return d.x + 6; })
         .attr("y", function(d) { return d.y + 4; });           
       
     node.attr("cx", function(d) { return d.x; })
         .attr("cy", function(d) { return d.y; });
   });

})

// var newNest= d3.nest()
// .key(function(d){return d})
// .entries(result)

// newNest[0].key = "children"

// console.log(newNest)

// var stuff = {
//   children: [
//     {"name": "bob", value: 1.94},
//     {"name": "jimmy", value: 0.42},
//     {value: 0},
//     {value: 3.95},
//     {value: 0.06},
//     {value: 0.91},
//     {value: 5},
//     {value: .8},
//     {value: .2},
//     {value: .1}
//   ]
// };
// console.log(stuff)
//   var width = 960,
//     height = 500;

// var pack = d3.layout.pack()
//     .sort(d3.descending)
//     .size([width, height]);

// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height);

// svg.data([stuff]).selectAll(".node")
//     .data(pack.nodes)
//   .enter().append("circle")
//     .attr("class", "node")
//     .style("fill", "red")
//     .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
//     .attr("r", function(d) { return d.r; })

// })
//   var svg = d3.select("#statSvg")
//   var stats = svg.selectAll("g")
//     .data(result)
//     .enter()
//     .append("g")
//     .attr("transform", function(d, i) { return "translate(100,100)"; });
//     stats.append("circle")
//     .attr({
//     r: function(d){
//       return d.size * 1
//       console.log(d.name)
//       console.log(d)
//       var count
//       if (d.variants[i].importance == "Low") {
//         return "#00FF19"
//     } else if (d.variants[i].importance == "Moderate") {
//         return "yellow"
//     } else if (d.variants[i].importance == "High") {
//         return "red"
    
//     },
//     cx: function(d, i) {
//          {
//           if(d.size > 5)
//           return i * 30
//         }
//     },
//     cy: function(d, i) {
//         if(d.size > 5){
//           return i * 0 + 500
//         }
//         if(i > )
//     }
// })
// })

// d3.json("http://localhost:3000/api/males", function(error, data){
//   console.log(data)
//   var svg = d3.select(".svgContainer");
//   var geneSummary = svg.selectAll("g")
//     .data(data)
//     .enter()
//     .append("g")
//     .attr("transform", function(d, i) { return "translate(100,100)"; });
//   geneSummary.append("circle")
//     .attr({
//     r: 12,
//     cx: function(d, i) {
//          {
//           return i * 30
//         }
//     },
//     cy: function(d, i) {
//         return i * 30
//     }
// }).style("fill", function(d) {
//     if (d.clinicalImportance == "Low") {
//         return "#00FF19"
//     } else if (d.clinicalImportance == "Moderate") {
//         return "yellow"
//     } else if (d.clinicalImportance == "High") {
//         return "red"
//     }
// }).style("opacity", .5).on('mouseover', function(d) {
//     var nodeSelection = d3.select(this).style({
//         opacity: '1'
//     }).on('mouseout', function(d){
//         var nodeSelection = d3.select(this).style({
//             opacity: '.5'
//         })
//     });
   
// }).on("click",function(d){
//         console.log(d)
//         d3.select(".variantSummary")
//             .style("opacity", "1")
//             .text(function(){return d.summary})
//             .style("color", function() {
//     if (d.clinicalImportance == "Low") {
//         return "#00FF19"
//     } else if (d.clinicalImportance == "Moderate") {
//         return "yellow"
//     } else if (d.clinicalImportance == "High") {
//         return "#FF0006"
//     }
//     })
// })

// })

