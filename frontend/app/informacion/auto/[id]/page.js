import BackButton from '@/app/components/ArrowBack';
import Header from '@/app/components/Header';
import axios from 'axios';
import Image from 'next/image';
import BotonReserva from './botonreserva';

async function getDetalleAuto(id){
    const { data } = await axios.get(`${process.env.URL_BACKEND}/autos/${id}`); //cache nostore
    const response = data;
  return response;
}

export default async function DetalleAuto ({
    params: { id },
}){
  

    const { auto, fechasFormateadas} = await getDetalleAuto(id);
    
    // Ahora 'fechasFormateadas' contiene las fechas en formato legible para el frontend
    return (
        <div className="container mx-auto mt-10">
      <div className="container mx-auto mt-10">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Título del auto */}
        <h2 className="text-3xl font-bold text-center mb-4">{auto.nombre}</h2>
        {/* Descripción del auto */}
        <p className="text-gray-600 mb-6 text-center">{auto.descripcion}</p>

        <div className="flex flex-col lg:flex-row">
          {/* Imagen del auto */}
          <div className="lg:w-1/2 lg:mr-4 mb-4 lg:mb-0">
            {auto.imagenes.length > 0 ? (
              <Image src={auto.imagenes[0]} alt={auto.nombre} width={400} height={300} className="rounded-lg shadow-md" />
            ) : (
              <div className="w-full h-40 bg-gray-300 rounded-lg shadow-md"></div>
            )}
          </div>

          {/* Detalles del auto */}
          <div className="lg:w-1/2 flex justify-center lg:justify-start">
            <div className="bg-gray-100 rounded-lg p-4 w-full">
              <p className="text-gray-600 mb-2">{`${auto.marca} - Modelo: ${auto.modelo}`}</p>
              <p className={`text-${auto.estado ? 'green' : 'red'}-600 font-bold`}>
                {auto.estado ? 'Disponible' : 'No disponible'}
              </p>
              <p className="text-gray-700 font-bold mb-2">Precio: ${auto.precio}</p>
              <BotonReserva fechasFormateadas={fechasFormateadas} id={id} autoReservado={auto} />
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
    );
  };