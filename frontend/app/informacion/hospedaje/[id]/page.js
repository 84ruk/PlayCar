import BackButton from '@/app/components/ArrowBack';
import Header from '@/app/components/Header';
import axios from 'axios';
import Image from 'next/image';
import BotonReserva from './botonreserva';

async function getDetalleHospedaje(id){
    const { data } = await axios.get(`http://localhost:8080/api/hospedajes/${id}`); //cache nostore
    const response = data;
  return response;
}

export default async function DetalleHospedaje ({
    params: { id },
}){
  

    const { hospedaje, fechasFormateadas} = await getDetalleHospedaje(id);
    
    
    // Ahora 'fechasFormateadas' contiene las fechas en formato legible para el frontend
    return (
      <div className="container mx-auto mt-10">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Título del hospedaje */}
          <h2 className="text-3xl font-bold text-center mb-4">{hospedaje.nombre}</h2>
          {/* Descripción del hospedaje */}
          <p className="text-gray-600 mb-6 text-center">{hospedaje.descripcion}</p>
  
          <div className="flex flex-col lg:flex-row">
            {/* Imagen del hospedaje */}
            <div className="lg:w-1/2 lg:mr-4 mb-4 lg:mb-0">
              {hospedaje.imagenes.length > 0 ? (
                <Image src={hospedaje.imagenes[0]} alt={hospedaje.nombre} width={400} height={300} className="w-full h-auto rounded-lg shadow-md" />
              ) : (
                <div className="w-full h-40 bg-gray-300 rounded-lg shadow-md"></div>
              )}
            </div>
  
            {/* Detalles del hospedaje */}
            <div className="lg:w-1/2 flex justify-center lg:justify-start">
              <div className="bg-gray-100 rounded-lg p-4 w-full">
                <p className="text-gray-600 mb-2">{`${hospedaje.tipo} - Capacidad: ${hospedaje.capacidad}`}</p>
                <p className={`text-${hospedaje.estado ? 'green' : 'red'}-600 font-bold`}>
                  {hospedaje.estado ? 'Disponible' : 'No disponible'}
                </p>
                <p className="text-gray-700 font-bold mb-2">Precio: ${hospedaje.precio}</p>
                < BotonReserva fechasFormateadas={ fechasFormateadas } id={ id } />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };