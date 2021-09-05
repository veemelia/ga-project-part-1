window.addEventListener("load", () => {
  let lat;
  let lon;
  let location = document.querySelector("#location");
  let temperatureVal = document.querySelector("#temp-val");
  let temperatureDesc = document.querySelector("#temp-desc");
  let iconCanvas = document.querySelector("#icon");

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
        location.innerHTML = `${city} | ${country}`;
        temperatureVal.innerHTML = temp;
        temperatureDesc.innerHTML = description;
        setIcon(iconCanvas, icon);
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
  const setIcon = (iconId, icon) => {
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
    skycon.set(iconId, iconName[icon]);
    skycon.play();
  };
});
