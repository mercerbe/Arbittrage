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
      console.log("success: line 17 coinmarketcap ticker info");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });


  console.log(database);

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

//
