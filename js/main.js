
// write your javascript code here.
// feel free to change the pre-set attributes as you see fit

let margin = {
    top: 60,
    left: 50,
    right: 30,
    bottom: 35
  },
  width = 500 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;



//SVG that will hold the visualization 
let svg1 = d3.select('#d3-container')
  .append('svg')
  .attr('preserveAspectRatio', 'xMidYMid meet') // this will scale your visualization according to the size of its parent element and the page.
  .attr('width', '60%') // this is now required by Chrome to ensure the SVG shows up at all
  .style('background-color', 'white') 
  .style('border', 'solid')
  .attr('viewBox', [-30, -20, width + margin.left + margin.right, height + margin.top + margin.bottom].join(' '))

// load data and assign it to 2d array
d3.csv("data/data.csv").then( function(data) {
console.log("hello hello")








// X axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d.X))
  .padding(0.2);
svg1.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
   // .attr("transform", "translate(-10,0)")
    .style("text-anchor", "end");

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, 100])
  .range([ height, 0]);
svg1.append("g")
  .call(d3.axisLeft(y));


 	 // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend 		on the data point.
 	 // Its opacity is set to 0: we don't see it by default.
  	const tooltip = d3.select("#d3-container")
   	 .append("div")
   	 .style("opacity", 0)
   	 .attr("class", "tooltip")
   	 .style("background-color", "white")
   	 .style("border", "solid")
   	 .style("border-width", "1px")
   	 .style("border-radius", "5px")
   	 .style("padding", "10px")
			// Make it an overlay
	 .style("position", "absolute")
	


 	 // A function that change this tooltip when the user hover a point.
 	 // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depen	ding on the datapoint (d)
  	const mouseover = function(event, d) {
   	 tooltip
      	.style("opacity", 1)
 	 }

  	const mousemove = function(event, d) {
    		tooltip
				.html(`The X value is:  ${d.X} and the Y value is:  ${d.Y}`)
      		.style("left", (event.x) + 50 + "px")
     		 .style("top", (event.y) + "px")
  }

  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  const mouseleave = function(event,d) {
    tooltip
      .transition()
      .duration(0)
      .style("opacity", 0);
  }

// Bars
svg1.selectAll("mybar")
  .data(data)
  .join("rect")
    .attr("x", d => x(d.X))
    .attr("y", d => y(d.Y))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.Y))
    .attr("fill", "#69b3a2")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);


})
