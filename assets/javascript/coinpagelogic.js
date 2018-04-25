$(document).ready(function() {
  //backstretch
$(".jumbotron").backstretch("https://media.giphy.com/media/3oEjI9ZALbbWcO1hpm/giphy.gif");
//Coin API Key: 09F8AB63-58B9-46D9-AF1E-1B0F731A33D0

//initialize firebase (need new database here)
var config = {
  apiKey: "AIzaSyAeAknL1yW7rAj6JhjNVDTCzV7t5OJVjHM",
  authDomain: "fir-railways.firebaseapp.com",
  databaseURL: "https://fir-railways.firebaseio.com",
  projectId: "fir-railways",
  storageBucket: "fir-railways.appspot.com",
  messagingSenderId: "370451683022"
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
