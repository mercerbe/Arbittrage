$(document).ready(function() {
  //backstretch
$(".jumbotron").backstretch("https://media.giphy.com/media/3oEjI9ZALbbWcO1hpm/giphy.gif");
var cryptoArray = ["Bitcoin", "Etheruem", "Ripple", "Bitcoin Cash", ];
var xchangeArray = ["Binance", "Kucoin", "BitBox", "Bittrex", "Kraken", "Poloniex",  ];
//Coin API Key: 09F8AB63-58B9-46D9-AF1E-1B0F731A33D0
//Coinigy API Key:
//CoinMarketCap API key:
//Cryptonator API key: url: https://www.cryptonator.com/api/ticker/btc-usd
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
  console.log("Exchange Names success");
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
  console.log("success Coin Price by Minute");
  console.log(response);
})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
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
  if(firebaseUser) {
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
  setTimeout(function(){
  $("#modal").modal('show');
}, 1000);

})
//show modal
btnShowModal.addEventListener('click', e => {
  setTimeout(function(){
  $("#modal").modal('show');
}, 500);
})
});

//
