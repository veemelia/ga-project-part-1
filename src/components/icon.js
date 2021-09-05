var icons = new Skycons({ monochrome: false });
//   list = [
//     "clear-day",
//     "clear-night",
//     "partly-cloudy-day",
//     "partly-cloudy-night",
//     "cloudy",
//     "rain",
//     "showers-day",
//     "showers-night",
//     "sleet",
//     "rain-snow",
//     "rain-snow-showers-day",
//     "rain-snow-showers-night",
//     "snow",
//     "snow-showers-day",
//     "snow-showers-night",
//     "wind",
//     "fog",
//     "thunder",
//     "thunder-rain",
//     "thunder-showers-day",
//     "thunder-showers-night",
//     "hail",
//   ],
//   i;

// for (i = list.length; i--; ) icons.set(list[i], list[i]);
icons.set(document.querySelector("#icon"), "clear-day");
icons.play();
