let coinObj = {
  "BTC": "Bitcoin",
  "ETH": "Ethereum",
  "XRP": "Ripple",
  "BCH": "Bitcoin Cash",
  "EOS": "Eos",
  "LTC": "Litecoin",
  "ADA": "Cardano",
  "XLM": "Stellar",
  "IOTA": "Miota",
  "NEO": "Neo",
  "TRX": "Tron",
  "XMR": "Monero",
  "DASH": "Dash",
  "XEM": "Nem",
  "USDT": "Tether",
  "ETC": "Ethereum Classic",
  "VEN": "Vechain",
  "OMG": "Omisego",
  "QTUM": "Qtum",
  "BNB": "Binance Coin",
  "ICX": "Icon",
  "BTG": "Bitcoin Gold",
  "LSK": "Lisk",
  "ZEC": "Zcash",
  "XVG": "Verge",
  "STEEM": "Steem",
  "BCN": "Bytecoin",
  "BTM": "Bytom",
  "NANO": "Nano",
  "BTCP": "Bitcoin Private",
  //new coins to be added (as top 30 changes)
  "ONT": "ontology",
  "AE": "aeternity",
  "WAN": "wanchain",
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

//login modal
//signIn
var txtEmail = document.getElementById('txtEmail');
var txtPass = document.getElementById('txtPass');
var btnLogin = document.getElementById('btnLogin');
var btnSignup = document.getElementById('btnSignup');
var btnLogout = document.getElementById('btnLogout');
var btnShowModal = document.getElementById('btnShowModal');

//login
btnLogin.addEventListener('click', e => {
  //get email and pass
  var email = txtEmail.value;
  var pass = txtPass.value;
  var auth = firebase.auth();
  //sign in
  var promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
  promise.catch(e => alert("Not signed up. Please sign up first!"));

})

//sign up
btnSignup.addEventListener('click', e => {
  var email = txtEmail.value;
  var pass = txtPass.value;
  var auth = firebase.auth();
  console.log("click");
  //sign in
  var promise = auth.createUserWithEmailAndPassword(email, pass);
  console.log(email, pass);
  promise.catch(e => console.log(e.message));
})

//real time auth listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    $("#modal").modal('hide');
  } else {
    console.log("not logged in");
  }
})
//logout
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  setTimeout(function() {
    $("#modal").modal('show');
  }, 1000);

})
//show modal
btnShowModal.addEventListener('click', e => {
  console.log("click");
  setTimeout(function() {
    $("#modal").modal('show');
  }, 100);
})

var url_string = window.location.href; //window.location.href
var url = new URL(url_string);
var ticker = url.searchParams.get("ticker");
var database = firebase.database();
var listSet = false;
var list;
var myConnectionsRef = firebase.database().ref('users/' + ticker);
var coinConnectionsRef = firebase.database().ref('frogfrogfrog/' + ticker);
let count = 0;
let timer;
let isDriver = false;
var colors = [0];

function getlist() {
  return list;
}

function setDriver() {
  if (count > 0) {
    isDriver = true;
    count = count - 1;
    myConnectionsRef.set(count);
  }
}

myConnectionsRef.on("value", function(snapshot) {

  count = snapshot.val();

  if (count > 0) {
    let random = Math.random();
    console.log("random: " + (random * 15000));
    setTimeout(setDriver, 15000 * random);
  }
  if (isDriver) {
    myConnectionsRef.onDisconnect().set(1);
  }
});

coinConnectionsRef.on("value", function(snapshot) {
  list = snapshot.val();
  if (!listSet) {
    $("#coinLogo").attr("src", list.img);
    $("#currencyName").text(coinObj[ticker]);
  }
  listSet = true;
});

function postTradeValue(market, price, base) {
  if (isDriver) {
    let values = getValuesIndex(base, market);
    let currentDate = getFormattedDate();
    let arrValues = list["pricehistory"][market];
    let arrLabels;
    if (market == "MarketCap") {
      let labels = getLabelsIndex();
      arrLabels = list["labels"];
      if (arrLabels.length > 49) {
        arrLabels.splice(0, 1);
      }
      arrLabels.push(currentDate);
      database.ref().child("frogfrogfrog/" + ticker + labels).set(arrLabels);
    }
    if (arrValues.length > 49) {
      arrValues.splice(0, 1);
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
  let coinName = getCoinName(ticker);
  var queryURL = "https://api.coinmarketcap.com/v1/ticker/" + coinName + "/?convert=USD";
  if (listSet && isDriver) {
    cryptonator();
    //cryptoCompare();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("ticker", response);
      if ($("#volume").text() == "" || $("#rank").text() == "" || $("#change").text() == "") {
        let volume = response["0"]["24h_volume_usd"];
        let rank = response["0"].rank;
        let change = response[0].percent_change_24h;
        let btcprice = response[0].price_btc;
        $("#volume").text(`24 Hour Volume: $${volume}`);
        $("#rank").text(`Rank: ${rank}`);
        $("#change").text(`24 Hour Change: ${change} %`);
        $("#btcprice").text(`Price (In BTC): ${btcprice}`);
      }
      let price = response["0"].price_usd;
      postTradeValue("MarketCap", price, ticker);
    });
    drawChart();
  }
}

function cryptonator() {
  var queryURL = 'https://api.cryptonator.com/api/full/' + ticker + '-usd';

  $.ajax({
      url: queryURL,
      method: "GET"
    })

    .then(function(response) {
      console.log("full", response);
      var results = response.ticker.markets;
      let base = response.ticker.base;
      let max = 12;

      if (max > results.length) {
        max = results.length;
      }

      for (var i = 0; i < max; i++) {
        var price = results[i].price;
        var market = results[i].market;
        var volume = results[i].volume;
        postTradeValue(market, price, base);
      }
    });

}

var ctx = document.getElementById('myChart').getContext('2d');

function drawChart() {
  if (listSet) {
    myChartObj = {};
    myChartObj["labels"] = list["labels"];
    let count = 0;
    for (node in list["pricehistory"]) {
      let tempObj = {};
      tempObj["label"] = node;
      let tempArr = list["pricehistory"][node];
      tempObj["data"] = tempArr;
      if (colors.length < 12) {
        let colorArr = [""];
        for (var l = 0; l < 10; l++) {
          colorArr.push(Math.floor(Math.random() * 248));
        }
        colors.push("rgba(" + colorArr[1] + ", " + colorArr[2] + ", " + colorArr[3] + ", " + 0.3 + ")");
      }
      tempObj["backgroundColor"] = [colors[count + 1]];
      tempObj["borderColor"] = ["rgba(0, 0, 0, 1.0)"];
      tempObj["label"] = node;
      if (count == 0) {
        myChartObj["datasets"] = [tempObj];
      } else {
        myChartObj["datasets"].push(tempObj);
      }
      count = count + 1;
    }

    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
      data: myChartObj,
      // Configuration options go here
      options: {},
    });
  }
}

function getCoinName(string) {
  return coinObj[string];
}

setInterval(init, 1000 * 10);
