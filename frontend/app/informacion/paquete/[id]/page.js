import BackButton from '@/app/components/ArrowBack';
import Header from '@/app/components/Header';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

async function getDetallePaquete(id){
    const { data } = await axios.get(`http://localhost:8080/api/paquetes/${id}`); //cache nostore
    const paquete = data.paquete;
  return paquete;
}

export default async function DetallePaquete ({
    params: { id },
  }){

    const paquete = await getDetallePaquete(id);
    const { autos , hospedajes } = paquete;
    console.log('paquete', paquete);

    console.log('hospedaje', hospedajes);
   

    return (
      <div className="container mx-auto mt-10">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Título y Descripción del paquete */}
          <h2 className="text-3xl font-bold mb-4">{paquete.nombre}</h2>
          <p className="text-gray-600 mb-6">{paquete.descripcion}</p>
  
          {/* Detalles del paquete */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Detalles de Autos */}
            {paquete.autos.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-2">Autos incluidos:</h3>
                {paquete.autos.map((auto) => (
                  <div key={auto._id} className="bg-gray-100 rounded-lg p-4 mb-4">
  {auto.imagen ? (
    <Image src={auto.imagen} alt={auto.nombre} width={300} height={200} className="w-full h-auto mb-4 rounded-lg shadow-md" />
  ) : (
    <div className="w-full h-40 bg-gray-300 mb-4 rounded-lg shadow-md"></div>
  )}
  <div className="flex flex-col justify-between">
    <div>
      <p className="text-gray-700 font-bold mb-2">{auto.nombre}</p>
      <p className="text-gray-600 mb-2">{`${auto.marca} ${auto.modelo}`}</p>
      <p className={`text-${auto.estado ? 'green' : 'red'}-600 font-bold`}>{auto.estado ? 'Disponible' : 'No disponible'}</p>
    </div>
    <div className="flex justify-end">
      <Link href={`/informacion/auto/${auto._id}`} className="py-2 px-4 bg-orange-500 text-white text-base shadow-md hover:bg-orange-400 transition-colors duration-300 hover:shadow-none rounded-lg">
          Ver Detalles de Auto
      </Link>
    </div>
  </div>
</div>

                ))}
              </div>
            )}
  
            {/* Detalles de Hospedajes */}
            {paquete.hospedajes.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-2">Hospedajes incluidos:</h3>
                {paquete.hospedajes.map((hospedaje) => (
                 <div key={hospedaje._id} className="bg-gray-100 rounded-lg p-4 mb-4">
                 {hospedaje.imagenes.length > 0 ? (
                   <Image src={hospedaje.imagenes[0]} alt={hospedaje.nombre} width={300} height={200} className="w-full h-auto mb-4 rounded-lg shadow-md" />
                 ) : (
                   <div className="w-full h-40 bg-gray-300 mb-4 rounded-lg shadow-md"></div>
                 )}
                 <div className="flex flex-col justify-between">
                   <div>
                     <p className="text-gray-700 font-bold mb-2">{hospedaje.nombre}</p>
                     <p className="text-gray-600 mb-2">{`${hospedaje.tipo} - Capacidad: ${hospedaje.capacidad}`}</p>
                     <p className={`text-${hospedaje.estado ? 'green' : 'red'}-600 font-bold`}>{hospedaje.estado ? 'Disponible' : 'No disponible'}</p>
                   </div>
                   <div className="flex justify-end">
                     <Link href={`/informacion/hospedaje/${hospedaje._id}`} className=" py-2 px-4 bg-orange-500 text-white  text-base shadow-md hover:bg-orange-400 transition-colors duration-300 hover:shadow-none rounded-lg">
                       Ver Detalles de Hospedaje
                     </Link>
                   </div>
                 </div>
               </div>
               
                ))}
              </div>
            )}
          </div>
  
          {/* Imágenes del paquete */}
          <div className="mb-6">
            {paquete.imagenes.length === 0 ? (
              <Image src="/URL_OF_FALLBACK_IMAGE" alt="Fallback Image" width={400} height={400} className="w-full h-auto rounded-lg shadow-md" />
            ) : (
              paquete.imagenes.map((imagen, index) => (
                <Image key={index} src={imagen} alt={`Imagen ${index + 1}`} width={400} height={400} priority className="w-full h-auto mb-4 rounded-lg shadow-md" />
              ))
            )}
          </div>
        </div>
      </div>
    );
};

/* btoon diseno rounded-sm bg-orange-500 text-white font-bold text-base shadow-md hover:bg-orange-400 transition-colors duration-300 hover:shadow-none */