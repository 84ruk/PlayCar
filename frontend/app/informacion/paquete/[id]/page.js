import BackButton from '@/app/components/ArrowBack';
import Header from '@/app/components/Header';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import BotonReserva from './botonreserva';

async function getDetallePaquete(id){
    const { data } = await axios.get(`${process.env.URL_BACKEND}/paquetes/${id}`); //cache nostore
    return data;
}

export default async function DetallePaquete ({
    params: { id },
  }){

    const { paquete, fechasFormateadas} = await getDetallePaquete(id);
    
    const { autos , hospedajes, nombre, descripcion } = paquete;
    

    return (
      <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">

        {/* Título del paquete */}
        <h2 className="text-3xl font-bold mb-4">{nombre}</h2>

        {/* Imagen del paquete */}
        <div className="md:w-3/4 mx-auto mb-6 rounded-lg overflow-hidden shadow-md max-w-lg">
          {paquete.imagenes.length === 0 ? (
            <Image
              src="/URL_OF_FALLBACK_IMAGE"
              alt="Fallback Image"
              width={500}
              height={500}
            />
          ) : (
            paquete.imagenes.map((imagen, index) => (
              <Image
                key={index}
                src={imagen}
                alt={`Imagen ${index + 1}`}
                width={500}
                height={500}
                priority
                className='max-w-lg mx-auto w-auto h-auto'
              />
            ))
          )}
        </div>

        {/* Descripción del paquete */}
        <p className="text-gray-600 mb-6">{descripcion}</p>

        {/* Sección de autos y hospedajes incluidos */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Autos incluidos */}
          {paquete.autos.length > 0 && (
            <div className="mt-5">
              <h3 className="text-xl font-bold mb-2">Autos incluidos:</h3>
              {paquete.autos.map((auto) => (
                 <div key={auto._id} className="bg-gray-100 rounded-lg p-4 mb-4">
                 {auto?.imagenes ? (
                   <Image
                     src={auto.imagenes[0]}
                     alt={auto.nombre}
                     width={300}
                     height={200}
                     className="w-full h-auto mb-4 rounded-lg shadow-md "
                   />
                 ) : (
                   <div className="w-full h-40 bg-gray-300 mb-4 rounded-lg shadow-md"></div>
                 )}
                 <div className="flex flex-col justify-between">
                   <div>
                     <p className="text-gray-700 font-bold mb-2">{auto.nombre}</p>
                     <p className="text-gray-600 mb-2">{`${auto.marca} ${auto.modelo}`}</p>
                     <p className={`text-${auto.estado ? 'green' : 'red'}-600 font-bold`}>
                       {auto.estado ? 'Disponible' : 'No disponible'}
                     </p>
                   </div>
                   <div className="flex justify-end">
                     <Link
                       href={`/informacion/auto/${auto._id}`}
                       className="py-2 px-4 bg-orange-500 text-white text-base shadow-md hover:bg-orange-400 transition-colors duration-300 hover:shadow-none rounded-lg"
                     >
                       Ver Detalles de Auto
                     </Link>
                   </div>
                 </div>
               </div>
              ))}
            </div>
          )}

          {/* Hospedajes incluidos */}
          {paquete.hospedajes.length > 0 && (
            <div>
              <Link href="/informacion/Kaxtik" className="text-xs text-green-500 mb-1">by Kaxtik</Link>
              <h3 className="text-xl font-bold text-blue-500 mb-2">Hospedajes incluidos:</h3>
              {paquete.hospedajes.map((hospedaje) => (
                                <div key={hospedaje._id} className="bg-gray-100 rounded-lg p-4 mb-4">
                                {hospedaje.imagenes.length > 0 ? (
                                  <Image
                                    src={hospedaje.imagenes[0]}
                                    alt={hospedaje.nombre}
                                    width={300}
                                    height={200}
                                    className="w-full h-auto mb-4 rounded-lg shadow-md "
                                  />
                                ) : (
                                  <div className="w-full h-40 bg-gray-300 mb-4 rounded-lg shadow-md"></div>
                                )}
                                <div className="flex flex-col justify-between">
                                  <div>
                                    <p className="text-gray-700 font-bold mb-2">{hospedaje.nombre}</p>
                                    <p className="text-gray-600 mb-2">{`${hospedaje.tipo} - Capacidad: ${hospedaje.capacidad}`}</p>
                                    <p className={`text-${hospedaje.estado ? 'green' : 'red'}-600 font-bold`}>
                                      {hospedaje.estado ? 'Disponible' : 'No disponible'}
                                    </p>
                                  </div>
                                  <div className="flex justify-end">
                                    <Link
                                      href={`/informacion/hospedaje/${hospedaje._id}`}
                                      className=" py-2 px-4 bg-orange-500 text-white  text-base shadow-md hover:bg-orange-400 transition-colors duration-300 hover:shadow-none rounded-lg"
                                    >
                                      Ver Detalles de Hospedaje
                                    </Link>
                                  </div>
                                </div>
                              </div>
              ))}
            </div>
          )}
        </div>

        {/* Botón de reserva */}
        <div className="flex justify-center mt-6">
            <BotonReserva fechasFormateadas={ fechasFormateadas } autoReservado={ autos } hospedajeReservado={ hospedajes } id={ id }  />
          </div>

      </div>
    </div>
  );
};