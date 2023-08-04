import axios from "axios";
import Image from "next/image";
import Link from "next/link";


export default async function Autos() {

    const { data } = await axios.get(`${process.env.URL_BACKEND}/autos`);
    const autos = data.autos;

    return (
        <>
        
        <div className="container mx-auto mt-20">
            <h2 className="text-3xl font-bold mb-5">Autos Disponibles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {autos?.map((auto) => (
                <div
                    key={auto._id}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between transition-all duration-300 transform hover:scale-105"
                >
                    <div className="mx-auto mb-4">
                    {auto.imagenes.length > 0 ? (
                        <Image src={auto.imagenes[0]} alt="Imagen del auto" width={300} height={200} className="rounded-lg w-auto h-auto" />
                    ) : (
                        null
                    )}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{auto.nombre}</h3>
                    <p className="text-gray-600 mb-2">{auto.marca} {auto.modelo}</p>
                    <p className="text-gray-800 font-bold">${auto.precio}</p>
                    <Link href={`/informacion/auto/${auto._id}`} className="bg-orange-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-orange-400 transition-colors duration-300 mx-auto">
                    Más información
                    </Link>
                </div>
                ))}
            </div>
        </div>

        
        </>
    );


}