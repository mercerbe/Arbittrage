$(document).ready(function(){



    var queryURL = 'https://api.cryptonator.com/api/full/btc-usd'

    $.ajax({
        url: queryURL,
        method:"GET"

    })

    .then(function(response){
       console.log(response);


       var results = response.ticker;

        for (var i = 0; i < results.length; i++){

            var price = results[i].markets.price;
            var markets = results[i].markets;
            var base = results[i].base;
            var volume = results[i].volume;
            console.log(market);
            console.log(price);
            console.log(volume);
            console.log(base);
        }


    });

});
