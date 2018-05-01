$(document).ready(function(){



    var queryURL = 'https://api.cryptonator.com/api/full/btc-usd'

    $.ajax({
        url: queryURL,
        method:"GET"

    })

    .then(function(response){
       console.log(response);


       var results = response.ticker.markets;
       //console.log(results);

       //console.log(market);
       //console.log(price);
       //var volume = results[i].volume;
       //console.log(volume);
        for (var i = 0; i < results.length; i++){

            var price = results[i].price;
            var market = results[i].market;
            var base = results[i].base;
            var volume = results[i].volume;
            console.log(market);
            console.log(price);
            //console.log(volume);
            console.log(base);
        }


    });

});
