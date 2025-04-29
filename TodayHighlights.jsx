import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "../../src/components/Highlightbox";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import soleado from '../assets/soleadoFinal.png';
import luna from '../assets/luna-creciente.png';

const TodayHighlights = ({ weatherData, airQualityData }) => {
    const { main, wind, visibility, sys } = weatherData;
    const airQualityIndex = airQualityData?.main?.aqi; // Accessing aqi from airQualityData.main
    // const { co, no, no2, o3 } = airQualityData?.components || {};

    const renderAirQualityDescription = (aqi) => {
        switch (aqi) {
            case 1:
                return (
                    <span style={{ backgroundColor: "#024aca", padding: "2px 6px", borderRadius: "4px", color: "white" }}>
                        Bueno
                    </span>
                )
            case 2:
                return (
                    <span style={{ backgroundColor: "#3e7a85", padding: "2px 6px", borderRadius: "4px", color: "white" }}>
                        Estable
                    </span>
                )
            case 3:
                return (
                    <span style={{ backgroundColor: "#886806", padding: "2px 6px", borderRadius: "4px", color: "white", marginLeft: '-35px' }}>
                        Moderado
                    </span>
                )
            case 4:
                return "Poor";
            case 5:
                return "Very Poor";
            default:
                return "Unknown";
        }
    };

    const highlights = [
        {
            title: "Humedad",
            value: `${main.humidity}%`,
            Icon: InvertColorsIcon
        },
        {
            title: "Presión",
            value: `${main.pressure} hPa`,
            Icon: CompressIcon,
        },
        {
            title: "Visibilidad",
            value: `${visibility / 1000} km`,
            Icon: VisibilityIcon,
        },
        {
            title: "Sensación térmica",
            value: `${main.feels_like}°C`,
            Icon: DeviceThermostatIcon,
        },
    ];

    return (
        <div
            style={{
                //backgroundColor: "#62422b",
                color: "Black",
                width: "840px",
                borderRadius: "1.5rem",
                padding: "30px",
                fontFamily: "Arial",
                marginLeft: "-495px",
                marginTop: "-50px",
            }}
        >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>Comportamiento del clima: </div>
            <div
                style={{
                    display: "flex",
                    gap: "18px",
                }}
            >
                <div
                    style={{
                        backgroundColor: "rgb(56, 102, 65)",
                        color: "white",
                        padding: "1rem",
                        borderRadius: "1.5rem",
                        marginTop: "11px",
                        width: "370px",
                        fontFamily: "Arial",
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "22px",
                                fontFamily: "Arial",
                                marginBottom: "-20px",
                                // fontWeight: "700",
                            }}
                        >
                            <p style={{ fontSize: '30px' }}>Calidad del aire</p>
                            <div
                                style={{
                                    marginTop: "2.3rem",
                                    fontSize: "26px",
                                    // fontWeight: "700",
                                    // backgroundColor: "#886806",
                                    height: "20px",
                                    width: "105px",
                                    borderRadius: "6px",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    fontFamily: "Arial"
                                }}
                            >
                                {renderAirQualityDescription(airQualityIndex)}
                            </div>
                        </div>
                        <div>
                            <AirIcon style={{ fontSize: "80px" }} />
                            <div
                                style={{
                                    marginTop: "-1rem",
                                    display: "grid",
                                    gridTemplateColumns: "repeat(4, 1fr)",
                                    gap: "10px"
                                }}
                            >
                                <div style={{ fontSize: '35px', width: '350px', marginBottom: "-30px" }}>
                                    <p>Velocidad del viento</p>
                                    <p>{(wind.speed * 3.6).toFixed(2)} km/hr</p>
                                </div>
                                {/* <div>
                                    <p style={{ fontWeight: "bold" }}>NO</p>
                                    <p>{no} µg/m³</p>
                                </div> */}
                                {/* <div>
                                    <p style={{ fontWeight: "bold" }}>NO₂</p>
                                    <p>{no2} µg/m³</p>
                                </div> */}
                                {/* <div>
                                    <p style={{ fontWeight: "bold" }}>O₃</p>
                                    <p>{o3} µg/m³</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        backgroundColor: "rgb(56, 102, 65)",
                        color: "white",
                        padding: "1rem",
                        borderRadius: "1.5rem",
                        marginTop: "11px",
                        width: "385px",
                        fontFamily: "Arial",
                    }}
                >
                    <div style={{ fontSize: "30px", fontFamily: "Arial", color: "white", textAlign: "center" }}>
                        <p>Amanecer y atardecer</p>
                        <div style={{ display: "flex", justifyContent: "space-between", padding: '10px' }}>
                            <div>
                                <img src={soleado} alt="soleado" style={{ marginLeft: '15px', width: '8rem', height: '8rem' }} />
                                <p style={{ fontSize: "35px", marginRight: '-25px' }}>
                                    {new Date(sys.sunrise * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })} AM
                                </p>
                            </div>
                            <div>
                                <img src={luna} alt="luna" style={{ marginLeft: '5px', width: '8rem', height: '8rem' }} />
                                <p style={{ fontSize: "35px", marginRight: '10px' }}>
                                    {new Date(sys.sunset * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })} PM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "4px",
                    marginTop: "10px",
                }}
            >
                {highlights.map((highlight, index) => (
                    <HighlightBox
                        key={index}
                        title={highlight.title}
                        value={highlight.value}
                        Icon={highlight.Icon}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodayHighlights;