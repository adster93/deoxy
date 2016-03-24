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
  .on("click", function(d){
    
       window.location.assign("geneprofile.html?sample=" + d.name)
})
})

