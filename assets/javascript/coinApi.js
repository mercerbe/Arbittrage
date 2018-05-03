let coinObj = {
    "BTC" : "bitcoin",
    "ETH" : "ethereum",
    "XRP" : "ripple",
    "BCH" : "bitcoin-cash",
    "EOS" : "eos",
    "LTC" : "litecoin",
    "ADA" : "cardano",
    "XLM" : "stellar"
}
var config = {
    apiKey: "AIzaSyAxChRCllQhEMrEPSPyFb3ImjXy9lZ6Qf8",
    authDomain: "rock-paper-scissors-ee0a8.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-ee0a8.firebaseio.com",
    projectId: "rock-paper-scissors-ee0a8",
    storageBucket: "rock-paper-scissors-ee0a8.appspot.com",
    messagingSenderId: "976577585931"
  };
firebase.initializeApp(config);

var url_string = window.location.href; //window.location.href
console.log(url_string);
var url = new URL(url_string);
var ticker = url.searchParams.get("ticker");

var database =  firebase.database();
var listSet = false;
var list;
var myConnectionsRef = firebase.database().ref('users/'+ticker);
var coinConnectionsRef = firebase.database().ref('frogfrogfrog/'+ticker);
let count = 0;
let timer;
let isDriver = false;
var colors = [0];

function getlist() {
  return list;
}

function setDriver() {
    console.log("in here 1");
    if(count > 0) {
        isDriver = true;
        count = count - 1;
        console.log("Count is now: " + count);
        myConnectionsRef.set(count);
    }
}

myConnectionsRef.on("value", function(snapshot) {

    count = snapshot.val();

    if(count > 0) {
        let random = Math.random();
        console.log("random: " + (random*15000));
        setTimeout(setDriver,15000*random);
    }
    if(isDriver) {
        myConnectionsRef.onDisconnect().set(1);
    }
});

coinConnectionsRef.on("value", function(snapshot) {
    list = snapshot.val();
    listSet = true;
});

function postTradeValue(market, price, base) {
    if(isDriver) {
        let values = getValuesIndex(base,market);
        let currentDate = getFormattedDate();
        console.log(currentDate);
        let arrValues = list["pricehistory"][market];
        let arrLabels;
        if(market == "MarketCap")
        {
            let labels = getLabelsIndex();
            arrLabels = list["labels"];
            console.log(arrLabels);
            if(arrLabels.length > 49)
            {
              arrLabels.splice(0,1);
            }
            arrLabels.push(currentDate);
            database.ref().child("frogfrogfrog/"+ ticker + labels).set(arrLabels);
        }
        if(arrValues.length > 49)
        {
            arrValues.splice(0,1);
        }
        arrValues.push(price);
        console.log(arrValues);
        database.ref().child("frogfrogfrog" + values).set(arrValues);
    }
}

function getLabelsIndex() {
    let index = "/labels";
    return index;
}

function getValuesIndex(currency, market) {
    let index = "/" + currency + "/pricehistory/" + market;
    return index;
}

function getFormattedDate() {
    let date = new Date();
    let formattedDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return formattedDate;
}

function init() {
    let coinName = getCoinName(ticker);
    var queryURL = "https://api.coinmarketcap.com/v1/ticker/"+coinName+"/?convert=USD";
    if(listSet && isDriver)
    {
        cryptonator();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response["0"].price_usd);
            let price = parseInt(response["0"].price_usd);
            postTradeValue("MarketCap",price,ticker);
        });
        drawChart();
    }
}

function cryptonator(){
    var queryURL = 'https://api.cryptonator.com/api/full/'+ticker+'-usd';

    $.ajax({
        url: queryURL,
        method:"GET"
    })

    .then(function(response){
       console.log(response);

        var results = response.ticker.markets;
        let base = response.ticker.base;
        let max = 5;

        if(max > results.length) {
            max = results.length;
        }

        for (var i = 0; i < max; i++){
            var price = results[i].price;
            var market = results[i].market;
            var volume = results[i].volume;
            postTradeValue(market,price,base);
        }
    });

}

var ctx = document.getElementById('myChart').getContext('2d');

function drawChart() {
    if(listSet){
      myChartObj = {};
      myChartObj["labels"] = list["labels"];
      let count = 0;
      for(node in list["pricehistory"])
      {
        let tempObj = {};
        tempObj["label"] = node;
        let tempArr = list["pricehistory"][node];
        tempObj["data"] = tempArr;
        if(colors.length < 6) {
          let colorArr = [""];
          for(var l = 0; l < 4; l++)
          {
            colorArr.push(Math.floor(Math.random()*248));
          }
          console.log(colorArr);
          colors.push("rgba(" + colorArr[1]+ ", " + colorArr[2] + ", " + colorArr[3] + ", " + 0.3 + ")");
        }
        tempObj["backgroundColor"] = [colors[count+1]];
        console.log(tempObj["backgroundColor"]);
        tempObj["borderColor"] = ["rgba(0, 0, 0, 1.0)"];
        tempObj["label"] = node;
        if(count == 0) {
          myChartObj["datasets"] = [tempObj];
        }
        else{
          myChartObj["datasets"].push(tempObj);
        }
        count = count + 1;
      }

      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        data : myChartObj,
        // Configuration options go here
        options: {},
      });
  }
}

function getCoinName(string) {
    return coinObj[string];
}

setInterval(init, 1000*10);
