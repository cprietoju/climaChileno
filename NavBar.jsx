import { FilterDrama, GpsFixed, Search } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const NavBar = ({ onSearch, onCurrentLocationSearch }) => {
    const [searchCity, setSearchCity] = useState('')
    
    const handleSearchClick = () => {
        if (searchCity.trim() !== '') {
            onSearch(searchCity)
        }
    }

    const handleCurrentLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setSearchCity(''); // Limpiamos el campo de búsqueda
                    onCurrentLocationSearch({ latitude, longitude }); // Llamamos a la función del componente padre
                },
                (error) => {
                    console.error("Error obtaining location:", error);
                    alert("No se pudo obtener la ubicación actual.");
                }
            );
        } else {
            alert("La geolocalización no es compatible con este navegador.");
        }
    };

    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '30px',
            padding: '10px',
            paddingRight: '30px',
            paddingLeft: '30px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <FilterDrama sx={{ fontSize: 38, color: 'grey' }} />
                <h1 style={{ fontFamily: 'Arial' }}>Clima</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <TextField
                    style={{
                        width: '20rem',
                        marginLeft: '10px'
                    }}
                    variant='outlined'
                    id="outlined-basic"
                    
                    placeholder="Buscar ciudad..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    size='large'
                    InputProps={{
                        style: {
                            borderRadius: '2rem',
                            backgroundColor: 'white',
                        },
                        startAdornment: (
                            <Search sx={{
                                color: 'rgb(56, 102, 65)',
                                marginRight: '8px'
                            }} />
                        )
                    }}
                />
                <Button sx={{
                    borderRadius: '2rem',
                    backgroundColor: 'rgb(56, 102, 65)',
                    color: 'white',
                    padding: '1rem 1rem',
                    marginLeft: '10px'
                }}
                    onClick={handleSearchClick}
                >
                    Buscar
                </Button>
            </div>
            <div>
                <Button sx={{
                    borderRadius: '2rem',
                    backgroundColor: 'rgb(56, 102, 65)',
                    color: 'white',
                    padding: '1rem 1rem',
                    marginLeft: '10px'
                }}
                    onClick={handleCurrentLocationClick}
                >
                    <GpsFixed sx={{
                        color: 'white',
                        marginRight: '8px'
                    }} /> Ubicación actual
                </Button>
            </div>
        </nav>
    )
}

export default NavBar