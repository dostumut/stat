
$.getJSON('states.json', function (data) {
                var cities=['x'];
                var items=[];
                var table=[];
                var densities=['densities'];
                $.each(data.features, function (key, val) {
                  cities.push(val.properties.name);
                  densities.push(val.properties.density);
                  $('#tablenew').append('<tr><td> '+val.properties.name+' </td> <td> '+val.properties.density+' </td></tr>');
                  //make an array of objects
                  items.push(val.properties);
                  items.sort(function(a, b) {
                  return parseFloat(a.density) - parseFloat(b.density);

                 });

                 //table.push('<tr> <td>' + i +j+ '</td> </tr>');




  });


  c3.generate({
       bindto: '#chart1',
       padding: {
            right: 12,

        },
       data: {
           x: 'x',
           columns: [
             cities,
              densities
           ],
           type: 'bar',
           colors: {
            data1: '#ff0000',

        },
        color: function (color, d) {
            // d will be 'id' when called for legends
            console.log(d)
            return d.id && d.id === 'densities' ? d3.rgb(color).darker(d.value / 1000) : color;
        }
       },
       axis: {
           x: {
               type: 'category', // this needed to load string x value
               tick : {
                rotate:75,
                multiline:false
            }
           }
       }

   });

   //Creating another chart with json data
   c3.generate({
     bindto:"#chart2",
  data: {
    json: items,
    keys: {
       x: 'name', // it's possible to specify 'x' when category axis
      value: ['density'],
    }
  },
  axis: {
    x: {
      type: 'category',
      tick : {
       rotate:75,
       multiline:false
   },
    }
  }
});
var k = ".c3-shape-" + e.index;
d3.selectAll('k')
  .on('click', function(value,index){
      alert('Tick index: ' + index + ' value: ' + value );
  });
});
