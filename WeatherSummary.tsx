import React from 'react';
import parcialmenteNublado from "../assets/parcialmente-nublado.png";
import lluviaLigera from "../assets/lluvialigera.png";
import soleado from "../assets/soleadoFinal.png";
import neblina from '../assets/neblina.png';
import bruma from "../assets/bruma.png";
import mayormenteNubladoSol from "../assets/mayormente-nublado-sol.png";
import tormentaDia from "../assets/tormenta-dia.png";
import nocheNublado from "../assets/mayormente-nublado.png";
import nocheParcial from "../assets/noche-parcialmente-nublada.png";
import lloviznaDia from "../assets/llovizna-dia.png";
import nocheLluvia from "../assets/noche-de-lluvia.png";
import nocheDespejada from "../assets/noche-despejada.png";
import neblinaNoche from "../assets/neblina-noche.png";
import brumaNoche from "../assets/bruma-noche.png";
import nieve from "../assets/nieve.png";
import tormentaNoche from "../assets/tormenta-noche.png";
import lloviznaNoche from "../assets/llovizna-noche.png";
import lluviaPesadaNoche from "../assets/lluvia-pesada-noche.png";
import lluviaPesada from "../assets/lluvia-pesada.png";

interface HourlyTemperature {
  time: string;
  temp: number;
  description?: string;
}

interface Props {
  hourlyTemperatures: HourlyTemperature[];
  weatherData?: any;
}

const climaIconStyles: React.CSSProperties = {
  width: '53px',
  height: '53px',
  objectFit: 'contain',
};

const WeatherSummary: React.FC<Props> = ({ hourlyTemperatures, weatherData }) => {
  const parseTimeToMinutes = (timeStr: string): number => {
    const [hourMin, modifier] = timeStr.split(' ');
    let [hours, minutes] = hourMin.split(':').map(Number);

    if (modifier?.toLowerCase().includes('p') && hours !== 12) hours += 12;
    if (modifier?.toLowerCase().includes('a') && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const convertTo24HourFormat = (timeStr: string): string => {
    const minutes = parseTimeToMinutes(timeStr);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  const translateDescription = (description: string): string => {
    return description
      .replace('clear sky', 'Despejado' )
      .replace('few clouds', 'Nubocidad parcial')
      .replace('heavy intensity rain', 'Lluvia intensa')
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
      .replace('light intensity shower rain', '')
      .replace('drizzle', 'Llovizna');
  };

  const renderTemperatureIcon = (description: string, time: string) => {
    const translated = translateDescription(description);
    const [hour, minute] = time.split(':').map(Number);
    const totalMinutes = hour * 60 + minute;

    const isNight = totalMinutes >= 1110 || totalMinutes <= 420; // 18:30 - 07:00

    if (isNight) {
      if (translated.includes("Lluvia moderada") || translated.includes("Lluvia ligera")) {
        return <img src={nocheLluvia} alt="Lluvia ligera" style={climaIconStyles} />;
      } else if (translated.includes("Lluvia intensa y breve") || translated.includes("Lluvia intensa")) {
        return <img src={lluviaPesadaNoche} alt="Lluvia intensa" style={climaIconStyles} />;
            } else if (translated.includes("Despejado")) {
        return <img src={nocheDespejada} alt="Noche despejada" style={climaIconStyles} />;
      } else if (translated.includes("Alta nubocidad")) {
        return <img src={nocheNublado} alt="Noche nublada" style={climaIconStyles} />;
      } else if (translated.includes("Neblina")) {
        return <img src={neblinaNoche} alt="Neblina nocturna" style={climaIconStyles} />;
      } else if (translated.includes("Bruma")) {
        return <img src={brumaNoche} alt="Bruma nocturna" style={climaIconStyles} />;
      } else if (translated.includes("Nieve")) {
        return <img src={nieve} alt="Nieve" style={climaIconStyles} />;
      } else if (translated.includes("Tormenta eléctrica")) {
        return <img src={tormentaNoche} alt="Tormenta eléctrica" style={climaIconStyles} />;
      } else if (translated.includes("Llovizna")) {
        return <img src={lloviznaNoche} alt="Llovizna" style={climaIconStyles} />;
      } else if (translated.includes("Nubocidad parcial")) {
        return <img src={nocheParcial} alt="Noche parcialmente nublada" style={climaIconStyles} />;
      } else {
        return <span>No hay información</span>;
      }
    } else {
      if (translated.includes("Lluvia moderada") || translated.includes("Lluvia ligera")) {
        return <img src={lluviaLigera} alt="Lluvia ligera" style={climaIconStyles} />;
      } else if (translated.includes("Lluvia intensa y breve") || translated.includes("Lluvia")) {
        return <img src={lluviaPesada} alt="Lluvia intensa" style={climaIconStyles} />;
      } else if (translated.includes("Despejado")) {
        return <img src={soleado} alt="Soleado" style={climaIconStyles} />;
      } else if (translated.includes("Alta nubocidad")) {
        return <img src={mayormenteNubladoSol} alt="Alta nubocidad" style={climaIconStyles} />;
      } else if (translated.includes("Neblina")) {
        return <img src={neblina} alt="Neblina" style={climaIconStyles} />;
      } else if (translated.includes("Bruma")) {
        return <img src={bruma} alt="Bruma" style={climaIconStyles} />;
      } else if (translated.includes("Nieve")) {
        return <img src={nieve} alt="Nieve" style={climaIconStyles} />;
      } else if (translated.includes("Tormenta eléctrica")) {
        return <img src={tormentaDia} alt="Tormenta eléctrica" style={climaIconStyles} />;
      } else if (translated.includes("Llovizna")) {
        return <img src={lloviznaDia} alt="Llovizna" style={climaIconStyles} />;
      } else if (translated.includes("Nubocidad parcial")) {
        return <img src={parcialmenteNublado} alt="Nubocidad parcial" style={climaIconStyles} />;
      } else if (translated.includes("Lluvia intensa")) {
        return <img src={lluviaPesada} alt="Lluvia intensa" style={climaIconStyles} />;
      } else {
        return <span>No hay información</span>;
      }
    }
  };

  const sortedTemps = [...hourlyTemperatures]
    .filter((entry) => entry.temp !== undefined && entry.temp !== null)
    .sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time))
    .map((entry) => {
      const hour24 = convertTo24HourFormat(entry.time);
      const today = new Date();
      const matchedWeather = weatherData?.hourly?.find((h) => {
        const weatherDate = new Date(h.dt * 1000);
        const weatherHour = weatherDate.getHours();
      
        const isSameDay = weatherDate.getDate() === today.getDate()
          && weatherDate.getMonth() === today.getMonth()
          && weatherDate.getFullYear() === today.getFullYear();
      
        return isSameDay && weatherHour === parseInt(hour24.split(':')[0]);
      });      

      const fallbackDescription = matchedWeather?.weather?.[0]?.description ?? 'clear sky';
      const finalDescription = entry.description || fallbackDescription;

      return {
        ...entry,
        time: hour24,
        description: finalDescription,
      };
    });

  return (
    <div style={{ width: '100%', padding: '10px', margin: '0 auto', marginTop: '25px' }}>
      <div
      style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '11px',
        paddingBottom: '10px',
      }}
      >
      {sortedTemps.map((entry, index) => (
        <div
        key={index}
        style={{
          minWidth: '199px',
          backgroundColor: 'rgb(56, 102, 65)',
          color: '#fff',
          padding: '10px',
          borderRadius: '2rem',
          textAlign: 'center',
          flexShrink: 0,
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
        <div>{renderTemperatureIcon(entry.description, entry.time)}</div>
        <div style={{ fontSize: '1.3rem', marginTop: '4px' }}>
          {translateDescription(entry.description)}
        </div>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', marginTop: '6px' }}>
          {entry.temp}°C
        </div>
        <div style={{ fontSize: '1.3rem', marginTop: '4px' }}>{entry.time}</div>
        </div>
        
      ))}
      </div>
    </div>
  );
};

export default WeatherSummary;
