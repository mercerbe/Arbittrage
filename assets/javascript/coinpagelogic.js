$(document).ready(function() {
  //backstretch
  $(".jumbotron").backstretch("https://media.giphy.com/media/3oEjI9ZALbbWcO1hpm/giphy.gif");
  //Arrays
  var cryptoArrayById = ["bitcoin", "etheruem", "ripple", "bitcoin-cash", "eos", "litecoin", "cardano", "stellar", "iota", "neo", "tron", "monero", "dash", "nem", "tether", "ethereum-classic", "vechain", "omisego", "qtum",
   "binance-coin", "icon", "bitcoin-gold", "lisk", "zcash", "verge", "steem", "bytecoin-bcn", "bytom", "nano", "bitcoin-private"];
  var exchangeArray = ["BitFinex", "Bitstamp", "Bittrex", "C-Cex", "Cex.io", "Exmo", "Hitbtc", "Kraken", "Livecoin", "Poloniex", "wexnz", "YoBit"];
  var exchangesBenWouldLikeToAdd = ["Binance", "Kucoin", "Coinbase"]
  //for loop for filter sidebar
  for (var i = 0; i < exchangeArray.length; i++) {
    var exchangeFilter = $("<a class='btn btn-success exchangeFilter'>");
    exchangeFilter.text(exchangeArray[i]);
    //exchangeFilter.append();--add exhange info from API
    $(".sidenav").append(exchangeFilter);
  };
  //for loop for landing page coin images/Links
  for (var i = 0; i < cryptoArrayById.length; i++) {
    var coinThumbnail = $("<img src='http://fakeimg.pl/200x200/' class='img-fluid img-thumbnail float-left coinImg btn'>");
    $(".coinGallery").append(coinThumbnail);
    coinThumbnail.on("click", function() {
      console.log("click");
      window.location = "coinpage.html";
    })
  };

  //COINMARKETCAP()
  //CoinMarketCap API key: url: https://api.coinmarketcap.com/v1/ticker/?convert=USD&start=100&limit=30
  //Ajax ticket (with usd, top 0, limit 30 coins?)
  $.ajax({
      url: 'https://api.coinmarketcap.com/v1/ticker/?convert=USD&start=0&limit=30',
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      console.log(response);
      console.log("success: line 17 coinmarketcap ticker info");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });


  //CRYPTONATOR()
  //Cryptonator API key: url: https://www.cryptonator.com/api/full/btc-usd
  //Basic Ajax (Full info)
  $.ajax({
      url: 'https://www.cryptonator.com/api/full/btc-usd',
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      console.log(response);
      console.log("success: line 37 cryptonator full info");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  //CRYPTOCOMPARE()
  //Crypto Compare Key: None
  //Ajax Crypto Compare Exchanges (all exchanges on thier api)
  $.ajax({
      url: 'https://min-api.cryptocompare.com/data/all/exchanges',
      type: 'GET',
      dataType: 'json'
    })
    .done(function(response) {
      console.log(response);
      console.log("sucess: line 56 cryptocompare all exchanges");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  //Ajax Crypto Compare Minute Data (what we need for Arbitrage--have to specify coin in url)
  $.ajax({
      url: 'https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=10',
      type: 'GET',
      dataType: 'json'
    })
    .done(function(response) {
      console.log("success: line 74 cryptocompare minute data");
      console.log(response);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });


  //CHART.JS()
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our chart
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
          label: "My First dataset",
          backgroundColor: 'rgba(48,180,112,0.3)',
          borderColor: 'rgba(12, 12, 37, 1.0)',
          data: [0, 10, 5, 2, 20, 30, 45],
        },
        {
          label: "My Second dataset",
          backgroundColor: 'rgba(252,177,21,0.3)',
          borderColor: 'rgba(12, 12, 37, 1.0)',
          data: [5, 15, 10, 20, 10, 50, 30],

        }
      ]
    },

    // Configuration options go here
    options: {}
  });



  //initialize firebase (need new database here)
  var config = {
    apiKey: "AIzaSyBeUXt8Ne-jQCvwGpMkiyjI-JQVpyxA1Bg",
    authDomain: "crypto-test-914be.firebaseapp.com",
    databaseURL: "https://crypto-test-914be.firebaseio.com",
    projectId: "crypto-test-914be",
    storageBucket: "",
    messagingSenderId: "310681455458"
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
    //sign in
    var promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  })

  //real time auth listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      console.log(firebaseUser);
      $("#modal").modal('hide');
    } else {
      console.log("not logged in");
      //$("#modal").modal('show');
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
    setTimeout(function() {
      $("#modal").modal('show');
    }, 500);
  })
});

//
