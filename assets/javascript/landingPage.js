$(document).ready(function() {
//backstretch
$(".jumbotron").backstretch("https://media.giphy.com/media/3oEjI9ZALbbWcO1hpm/giphy.gif");

//Arrays
var cryptoArrayById = [{"id": "BTC", "logo":"assets/images/bitcoin.png"}, {"id":"ETH", "logo":"assets/images/eth.png"}, {"id":"XRP", "logo":"assets/images/xrp.png"}, {"id":"BCH", "logo":"assets/images/bitcoin-cash.png"},
 {"id":"EOS", "logo":"assets/images/eos.png"}, {"id":"LTC", "logo":"assets/images/litecoin.png"}, {"id":"ADA", "logo":"assets/images/cardano.png"}, {"id":"XLM", "logo":"assets/images/stellar.png"}, {"id":"IOTA", "logo":"assets/images/iota.png"},
 { "id":"NEO", "logo":"assets/images/neo.png"}, {"id":"TRX", "logo":"assets/images/tron.png"}, {"id":"XMR", "logo":"assets/images/monero.png"}, {"id":"DASH", "logo":"assets/images/dash.png"},{"id":"NEM", "logo":"assets/images/nem.png"},
 {"id":"USDT", "logo":"assets/images/tether.png"}, {"id":"ETC", "logo":"assets/images/ethereum-classic.png"}, {"id":"VEN", "logo":"assets/images/vechain.svg"}, {"id":"OMG", "logo":"assets/images/omisego.svg"},
 {"id":"QTUM", "logo":"assets/images/qtum.png"}, {"id":"BNB", "logo": "assets/images/binance-coin.svg"}, {"id":"ICX", "logo":"assets/images/icon.png"}, {"id":"BTG", "logo":"assets/images/bitcoin-gold.png"},
 {"id":"LSK", "logo":"assets/images/lisk.png"}, {"id":"ZEC", "logo":"assets/images/zcash.png"}, {"id":"XVG", "logo":"assets/images/verge.png"}, {"id":"STEEM", "logo":"assets/images/steem.png"}, {"id":"BCN", "logo":"assets/images/bytecoin-bcn.png"},
 {"id":"BTM", "logo":"assets/images/bytom.png"}, {"id":"NANO", "logo":"assets/images/nano.jpg"}, {"id":"BTCP", "logo":"assets/images/bitcoin-private.png"}];
var exchangeArray = ["BitFinex", "Bitstamp", "Bittrex", "C-Cex", "Cex.io", "Exmo", "Hitbtc", "Kraken", "Livecoin", "Poloniex", "wexnz", "YoBit"];
for (var i = 0; i < exchangeArray.length; i++) {
   var exchangeFilter = $("<button class='btn btn-success filter'>");
   exchangeFilter.text(exchangeArray[i]);
   $(".sidenav").append(exchangeFilter);
}
 //var exchangesBenWouldLikeToAdd = ["Binance", "Kucoin", "Coinbase"];
let easyPaginate = document.getElementById("easyPaginate");
 //for loop for landing page coin images/Links
 for (var i = 0; i < cryptoArrayById.length; i++) {
    var anchor = document.createElement("a");
    let link = "coinpage.html?ticker=" + cryptoArrayById[i].id;
    console.log(link);
    anchor.setAttribute("href",link);
    var coinThumbnail = document.createElement("img");
    coinThumbnail.classList.add("img-fluid");
    coinThumbnail.classList.add("img-thumbnail");
    coinThumbnail.classList.add("coinImg");
    coinThumbnail.setAttribute('src', cryptoArrayById[i].logo);
    coinThumbnail.setAttribute('data', cryptoArrayById[i].id);
    anchor.append(coinThumbnail);
    console.log(anchor);
    easyPaginate.append(anchor);
    console.log(easyPaginate);
 };

//pagination for landing page images/links
 $("#easyPaginate").easyPaginate({
   paginateElement: 'a',
   elementsPerPage: 12,
   effect: 'default',
 });

 $(".easyPaginateNav").on("click", function(){
   $(window).scrollTop(250);
 });

// //login modal
//
// //signIn
// var txtEmail = document.getElementById('txtEmail');
// var txtPass = document.getElementById('txtPass');
// var btnLogin = document.getElementById('btnLogin');
// var btnSignup = document.getElementById('btnSignup');
// var btnLogout = document.getElementById('btnLogout');
// var btnShowModal = document.getElementById('btnShowModal');
//
// //login
// btnLogin.addEventListener('click', e => {
// //get email and pass
// var email = txtEmail.value;
// var pass = txtPass.value;
// var auth = firebase.auth();
// //sign in
// var promise = auth.signInWithEmailAndPassword(email, pass);
// promise.catch(e => console.log(e.message));
// promise.catch(e => alert("Not signed up. Please sign up first!"));
//
// })
//
// //sign up
// btnSignup.addEventListener('click', e => {
// var email = txtEmail.value;
// var pass = txtPass.value;
// var auth = firebase.auth();
// console.log("click");
// //sign in
// var promise = auth.createUserWithEmailAndPassword(email, pass);
// promise.catch(e => console.log(e.message));
// })
//
// //real time auth listener
// firebase.auth().onAuthStateChanged(firebaseUser => {
// if (firebaseUser) {
//    console.log(firebaseUser);
//    $("#modal").modal('hide');
// } else {
//    console.log("not logged in");
// }
// })
// //logout
// btnLogout.addEventListener('click', e => {
// firebase.auth().signOut();
// setTimeout(function() {
//    $("#modal").modal('show');
// }, 1000);
//
// })
// //show modal
// btnShowModal.addEventListener('click', e => {
// console.log("click");
// setTimeout(function() {
//    $("#modal").modal('show');
// }, 100);
// })

//search coins
$("#searchTicker").keyup(function(event) {

   var input, filter, coinlist, coindata, a, i;
   input = document.getElementById("searchTicker");
   filter = input.value.toUpperCase();
   console.log(filter);
   coinlist = document.getElementById('easyPaginate');
   coindata = coinlist.getElementsByTagName("a");
   for (var i = 0; i < coindata.length; i++) {
      a = coindata[i].getElementsByTagName("img");
      var data = $(".coinImg").attr('data');
      console.log(data);
      if (data.indexOf(filter) > -1) {
         coindata[i].style.display = "";
      } else {
         coindata[i].style.display = "none";
      }
   }
});




 });
