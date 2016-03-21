var sampleId = location.search.split("=")[1]
d3.json("http://localhost:3000/api/sample/" + sampleId, function(error, data) {
      var variantData = data[0].variants
      console.log(variantData)
      // console.log(variantData.length)
      fakeData = d3.select('#svg3')
      fakeData.selectAll("circle")
      .data(variantData)
      .enter()
      .append("circle")
      .attr({
   r: 10,
    cx: function(d, i) {
        if (i < 12) {
            return 420
        } else if (i >= 12 && i <= 23) {
            return 320
        }
        else if (i<=36){
          return 370
        }
        else {
          return (36-i) * 20 + 220
        }
    },
    cy: function(d, i) {
        if(i<12){
        return i * 75 + 75
        }
        else if(i>=12 && i <= 23) {
        return (i-12) * 72 + 158
        }
        else if(i<=36) {
          return (i-20) * 72 - 230
        }
        else return  10

    }
}).style("fill", function(d, i) {
    if (d.importance == "Low") {
        return "#00FF19"
    } else if (d.importance == "Moderate") {
        return "yellow"
    } else if (d.importance == "High")  {
        return "#FF0006"
    }

    }).style("opacity", .5).on('mouseover', function(d) {
    var nodeSelection = d3.select(this).style({
        opacity: '1'
    }).on('mouseout', function(d){
        var nodeSelection = d3.select(this).style({
            opacity: '.5'
        })
    });
   
}).on("click",function(d){
        d3.select(".variantSummary")
            .style("opacity", "1")
            .text(function(){return d.summary})
            .style("color", function() {
    if (d.importance == "Low") {
        return "#00FF19"
    } else if (d.importance == "Moderate") {
        return "yellow"
    } else if (d.importance == "High") {
        return "#FF0006"
    }
    })
})
})
