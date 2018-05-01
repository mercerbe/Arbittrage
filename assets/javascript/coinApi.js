var config = {
    apiKey: "AIzaSyAxChRCllQhEMrEPSPyFb3ImjXy9lZ6Qf8",
    authDomain: "rock-paper-scissors-ee0a8.firebaseapp.com",
    databaseURL: "https://rock-paper-scissors-ee0a8.firebaseio.com",
    projectId: "rock-paper-scissors-ee0a8",
    storageBucket: "rock-paper-scissors-ee0a8.appspot.com",
    messagingSenderId: "976577585931"
  };
firebase.initializeApp(config);

var database =  firebase.database();
var listSet = false;
var list;
database.ref().on("value", function(snapshot) {
    console.log(snapshot.val().frogfrogfrog);
    list = snapshot.val().frogfrogfrog;
    listSet = true;
});

function postTradeValue(market, price, base) {
    let labels = getLabelsIndex(base,market);
    let values = getValuesIndex(base,market);
    let currentDate = getFormattedDate();
    console.log(currentDate);
    let arrLabels = list[base]["pricehistory"][market]["labels"];
    arrLabels.push(currentDate);
    let arrValues = list[base]["pricehistory"][market]["values"];
    arrValues.push(price);
    database.ref().child("frogfrogfrog"+ labels).set(arrLabels);
    database.ref().child("frogfrogfrog" + values).set(arrValues);
}

function getLabelsIndex(currency, market) {
    let index = "/" + currency + "/pricehistory/" + market + "/labels";
    return index;
}

function getValuesIndex(currency, market) {
    let index = "/" + currency + "/pricehistory/" + market + "/values";
    return index;
}

function getFormattedDate() {
    let date = new Date();
    let formattedDate = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return formattedDate;
}

function init() {
    var queryURL = "https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=USD"
    if(listSet)
    {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response["0"].price_usd);
            let price = parseInt(response["0"].price_usd);
            postTradeValue("marketCap",price,"BTC");
        });
    }
}

setTimeout(init, 1000*2);