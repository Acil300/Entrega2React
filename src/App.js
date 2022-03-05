
import './App.css';
import axios from "axios"
import { useState, useEffect } from "react";


function App() {
  const[cardClima, setCardClima]=useState("");
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

},[]);

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
            {isClick ? "TEMPERATURA °C" : "TEMPERATURA F"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
