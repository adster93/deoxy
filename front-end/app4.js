console.log(window.location.href)
var sex = location.search.split("=")[1]
console.log(sex)
d3.selectAll('svg').remove()
d3.json("https://pure-cove-57024.herokuapp.com/api/" + sex + "stats", function(error, root) {
  var sexLength = root.length
        var result = [];
        var summaries = {};
        var importance = {};
        data = root.reduce(function(result, person) {
            // console.log(person)
            person.variants.forEach(function(variant) {
                result[variant.name] = result[variant.name] || 0
                result[variant.name] = result[variant.name] + 1
                summaries[variant.name] = variant.summary
                importance[variant.name] = variant.importance
            })
            return result
        }, {})
        console.log(data)
        for (name in data) {
            result.push({
                name: name,
                size: data[name],
                summary: summaries[name],
                importance: importance[name]
            })
        }

        function findSize(result) {
            var totalSize = 0
            for (var i = 0; i <= result.length - 1; i++) {
                if (!result[i].size) {
                    totalSize = totalSize + 0;
                } else {
                    totalSize = totalSize + result[i].size;
                }
            }
            return totalSize
        }
        findSize(result)

        var nodes = result
        var margin = {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
            },
            width = 3000 - margin.left - margin.right,
            height = 3000 - margin.top - margin.bottom;
        var force = d3.layout.force().charge(-700).linkDistance(20).size([width, height]);
        var svg = d3.select("#chart").append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        force.nodes(nodes).start();
        var node = svg.selectAll("circle.node").data(nodes).enter().append("circle").attr("class", "node").attr("r", function(d) {
            if(sex=='female'){
              return d.size * 3.5
            }
            else{
            return d.size * 2
          }
        }).style("fill", function(d) {
            if (d.importance == "Low") {
                return "#01FF70"
            } else if (d.importance == "Moderate") {
                return "#FFDD70"
            } else if (d.importance == "High") {
                return "#FF4136"
            }
        }).on("click", function(d) {
            d3.selectAll("#nodeInfo > text").remove()
            d3.select("#nodeInfo").append("text").text(function() {
                totalSize = findSize(result)
                return d.name + ': ' + d.summary + ' ' + ((d.size / totalSize) * 100).toFixed(4) + ' %' + ' of ' + sexLength + ' ' + sex + 's'
              
            })
        }).call(force.drag);
        var text = svg.selectAll('text')
        .data(nodes)
        .enter()
        .append("svg:text")
        .style("font-size", "28px").text(function(d) {
            findSize(result)
            return d.name;
        }).style("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", "1.2px")
        force.on("tick", function() {
            text.attr("x", function(d) {
                return d.x + 6;
            }).attr("y", function(d) {
                return d.y + 4;
            });
            node.attr("cx", function(d) {
                return d.x;
            }).attr("cy", function(d) {
                return d.y;
            });
        });
    })
   