import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import soleado from '../assets/soleadoFinal.png';
import lluviaLigera from '../assets/lluvialigera.png';
import parcialmenteNublado from '../assets/parcialmente-nublado.png';
import mayormenteNubladoSol from "../assets/mayormente-nublado-sol.png";
import nocheParcial from "../assets/noche-parcialmente-nublada.png";
import nocheNublado from "../assets/mayormente-nublado.png";
import nocheLluvia from "../assets/noche-de-lluvia.png";
import nocheDespejada from "../assets/noche-despejada.png";
import lluviaNochePesada from "../assets/lluvia-pesada-noche.png";
import bruma from "../assets/bruma.png";
import brumaNoche from "../assets/bruma-noche.png";
import neblinaNoche from "../assets/neblina-noche.png";
import nieve from "../assets/nieve.png";
import tormentaNoche from "../assets/tormenta-noche.png";
import tormentaDia from "../assets/tormenta-dia.png";
import lloviznaNoche from "../assets/llovizna-noche.png";
import nieblaNoche from "../assets/niebla-noche.png";
import lloviznaDia from "../assets/llovizna-dia.png";
// import nublado from '../assets/nublado.png';
import niebla from '../assets/niebla.png';
import lluviaPesada from '../assets/lluvia-pesada.png';
import neblina from '../assets/neblina.png';
import temAlta from '../assets/temperatura-alta (3).png';
import temBaja from '../assets/baja-temperatura (1).png';
import { Button } from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';

const MainWeatherCard = ({ weatherData, onUpdateWeather, maxTemp, minTemp, nextPop, nextForecastHour }) => {
  const temperatureCelsius = weatherData?.main?.temp ? Math.round(weatherData.main.temp) : "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description
    ? weatherData.weather[0].description
      .replace('clear sky', 'Despejado')
      .replace('few clouds', 'Nubocidad parcial')
      .replace('scattered clouds', 'Nubocidad parcial')
      .replace('broken clouds', 'Alta nubocidad')
      .replace('shower rain', 'Lluvia intensa y breve')
      .replace('rain', 'Lluvia')
      .replace('moderate Lluvia', 'Lluvia moderada')
      .replace('thunderstorm', 'Tormenta eléctrica')
      .replace('snow', 'Nieve')
      .replace('light Nieve', 'Nieve')
      .replace('mist', 'Neblina')
      .replace('overcast clouds', 'Alta nubocidad')
      .replace('light Lluvia', 'Lluvia ligera')
      .replace('light intensity drizzle', 'Llovizna ligera')
      .replace('haze', 'Bruma')
      .replace('light intensity shower rain', '')
      .replace('drizzle', 'Llovizna')
      .replace('fog', 'Niebla')
      .replace('heavy intensity rain', 'Lluvia intensa')
    : "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country === "CL" ? "Chile" : "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('es-CL', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
    }).replace(/^\w/, (c) => c.toUpperCase())
    : "Date not available";
  const renderTemperatureIcon = () => {
    const isNight = (() => {
      const currentHour = new Date().getHours();
      return currentHour >= 18 || currentHour <= 6; // Nighttime: 6 PM to 6 AM
    })();

    if (isNight) {
      if (weatherDescription.includes("Lluvia moderada") || weatherDescription.includes("Lluvia ligera")) {
        return <img src={nocheLluvia} alt="Lluvia ligera" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Lluvia intensa y breve") || weatherDescription.includes("Lluvia")) {
        return <img src={lluviaNochePesada} alt="Lluvia intensa" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Despejado")) {
        return <img src={nocheDespejada} alt="Noche despejada" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Alta nubocidad")) {
        return <img src={nocheNublado} alt="Noche nublada" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Neblina")) {
        return <img src={neblinaNoche} alt="Neblina nocturna" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Bruma")) {
        return <img src={brumaNoche} alt="Bruma nocturna" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Nieve")) {
        return <img src={nieve} alt="Nieve" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Tormenta eléctrica")) {
        return <img src={tormentaNoche} alt="Tormenta eléctrica" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Lloviznna")) {
        return <img src={lloviznaNoche} alt="Llovizna" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Nubocidad parcial")) {
        return <img src={nocheParcial} alt="Noche parcialmente nublada" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Niebla")) {
        return <img src={nieblaNoche} alt="Niebla" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else {
        return <span>No hay información</span>;
      }
    } else {
      if (weatherDescription.includes("Lluvia moderada") || weatherDescription.includes("Lluvia ligera")) {
        return <img src={lluviaLigera} alt="Lluvia ligera" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Lluvia intensa y breve") || weatherDescription.includes("Lluvia")) {
        return <img src={lluviaPesada} alt="Lluvia intensa" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Despejado")) {
        return <img src={soleado} alt="Soleado" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Alta nubocidad")) {
        return <img src={mayormenteNubladoSol} alt="Alta nubocidad" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Neblina")) {
        return <img src={neblina} alt="Neblina" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Bruma")) {
        return <img src={bruma} alt="Bruma" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Nieve")) {
        return <img src={nieve} alt="Nieve" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Tormenta eléctrica")) {
        return <img src={tormentaDia} alt="Tormenta eléctrica" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Lloviznna")) {
        return <img src={lloviznaDia} alt="Llovizna" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Nubocidad parcial")) {
        return <img src={parcialmenteNublado} alt="Nubocidad parcial" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Niebla")) {
        return <img src={niebla} alt="Niebla" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else if (weatherDescription.includes("Lluvia intensa")) {
        return <img src={lluviaPesada} alt="Lluvia intensa" style={{ marginLeft: '10px', width: '8rem', height: '8rem' }} />;
      } else {
        return <span style={{ fontSize: '19px', marginLeft: '20px' }}>No hay información</span>;
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'rgb(56, 102, 65)',
        color: 'white',
        borderRadius: '1.5rem',
        width: '340px',
        height: '425px',
        padding: '42px',
        marginTop: '15px',
        fontFamily: 'Arial',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0px 8px 15px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '70px' }}>
        <span>Ahora</span>
        <Button onClick={onUpdateWeather}>
          <AutorenewIcon
            style={{
              fontSize: '45px',
              marginRight: '55px',
              color: 'rgb(122, 100, 0)',
              backgroundColor: 'white',
              borderRadius: '3rem',
            }}
          />
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '95px', fontWeight: 'bold' }}>
        {temperatureCelsius}°C
        {renderTemperatureIcon()}
      </div>
      <div style={{ fontSize: '35px', marginTop: '12px', fontWeight: '50' }}> {weatherDescription}</div>
      <div style={{ marginTop: '2rem', fontSize: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CalendarMonthIcon />
          {currentDate}
        </div>
        <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon />
          {cityName}, {countryName}
        </div>
      </div>
      <div
        style={{
          marginTop: '20px',
          fontSize: '20px',
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img
            src={temAlta}
            alt="temAlta"
            style={{ marginRight: '15px', marginBottom: '-4px', width: '35px', height: '35px' }}
          />
          Max: {maxTemp}°C
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img
            src={temBaja}
            alt="temBaja"
            style={{ marginRight: '10px', marginBottom: '-4px', width: '35px', height: '35px' }}
          />
          Min: {minTemp}°C
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginLeft: '15px' }}>
          <img
            src={lluviaLigera}
            alt="Probabilidad de lluvia"
            style={{ marginRight: '10px', marginBottom: '-4px', width: '35px', height: '35px' }}
          />
          Lluvia: {nextPop !== null ? Math.round(nextPop * 100) : 0}%
          {nextForecastHour && (
            <span style={{ marginLeft: '8px', fontSize: '14px', color: 'yellow' }}>
              ({nextForecastHour} hrs)
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
export default MainWeatherCard;