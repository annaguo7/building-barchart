

d3.csv('cities.csv', d=>{
    return {
      ...d, // spread operator
      eu: d.eu==='true', // convert to boolean
      population: +d.population,
      x: +d.x,
      y: +d.y,
    }
  }).then(data=>{
      console.log('cities', data);
  })
  
  function filterbyEu(item){
      if(item.eu == true) {
          return true
      };
  };
  
  function filterLabel(item) {
      if (item.population > 1000000) {
          return true
      };
  };
  
  function sortHeight(a,b) {
      return b.height_ft - a.height_ft;
  };
  


  
  d3.csv('cities.csv', d3.autoType).then(data=>{
      console.log('cities', data);
  
      filteredArray = data.filter(filterbyEu);
      filterPopArray = filteredArray.filter(filterLabel);
  
  
      console.log(filteredArray);
  
      d3.select('.city-count').text('Number of Cities:' + filteredArray.length)
      const width = 700;
      const height = 550;
      const svg = d3.select('.population-plot')
          .data(filterPopArray)
          .append('svg')
          .attr('width', width)
          .attr('height', height);
  
      svg.selectAll('circle')
          .data(filteredArray)
          .enter()
          .append('circle')
          .attr('x', 'y')
          .attr('cx', function(d) {return d.x})
          .attr('cy', function(d) {return d.y})
          .attr('r', function(d) {
              if (d.population > 1000000){
                  return 8
              }
              else {
                  return 4
              }
          }) 
          .attr('fill', 'skyblue')
  
      svg.selectAll('text')
          .data(filterPopArray)
          .enter()
          .append('text')
          .attr('x', function(d) {return d.x + 10})
          .attr('y', function(d) {return d.y + 4})
          .text(d=>d.country)
          .attr('font-size', '11px')
  
  })





  d3.csv('buildings.csv', d=>{
    return {
         ...d, // spread operator
         height_m: +d.height_m,
         height_ft: +d.height_ft,
         height_px: +d.height_px,
         floors: +d.floors,
         completed: +d.completed,
    }
  }).then(data=>{
      console.log('buildings', data);
  })




  d3.csv('buildings.csv', d3.autoType).then(data=>{
    console.log('buildings', data);
    sortedArray = data.sort(sortHeight);
    console.log('sorted buildings', sortedArray.length);



    var width = 650,
    barHeight = 40;
    scaleFactor = .1;

    var graph = d3.select(".building")
              .append("svg")
              .attr("width", width)
              .attr("height", barHeight * sortedArray.length);

    var bar = graph.selectAll("g")
              .data(sortedArray)
              .enter()
              .append("g")
              .attr("transform", function(d, i) {
                    return "translate(0," + i * barHeight + ")";
              
                }
              )
              

bar.append("rect")

    .attr('class', 'bar')
    .attr('x',300)
    .attr("width", function(d) {
            console.log(d.building + ' '+d.height_ft)
            return (d.height_ft)*scaleFactor;
   })
   .attr("height", barHeight - 3)
   .attr('fill', 'skyblue')
   .on("click", function (d,i) {

    document.querySelector('#bimage').src= i['image'];
    document.querySelector('.building-name').innerHTML=i['building'];
    document.querySelector('.height').innerHTML=i['height_ft'] + ' ft';
    document.querySelector('.city').innerHTML=i['city'];
    document.querySelector('.floors').innerHTML=i['floors'];
    document.querySelector('.country').innerHTML=i['country'];
    document.querySelector('.completed').innerHTML=i['completed'];



  }
)

   





bar.append("text")
   .attr("x", function(d) { return (d.height_ft)*scaleFactor+2+300; })
   .attr("y", barHeight / 2)
   .attr("dy", ".35em")
   .text(function(d) { return d.height_ft + 'ft'; })


bar.append("text")
        .attr("class", "name")
        .attr("y",function(d,i) {
          return i+14;
          })
        .attr("x", 0)

        .text(function (d) {
            return d.building;
        })
        .attr("text-anchor", "start");



})

