let xValues = [];
let yValues = [];
let arrStat = JSON.parse(localStorage.getItem('statistics'));
for ( let index = 0;index<arrStat.length;index++){
  yValues.push((arrStat[index][0]/arrStat[index][1]).toFixed(1) * 100);
  //arrStat[index][0]/arrStat[index][1]
  xValues.push(index+1);
  
}

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:100}}],
    }
  }
});

let butClear = document.querySelector(".clear");
butClear.onclick = ()=>{
  localStorage.setItem("statistics",null);
  location.reload();
}