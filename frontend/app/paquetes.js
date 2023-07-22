import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function Paquetes() {
  const { data } = await axios.get('http://localhost:8080/api/paquetes');
  const paquetes = data.paquetes;

  const getDescripcionConInclusion = (paquete) => {
    let descripcion = paquete.descripcion;
    if (paquete.autos.length > 0) {
      descripcion = `Carro incluido - ${descripcion}`;
    }
    if (paquete.hospedajes.length > 0) {
      descripcion = `Hospedaje incluido - ${descripcion}`;
    }
    return descripcion;
  };

  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-3xl font-bold mb-5">Paquetes Disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paquetes?.map((paquete) => (
          <div
            key={paquete._id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between transition-all duration-300 transform hover:scale-105"
          >
            <div className="mx-auto mb-4">
              {paquete.imagenes.length > 0 ? (
                <Image src={paquete.imagenes[0]} alt="Imagen del paquete" width={300} height={200} className="rounded-lg" />

              ) : (
                null
              )}
            </div>
            <h3 className="text-lg font-bold mb-2">{paquete.nombre}</h3>
            <p className="text-gray-600 mb-4">{getDescripcionConInclusion(paquete)}</p>
            <p className="text-gray-800 font-bold">${paquete.precio}</p>
            <Link href={`/informacion/paquete/${paquete._id}`} className="bg-orange-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-orange-400 transition-colors duration-300 mx-auto">
            Más información
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}