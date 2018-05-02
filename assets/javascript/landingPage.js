$(document).ready(function() {
//backstretch
$(".jumbotron").backstretch("https://media.giphy.com/media/3oEjI9ZALbbWcO1hpm/giphy.gif");

//Arrays
var cryptoArrayById = [{"id": "bitcoin", "logo":"assets/images/bitcoin.png"}, {"id":"etheruem", "logo":"assets/images/eth.png"}, {"id":"ripple", "logo":"assets/images/xrp.png"}, {"id":"bitcoin-cash", "logo":"assets/images/bitcoin-cash.png"},
 {"id":"eos", "logo":"assets/images/eos.png"}, {"id":"litecoin", "logo":"assets/images/litecoin.png"}, {"id":"cardano", "logo":"assets/images/cardano.png"}, {"id":"stellar", "logo":"assets/images/stellar.png"}, {"id":"iota", "logo":"assets/images/iota.png"},
 { "id":"neo", "logo":"assets/images/neo.png"}, {"id":"tron", "logo":"assets/images/tron.png"}, {"id":"monero", "logo":"assets/images/monero.png"}, {"id":"dash", "logo":"assets/images/dash.png"},{"id":"nem", "logo":"assets/images/nem.png"},
 {"id":"tether", "logo":"assets/images/tether.png"}, {"id":"ethereum-classic", "logo":"assets/images/ethereum-classic.png"}, {"id":"vechain", "logo":"assets/images/vechain.svg"}, {"id":"omisego", "logo":"assets/images/omisego.svg"},
 {"id":"qtum", "logo":"assets/images/qtum.png"}, {"id":"binance-coin", "logo": "assets/images/binance-coin.svg"}, {"id":"icon", "logo":"assets/images/icon.png"}, {"id":"bitcoin-gold", "logo":"assets/images/bitcoin-gold.png"},
 {"id":"lisk", "logo":"assets/images/lisk.png"}, {"id":"zcash", "logo":"assets/images/zcash.png"}, {"id":"verge", "logo":"assets/images/verge.png"}, {"id":"steem", "logo":"assets/images/steem.png"}, {"id":"bytecoin-bcn", "logo":"assets/images/bytecoin-bcn.png"},
 {"id":"bytom", "logo":"assets/images/bytom.png"}, {"id":"nano", "logo":"assets/images/nano.jpg"}, {"id":"bitcoin-private", "logo":"assets/images/bitcoin-private.png"}];
var exchangeArray = ["BitFinex", "Bitstamp", "Bittrex", "C-Cex", "Cex.io", "Exmo", "Hitbtc", "Kraken", "Livecoin", "Poloniex", "wexnz", "YoBit"];
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

//login modal

//signIn
// var txtEmail = document.getElementById('txtEmail');
// var txtPass = document.getElementById('txtPass');
// var btnLogin = document.getElementById('btnLogin');
// var btnSignup = document.getElementById('btnSignup');
// var btnLogout = document.getElementById('btnLogout');
// var btnShowModal = document.getElementById('btnShowModal');

//login
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

//sign up
// btnSignup.addEventListener('click', e => {
// var email = txtEmail.value;
// var pass = txtPass.value;
// var auth = firebase.auth();
// console.log("click");
// //sign in
// var promise = auth.createUserWithEmailAndPassword(email, pass);
// promise.catch(e => console.log(e.message));
// })

//real time auth listener
// firebase.auth().onAuthStateChanged(firebaseUser => {
// if (firebaseUser) {
//    console.log(firebaseUser);
//    $("#modal").modal('hide');
// } else {
//    console.log("not logged in");
// }
// })
//logout
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
 });
