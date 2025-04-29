import React from "react";
import parcialmenteNublado from "../assets/parcialmente-nublado.png";
import mayormenteNublado from "../assets/mayormente-nublado-sol.png";
import lluviaLigera from "../assets/lluvialigera.png";
import soleado from "../assets/soleadoFinal.png";
import lluviaPesada from '../assets/lluvia-pesada.png';
import neblina from '../assets/neblina.png';
import lloviznaDia from "../assets/llovizna-dia.png";
import tormentaDia from "../assets/tormenta-dia.png";
import nieve from "../assets/nieve.png";
import bruma from "../assets/bruma.png";
import temAlta from "../assets/temperatura-alta (3).png";
import temBaja from "../assets/baja-temperatura (1).png";
import termometro from "../assets/termometro.png";

const iconStyles = { marginRight: "10px", width: "1.5rem", height: "1.5rem"};
const climaIconStyles = { marginLeft: "10px", width: "3rem", height: "3rem" };

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) =>
    new Intl.DateTimeFormat("es-CL", { weekday: "long" })
      .format(new Date(dateString))
      .replace(/^\w/, c => c.toUpperCase()); // Capitalize the first letter

  const translateDescription = (description) => {
    return description
      .replace('clear sky', 'Despejado')
      .replace('few clouds', 'Nubocidad parcial')
      .replace('scattered clouds', 'Nubocidad parcial')
      .replace('broken clouds', 'Alta nubocidad')
      .replace('shower rain', 'Lluvia intensa y breve')
      // .replace('rain', 'Lluvia')
      .replace('moderate rain', 'Lluvia moderada')
      .replace('light rain', 'Lluvia ligera')
      .replace('thunderstorm', 'Tormenta eléctrica')
      .replace('snow', 'Nieve')
      .replace('light Nieve', 'Nieve')
      .replace('mist', 'Neblina')
      .replace('overcast clouds', 'Alta nubocidad')
      .replace('light intensity drizzle', 'Llovizna ligera')
      .replace('haze', 'Bruma')
      .replace('drizzle', 'Llovizna');
  };

  const renderTemperatureIcon = (description) => {
    if (/(moderate rain|light rain)/i.test(description)) { // Regex to match "moderate rain" or "light rain"
      return <img src={lluviaLigera} alt="Lluvia Ligera" style={climaIconStyles} />;
    } else if (/shower rain|Lluvia intensa/i.test(description)) { // Regex to match "shower rain" or "Lluvia intensa"
      return <img src={lluviaPesada} alt="Lluvia Pesada" style={climaIconStyles} />;
    } else if (/clear sky|Despejado/i.test(description)) { // Regex to match "clear sky" or "Soleado"
      return <img src={soleado} alt="Soleado" style={climaIconStyles} />;
    } else if (/overcast clouds|Alta nubocidad/i.test(description)) { // Regex to match "overcast clouds" or "Alta nubocidad"
      return <img src={mayormenteNublado} alt="Alta Nubocidad" style={climaIconStyles} />;
    } else if (/broken clouds|Alta nubocidad/i.test(description)) { // Regex to match "broken clouds" or "Alta nubocidad"
      return <img src={mayormenteNublado} alt="Alta Nubocidad" style={climaIconStyles} />;
    } else if (/snow|Nieve/i.test(description)) { // Regex to match "snow" or "Nieve"
      return <img src={nieve} alt="Nieve" style={climaIconStyles} />;
    } else if (/mist|Neblina/i.test(description)) { // Regex to match "mist" or "Neblina"
      return <img src={neblina} alt="Neblina" style={climaIconStyles} />;
    } else if (/haze|Bruma/i.test(description)) { // Regex to match "haze" or "Bruma"
      return <img src={bruma} alt="Bruma" style={climaIconStyles} />;
    } else if (/thunderstorm|Tormenta eléctrica/i.test(description)) { // Regex to match "thunderstorm" or "Tormenta eléctrica"
      return <img src={tormentaDia} alt="Tormenta Eléctrica" style={climaIconStyles} />;
    } else if (/llovizna|Llovizna/i.test(description)) { // Regex to match "llovizna" or "Llovizna"
      return <img src={lloviznaDia} alt="Llovizna" style={climaIconStyles} />;
    } else {
      return <img src={parcialmenteNublado} alt="Parcialmente Nublado" style={climaIconStyles} />;
    }
  };

  const groupedByDay = forecastData.list.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0];
    acc[date] = acc[date] || [];
    acc[date].push(item);
    return acc;
  }, {});

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const upcomingDays = Object.keys(groupedByDay)
    .filter(date => new Date(date) >= tomorrow)
    .slice(0, 4);

  return (
    <div
      style={{
        color: "white",
        borderRadius: "1.5rem",
        width: "500px",
        height: "465px",
        padding: "15px",
        fontFamily: "Arial",
        display: "grid",
        gridTemplateColumns: "2fr 2fr",
        gap: "10px",
        marginLeft: "1330px",
      }}
    >
      {upcomingDays.map((date, index) => {
        const dayData = groupedByDay[date];
        const temps = dayData.map(item => item.main.temp);
        const maxTemp = Math.max(...temps);
        const minTemp = Math.min(...temps);
        const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
        const description = dayData[0].weather[0].description;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgb(56, 102, 65)",
              borderRadius: "1.5rem",
              padding: "20px",
              textAlign: "center",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            {renderTemperatureIcon(description)}
            <div style={{ fontSize: "25px", fontWeight: "bold", marginTop: "15px" }}>
              {formatDate(date)}
            </div>
            <div style={{ fontSize: "17px", marginTop: "10px" }}>
              {translateDescription(description)}
            </div>
            <br />
            <div style={{ fontSize: "20px", fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <img src={termometro} alt="Termómetro" style={iconStyles} />
              Prom: {Math.round(avgTemp)}°C
            </div>
            <div style={{ fontSize: "20px", fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <img src={temAlta} alt="Temperatura Alta" style={iconStyles} />
              Max: {Math.round(maxTemp)}°C
            </div>
            <div style={{ fontSize: "20px", fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <img src={temBaja} alt="Temperatura Baja" style={iconStyles} />
              Mín: {Math.round(minTemp)}°C
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FiveDayForecast;