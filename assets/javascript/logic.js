$(document).ready(function() {
  //backstretch
  //$(".jumbotron").backstretch("https://media.giphy.com/media/3oEjI9ZALbbWcO1hpm/giphy.gif");


  //COINMARKETCAP()
  $.ajax({
      url: 'https://api.coinmarketcap.com/v1/ticker/?convert=USD&start=0&limit=30',
      type: 'GET',
      dataType: 'json',
    })
    .done(function(response) {
      console.log(response);
      //load card info from API call
      for (var i = 0; i < response.length; i++) {
      var coinLogo, coinName, volume, percentChange, priceBTC;
      coinLogo = $("<img class='img-fluid'>");
      coinName = $("<p class='name'>");
      volume = $("<p class='volume'>");
      percentChange = $("<p class='change'>");
      priceBTC = $("<p class'priceBTC'>");
      
      }

      console.log("success: line 17 coinmarketcap ticker info");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });


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


});
