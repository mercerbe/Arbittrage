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
var myConnectionsRef = firebase.database().ref('users/count');
let count = 0;
let timer;
let isDriver = false;

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

database.ref().on("value", function(snapshot) {
    list = snapshot.val().frogfrogfrog;
    listSet = true;
});

function postTradeValue(market, price, base) {
    if(isDriver) {
        let values = getValuesIndex(base,market);
        let currentDate = getFormattedDate();
        console.log(currentDate);
        let arrValues = list[base]["pricehistory"][market];
        let arrLabels;
        if(market == "MarketCap")
        {
            let labels = getLabelsIndex();
            arrLabels = list["labels"];
            if(arrLabels.length > 49)
            {
              arrLabels.splice(0,1);
            }
            arrLabels.push(currentDate);
            database.ref().child("frogfrogfrog"+ labels).set(arrLabels);
        }
        if(arrValues.length > 49)
        {
            arrValues.splice(0,1);
        }
        arrValues.push(price);
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
    var queryURL = "https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=USD"
    if(listSet && isDriver)
    {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response["0"].price_usd);
            let price = parseInt(response["0"].price_usd);
            postTradeValue("MarketCap",price,"BTC");
        });
    }
}

setInterval(init, 1000*2);
