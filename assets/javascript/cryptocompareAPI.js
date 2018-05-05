$.cors('https://www.cryptocompare.com/api/data/top/exchangess/full/?fsym=' + ticker + '&tsym=BTC', function (data) {
function cryptoCompare() {
  //let coinName = getCoinName(ticker);
  var queryURL = 'https://www.cryptocompare.com/api/data/top/exchangess/full/?fsym=' + ticker + '&tsym=BTC';

  $.ajax({
      url: queryURL,
      method: 'GET'
    })
    .done(function(response) {
      console.log("Compare ticker: ", response);
      var results;
      let base;
      let max;

      if (max > results.length) {
        max = results.length;
      }
      for (var i = 0; i < max; i++) {
        var price;
        var market;
        var volume;
        postTradeValue(market, price, base);
      }
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

}
});
