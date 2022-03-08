
import './App.css';
import axios from "axios"
import { useState, useEffect } from "react";


function App() {
  const [cardClima, setCardClima] = useState("");
  const [isClick, setIsClick] = useState(true);

  const handleClick = () => {
    setIsClick(!isClick);
  };
  const changeToCel = (temp) => {
    return Math.floor(temp - 273.15);
  };

  const changeToFah = (temp) => {
    return Math.floor(((temp - 273.15) * 9) / 5 + 32);
  };
  useEffect(() => {
    const sucess = (position) => {
      const lat = position.coords?.latitude;
      const lon = position.coords?.longitude;

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1175eead7859ece6005e0330755002fb`
        )
        .then((res) => setCardClima(res.data));
    };
    navigator?.geolocation?.getCurrentPosition(sucess);
  }, []);

  if (cardClima?.weather?.[0]?.main === "Drizzle") {
  document.body.style.backgroundImage = `url(https://i.giphy.com/media/xT9GEOg09OuResnZ6g/giphy.gif)`;
} else if (cardClima?.weather?.[0]?.main === "Rain") {
  document.body.style.backgroundImage = `url(https://64.media.tumblr.com/475f62ccd3ff499105a79ac8b67711e2/6025a433cd47175f-a3/s540x810/54d94f3aacbb8ceddb42ecf8df32f0db7c493d9f.gifv)`;
} else if (cardClima?.weather?.[0]?.main === "Snow") {
  document.body.style.backgroundImage = `url(https://c.tenor.com/h7udV_fxDUoAAAAC/snowing-snow.gif)`;
} else if (cardClima?.weather?.[0]?.main === "Thunderstorm") {
  document.body.style.backgroundImage = `url(https://static.onecms.io/wp-content/uploads/sites/35/2017/08/03220738/fb-thunderstorm-asthma.gif)`;
} else if (cardClima?.weather?.[0]?.main === "Clouds") {
  document.body.style.backgroundImage = `url(https://i.picsum.photos/id/1064/4236/2819.jpg?hmac=YygzDG22SIIGfbbuoV45bKoBIUguEtto0Jw_YdPDGyY)`;
} else if (cardClima?.weather?.[0]?.main === "Clear") {
  document.body.style.backgroundImage = `url(https://picsum.photos/id/733/200/300)`;
}else {
  document.body.style.backgroundImage = `url(http://www.spyghana.com/wp-content/uploads/2014/11/sunny-day.jpg)`;
}

  return (
    <div className="App">
      <div className="card-time">
        <div className="container-card">
          <h1>WHEATHER APP</h1>
          <img
            src={`http://openweathermap.org/img/wn/${cardClima?.weather?.[0]?.icon}@2x.png`}
            alt="logo clima"
          />
          <h2 className="title-weather">{cardClima?.weather?.[0]?.main}</h2>

          <h3>
            {cardClima.name}
            <span> {cardClima.sys?.country}</span>
          </h3>
          <h2>
            Wind Speed: <span>{cardClima.wind?.speed}</span> (m/s)
          </h2>
          <h2>
            Clouds: <span>{cardClima.clouds?.all}</span> %
          </h2>
          <h2>
            Pressure: <span>{cardClima.main?.pressure}</span> hPa
          </h2>
          <h2>
            Humidity: <span>{cardClima.main?.humidity}</span> %
          </h2>
          <br />
          <h2 className="view-result">
            {isClick
              ? changeToCel(cardClima.main?.temp)
              : changeToFah(cardClima.main?.temp)}
            <span className="temp-view">{isClick ? "°C" : "°F"}</span>
          </h2>
          <button onClick={handleClick}>
            {isClick ? "TEMPERATURE °C" : "TEMPERATURE °F"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
