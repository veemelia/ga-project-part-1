window.addEventListener("load", () => {
  let lat;
  let lon;
  let location = document.querySelector("#location");
  let temperatureVal = document.querySelector("#temp-val");
  let temperatureDesc = document.querySelector("#temp-desc");
  let iconCanvas = document.querySelector("#icon");
  let tempSection = document.querySelector("div.temp-val");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Function: Convert data into JSON format
      const waitForData = (res) => {
        return res.json();
      };

      // Function: Extract data
      const storeData = (data) => {
        // Get key data
        const temp = data.main.temp;
        const { description, icon } = data.weather[0];
        const city = data.name;
        const country = data.sys.country;

        // Update DOM
        location.placeholder = `${city} | ${country}`;
        temperatureVal.innerHTML = temp.toFixed(2);
        temperatureDesc.innerHTML = description;
        setIcon(iconCanvas, icon);

        // Toggle temperature units
        tempSection.addEventListener("click", () => {
          if (document.querySelector(".temp-val span").innerHTML === "C") {
            document.querySelector(".temp-val span").innerHTML = "F";
            temperatureVal.innerHTML = ((temp * 9) / 5 + 32).toFixed(2);
          } else {
            document.querySelector(".temp-val span").innerHTML = "C";
            temperatureVal.innerHTML = temp.toFixed(2);
          }
        });
      };

      // Function: Catch errors and display in console
      const displayErr = (err) => {
        console.log(err.textStatus);
      };

      lat = position.coords.latitude;
      lon = position.coords.longitude;

      const apiKey = process.env.WEATHER_APIKEY; // API key
      const baseURL = `https://api.openweathermap.org/data/2.5/weather`; // Base URL
      let queryString = `?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`; // Query for URL
      let url = baseURL + queryString; // Complete URL

      fetch(url, {
        method: "GET",
      })
        .then(waitForData)
        .then(storeData)
        .catch(displayErr);
    });
  }

  // Function: Set icon based on weather API code
  const setIcon = (iconId, icon) => {
    // Corresponding skycon name based on weather API code
    const iconName = {
      "01d": "clear-day",
      "01n": "clear-night",
      "02d": "partly-cloudy-day",
      "02n": "partly-cloudy-night",
      "03d": "cloudy",
      "03n": "cloudy",
      "04d": "cloudy",
      "04n": "cloudy",
      "09d": "showers-day",
      "09n": "showers-night",
      "10d": "rain",
      "10n": "rain",
      "11d": "thunder-rain",
      "11n": "thunder-rain",
      "13d": "snow",
      "13n": "snow",
      "50d": "fog",
      "50n": "fog",
    };

    const skycon = new Skycons({ monochrome: false });
    skycon.play();
    return skycon.set(iconId, iconName[icon]);
  };
});
