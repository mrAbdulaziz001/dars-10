async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "YOUR_API_KEY_HERE"; // <-- Bu yerga O'ZINGIZNING OpenWeatherMap API key-ni yozing
  
    if (!city) {
      alert("Shahar nomini kiriting!");
      return;
    }
  
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const weatherRes = await fetch(weatherURL);
      if (!weatherRes.ok) throw new Error("Shahar topilmadi");
      const data = await weatherRes.json();
  
      // Malumotlar
      const temp = data.main.temp;
      const max = data.main.temp_max;
      const min = data.main.temp_min;
      const name = data.name;
      const icon = data.weather[0].icon;
      const countryCode = data.sys.country;
  
      document.getElementById("temp").textContent = `${Math.round(temp)}°C`;
      document.getElementById("city").textContent = name;
      document.getElementById("minmax").textContent = `Max: ${Math.round(max)}°C | Min: ${Math.round(min)}°C`;
      document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  
      // Sana
      const today = new Date();
      document.getElementById("date").textContent = today.toDateString();
  
      // Davlat nomi va bayrog‘i
      const countryRes = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      const countryData = await countryRes.json();
      const countryName = countryData[0].name.common;
      const flagURL = countryData[0].flags.png;
  
      document.getElementById("country").textContent = `Country: ${countryName}`;
      document.getElementById("flag").src = flagURL;
  
      // Ko‘rsatish
      document.querySelector(".result").style.display = "flex";
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  }
  