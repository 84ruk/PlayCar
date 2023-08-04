'use client'
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isWithinInterval, addDays, format  } from 'date-fns';
import axios from 'axios';
import { useSession } from 'next-auth/react'; 
import { useAppContext } from '../../../context/appContextProvider';
import Success from '../../../components/Success';
import Error from '../../../components/Error';

const BotonReserva = ({ fechasFormateadas, id }) => {

  const { data: session, status } = useSession();
  const { loading, setLoading, setErrorMessages, errorMessages, setSuccessMessages, successMessages} = useAppContext();
  const clienteId = session?.user?.uid 
  const token = session?.user.jwt;

  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleFechaInicioChange = (date) => {
    setFechaInicio(date);
  };

  const handleFechaFinChange = (date) => {
    setFechaFin(date);
  };

  const isFechaReservada = (date) => {
    return fechasFormateadas.some((rango) => {
      const fechaInicio = new Date(rango.fechaInicio);
      const fechaFin = new Date(rango.fechaFin);
      return isWithinInterval(new Date(date), { start: fechaInicio, end: fechaFin });
    });
  };

  const isDayDisabled = (date) => {
    const today = new Date();
    return date < today || !isFechaReservada(date);
  };

   const getMinFechaFin = () => {
    if (fechaInicio) {
      return addDays(new Date(fechaInicio), 1);
    }
    return null;
  };


  const handleReservar = async (e) => {
    setErrorMessages([])
    setSuccessMessages([])

    e.preventDefault();
    if (!fechaInicio || !fechaFin) {
      setErrorMessages(['Por favor selecciona un rango de fechas válido.']);
      return;
    }
  
    if (new Date(fechaFin) < new Date(fechaInicio)) {
      setErrorMessages(['La fecha de fin no puede ser anterior a la fecha de inicio.']);
      return;
    }
  
    // Validar que clienteId e id tengan valores válidos antes de enviar la solicitud
  
    try {
      const fechaInicioFormateada = fechaInicio.toISOString().split('T')[0];
      const fechaFinFormateada = fechaFin.toISOString().split('T')[0];
  
      const response = await axios.post(
        `${process.env.URL_BACKEND}/reservaciones/hospedaje`,
        {
          cliente: clienteId,
          fechaInicio: fechaInicioFormateada,
          fechaFin: fechaFinFormateada,
          hospedajeReservado: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Cambiar a 'application/json' si el backend espera este formato
          },
        }
      );
      
  
      setSuccessMessages([response.data.message]); 
  
    } catch (error) {
      setErrorMessages(error.response?.data)
      
    }
  
  };
  
  useEffect(() => {

    setErrorMessages([])
    setSuccessMessages([])
  
  
    
  }, [])
  

  return (
    <div className="container mx-auto ">
      <div className="bg-white rounded-lg shadow-md px-3 py-1">
      {errorMessages?.message && <Error messages={errorMessages} />}
      {successMessages?.map((message, index) => (
          <Success key={index} messages={message} />
        ))}
        <h2 className="text-3xl font-bold text-center mb-4 mt-4">Selecciona las fechas de reservación</h2>
        <div className=" grid grid-cols-1 w-full gap-6 md:grid-cols-2">
          <div>
            <label className="block font-bold mb-2">Fecha de inicio</label>
            <DatePicker
              selected={fechaInicio}
              onChange={handleFechaInicioChange}
              className="w-full px-4 py-2 rounded-lg focus:outline-none bg-gray-100 text-gray-800"
              filterDate={isDayDisabled}
              minDate={Date.now()}
            />
          </div>
          <div className=''>
            <label className="block font-bold mb-2">Fecha de fin</label>
            <DatePicker
              selected={fechaFin}
              onChange={handleFechaFinChange}
              className="w-full px-4 py-2 rounded-lg focus:outline-none bg-gray-100 text-gray-800"
              filterDate={isDayDisabled}
              minDate={getMinFechaFin()}
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="px-5 py-2 rounded-md bg-orange-500 text-white font-bold text-base shadow-md hover:bg-orange-400 transition-colors duration-300"
            onClick={handleReservar}
            disabled={!fechaInicio || !fechaFin}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotonReserva;