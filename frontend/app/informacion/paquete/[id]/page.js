import BackButton from '@/app/components/ArrowBack';
import Header from '@/app/components/Header';
import axios from 'axios';
import Image from 'next/image';

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
    console.log('autos', autos);

    console.log('hospedaje', hospedajes);
   

    return (
    <div className="min-width-container flex flex-col  w-11/12 max-w-7xl min-w-xl bg-white rounded-lg shadow-lg mt-5 p-10 sticky top-10 ">
        <Header />
        <div className="flex items-center mb-4">
        <div className="flex items-center mr-4">
            {/* Coloca aquí la importación del componente de la flecha */}
            {/* <BackButton lastRoute={'/'} /> */}
        </div>
        <h2 className="text-2xl font-bold">{paquete.nombre}</h2>
        </div>
        <p className="text-gray-600 mb-6">{paquete.descripcion}</p>
        <div className="flex justify-between">
        <div className="flex-1 mr-4">
            <div className="mb-6">
            <p className="text-gray-700 font-bold mb-2">Precio: ${paquete.precio}</p>
            <p className="text-gray-700 font-bold">Estado: {paquete.estado ? 'Disponible' : 'No disponible'}</p>
            </div>
            <div>
            <h3 className="text-xl font-bold mt-6 mb-2">Autos incluidos:</h3>
            <ul className="list-disc list-inside">
                {autos.map((auto, index) => (
                <li key={index} className="text-gray-700">{auto.nombre}</li>
                ))}
            </ul>
            </div>
            <div>
            <h3 className="text-xl font-bold mt-6 mb-2">Hospedajes incluidos:</h3>
            <ul className="list-disc list-inside">
                {hospedajes.map((hospedaje, index) => (
                <li key={index} className="text-gray-700">{hospedaje.nombre}</li>
                ))}
            </ul>
            </div>
        </div>
        <div className="flex-1">
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
    </div>

      );
};


