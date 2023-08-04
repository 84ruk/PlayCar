// pages/admin/productos.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { addAbortSignal } from 'stream';
import LoadingBox from '@/app/components/LoadingBox';

const ProductosDashboard = () => {

  const { data: session } = useSession();
  const token = session?.user.jwt;

  const [productos, setProductos] = useState({ autos: [], hospedajes: [], paquetes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if(token){
      const obtenerProductos = async () => {
        try {
          setLoading(true)
          const token = session?.user.jwt;
          const response = await axios.get(`${process.env.URL_BACKEND}/productos`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }); // Endpoint para obtener los productos desde el backend
          setProductos(response.data);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      }
      obtenerProductos();
    }

  }, [token]);

  const handleDeleteProducto = async (productoId, tipo) => {
    try {
      // Construir la URL correcta para enviar la solicitud DELETE al backend
      const url = `${process.env.URL_BACKEND}/${tipo}/${productoId}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Después de eliminar el producto, actualizamos la lista de productos
      setProductos((prevProductos) => {
        return {
          ...prevProductos,
          [tipo]: prevProductos[tipo].filter((producto) => producto._id !== productoId),
        };
      });
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      {/* Aquí puedes renderizar los productos obtenidos */}
    {loading ? <LoadingBox /> : (
    <div>
    <h2 className="text-3xl font-bold mb-5 mt-10">Lista de Autos</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {productos.autos.map((producto) => (
        <div key={producto._id} className="border rounded-md p-4 bg-white shadow-md">
          <h3 className="text-lg font-bold mb-2">{producto.nombre}</h3>
          <p className="text-gray-600 mb-2">Categoría: {producto.categoria}</p>
          <p className="text-gray-800 font-bold">${producto.precio}</p>
          <button
            className="bg-red-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-red-400 transition-colors duration-300"
  onClick={() => handleDeleteProducto(producto._id, 'autos')}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
    <h2 className="text-3xl font-bold mb-5 mt-7">Lista de Hospedajes</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {productos.hospedajes.map((producto) => (
        <div key={producto._id} className="border rounded-md p-4 bg-white shadow-md">
          <h3 className="text-lg font-bold mb-2">{producto.nombre}</h3>
          <p className="text-gray-600 mb-2">Categoría: {producto.categoria}</p>
          <p className="text-gray-800 font-bold">${producto.precio}</p>
          <button
            className="bg-red-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-red-400 transition-colors duration-300"
            onClick={() => handleDeleteProducto(producto._id, 'hospedajes')}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
    <h2 className="text-3xl font-bold mb-5 mt-7">Lista de Paquetes</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {productos.paquetes.map((producto) => (
        <div key={producto._id} className="border rounded-md p-4 bg-white shadow-md">
          <h3 className="text-lg font-bold mb-2">{producto.nombre}</h3>
          <p className="text-gray-600 mb-2">Categoría: {producto.categoria}</p>
          <p className="text-gray-800 font-bold">${producto.precio}</p>
          <button
            className="bg-red-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-red-400 transition-colors duration-300"
            onClick={() => handleDeleteProducto(producto._id, 'paquetes')}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  </div>
      
      
      )}
    </div>
  );
};

export default ProductosDashboard;
