console.log('Chart script loaded');

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var jsonData = $.ajax({
    url: "http://localhost:4444/chartdata",
    //url: "https://test-getoxdev.herokuapp.com/chartdata",
    dataType: "json",
    async: false
  }).responseText;
    
  // Create our data table out of JSON data loaded from server.
  var data = new google.visualization.DataTable(jsonData);

  var options = {
    // curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['#1a1a1a', '#006600']
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}
