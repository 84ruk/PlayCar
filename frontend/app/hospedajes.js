import axios from "axios";

import Image from "next/image";
import Link from "next/link";


export default async function Hospedajes() {

    const { data } = await axios.get('http://localhost:8080/api/hospedajes');
    const hospedajes = data.hospedajes;


    return (
        <>
        
        <div className="container mx-auto mt-20">
            <h2 className="text-3xl font-bold mb-5">Hospedajes Disponibles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {hospedajes?.map((hospedaje) => (
                    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between transition-all duration-300 transform hover:scale-105">
                    {/* Imagen del hospedaje */}
                    <div className="mx-auto mb-4">
                    {hospedaje.imagenes.length > 0 ? (
                        <Image src={hospedaje.imagenes[0]} alt={hospedaje.nombre} width={400} height={300} className="w-full h-auto rounded-lg shadow-md" />
                    ) : (
                        <div className="w-full h-40 bg-gray-300 rounded-lg shadow-md"></div>
                    )}
                    </div>

                    {/* Detalles del hospedaje */}
                    <h3 className="text-lg font-bold mb-2">{hospedaje.nombre}</h3>
                    <p className="text-gray-600 mb-2">{`${hospedaje.tipo} - Habitaciones: ${hospedaje.habitaciones} - Capacidad: ${hospedaje.capacidad}`}</p>
                    <p className={`text-${hospedaje.estado ? 'green' : 'red'}-600 font-bold`}>
                    {hospedaje.estado ? 'Disponible' : 'No disponible'}
                    </p>
                    <p className="text-gray-700 font-bold mb-2">Precio: ${hospedaje.precio}</p>

                    {/* Botón para ver más detalles del hospedaje */}
                    <Link href={`/informacion/hospedaje/${hospedaje._id}`} className="bg-orange-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-orange-400 transition-colors duration-300 mx-auto">
                    Ver detalles
                    </Link>
                </div>
                ))}
            </div>
        </div>

        
        </>
    );


}