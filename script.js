window.onload = function() {
    document.getElementById("weatherSubmit").addEventListener("click", async function(event) {
        event.preventDefault();
        const value = document.getElementById("weatherInput").value;
        if (value === "")
            return;
        console.log(value);

        const url1="https://api.openweathermap.org/data/2.5/weather?q=" + value 
            + ",US&units=imperial" + "&APPID=0d6cd773753dfce03b36afedd4182be1";
        try{
            //trying 
            const response1 = await fetch(url1);
            console.log("response",response1);
            const json = await response1.json();
            //console.log("json: ",json); use when run into problems
            let results ="";
            results+= '<h2>Current Weather in ' + json.name +"</h2>";
            for (let i=0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2' + json.main.temp + " &deg;F</h2>";
            results += "<p>"
            for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].description
                if (i!== json.weather.length - 1)
                    results += ", "
            }
            results += "</p>";

            document.getElementById("weatherResults").innerHTML = results;

        }catch(myError){
            console.log(myError);
        }

        const url2="https://api.openweathermap.org/data/2.5/forecast?q=" + value 
            + ",US&units=imperial" + "&APPID=0d6cd773753dfce03b36afedd4182be1";
        
        try{
            //trying
            const response2 = await fetch(url2);
            console.log("response",response2);
            const json2 = await response2.json();
            let forecast ="";
            /*forecast+= '<h2>TRI-HOURLY 5 DAY FORECAST IN ' + json2.name +"</h2>";*/
            forecast+= '<h2> 5 DAY FORECAST </h2>';
            for (let i=0; i < json2.list.length; i++)  {
                forecast += "<h2>" + moment(json2.list[i].dt_txt).format('dddd MMMM Do YYYY, h:mm A') + "</h2>";
                forecast += "<p>Temperature: " + json2.list[i].main.temp + "</p>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json2.list[i].weather[0].icon + '.png"/>'
                /*forecast += "<p>"
                for (let i=0; i < json2.weather.length; i++) {
                    forecast += json2.weather[i].description
                    if (i!== json2.weather.length - 1)
                        forecast += ", "
                }
                forecast += "</p>";*/
            }
            

            document.getElementById("forecastResults").innerHTML = forecast;

        }catch(err){
            console.log(err);
        }

        /*  .then(function(response) {
            return response.json();
          }).then(function(json) {	*/
    });
}