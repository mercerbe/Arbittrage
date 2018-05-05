function cryptocompare() {
  $.ajax({
    url: 'https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=' + ticker + '&tsym=BTC',
    type: 'GET',
  })
  .done(function(response) {
    let ticker;
    console.log(response);
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}
