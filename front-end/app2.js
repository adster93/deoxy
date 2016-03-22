//grab from server name information

var sampleId = location.search.split("=")[1]
d3.json("https://pure-cove-57024.herokuapp.com/api/sample/" + sampleId, function(error, data) {
      var variantData = data[0].variants
      console.log(data)
      var patientDescription = []
      patientDescription.push(data[0].name)
      patientDescription.push(data[0].bloodType)
      patientDescription.push(data[0].dateOfBirth)
      patientDescription.push(data[0].height)
      patientDescription.push(data[0].race)
      patientDescription.push(data[0].sex)
      console.log(patientDescription)
      // patientDescription.push(dat)
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
        d3.selectAll(".variantSummary2 > div").remove()
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

            d3.select(".variantSummary2")
            .selectAll("text")
            .data(patientDescription)
            .enter()
            .append("div")
            .style("opacity", "1")
            .text(function(d){return d})
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
