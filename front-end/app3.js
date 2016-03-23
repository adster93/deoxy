d3.json('https://pure-cove-57024.herokuapp.com/api/samples', function(err, data){
  d3.select('.namesContainer')
  .data(data)
  .enter()
  .append("button")
  .attr("class", "participant")
  .attr("class", "buttonPulse")
  .text(function(d){
  	return d.name
  })
  .style("background-color", "black")
  .on("click", function(d, i){
    console.log(d)
    if(i < 39){
      d3.select('.namesContainer')
      .append("text")
      .attr("class", "errorMessage")
      .text("There is not enough data to render this patients DNA")
    }
    else {
       window.location.assign("geneprofile.html?sample=" + d.name)

    }
})
})

