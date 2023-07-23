'use client'
import { useState } from 'react';
import DatePicker from 'react-datepicker';

const BotonReserva = () => {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const handleFechaInicioChange = (date) => {
    // Aquí puedes manejar el cambio de la fecha de inicio
    setFechaInicio(date);
  };

  const handleFechaFinChange = (date) => {
    // Aquí puedes manejar el cambio de la fecha de fin
    setFechaFin(date);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-center mb-4">Selecciona las fechas de reservación</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block font-bold mb-2">Fecha de inicio</label>
            <DatePicker
              selected={fechaInicio}
              onChange={handleFechaInicioChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">Fecha de fin</label>
            <DatePicker
              selected={fechaFin}
              onChange={handleFechaFinChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {fechaInicio && fechaFin && new Date(fechaFin) < new Date(fechaInicio) && (
          <p className="text-red-600">La fecha de fin no puede ser anterior a la fecha de inicio.</p>
        )}
        {/* Puedes agregar más contenido aquí, como un botón para continuar con la reservación */}
      </div>
    </div>
  );
};
export default BotonReserva;
