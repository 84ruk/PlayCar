'use client'
import { useEffect, useState } from 'react';
import ReservacionItem from './reservacion-item';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '@/app/components/Loader';
import { useAppContext } from '@/app/context/appContextProvider';

const ReservacionesList = () => {

    const { loading, setLoading, setErrorMessages, errorMessages, successMessages, setSuccessMessages } = useAppContext();

    const { data: session } = useSession();
    const token = session?.user.jwt;

  const [reservaciones, setReservaciones] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    // Verificar que el token existe antes de hacer la petición
    if (token) {
        setLoading(true)
      const obtenerReservaciones = async () => {
        setLoading(true)
        try {
          // Realizar la petición al backend para obtener las reservaciones
          const { data } = await axios(`http://localhost:8080/api/reservaciones?page=${currentPage}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
            setReservaciones(data.reservaciones);
            setTotalPages(data.totalPages);
        } catch (error) {
          console.log(error);
        }
        setLoading(false)
      };

      obtenerReservaciones();
    }
  }, [currentPage, token]);

  const handleFilter = async (filter) => {
    setCurrentPage(1); // Reiniciar la página actual al aplicar un filtro
    try {
      const { data } = await axios.get(`http://localhost:8080/api/reservaciones`, {
        params: {
          page: 1,
          filter, // Envía el filtro seleccionado al backend
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        setReservaciones(data.reservaciones);
        setTotalPages(data.totalPages);
    
    } catch (error) {
      console.error(error.response.data);
    }
  };


  return (
    <>
    {loading ? <LoadingSpinner /> /* AQUI IRA LOADING */ : null}
    <div className="max-w-lg mx-auto">
    <div className="space-x-2 md:space-x-4 mb-4">
      {/* Botones de filtro */}
      <button
        className="px-2 md:px-3 py-1 bg-blue-500 text-white rounded-md transition-colors duration-300 hover:bg-blue-400"
        onClick={() => handleFilter('hoy')}
      >
        Hoy
      </button>
      <button
        className="px-2 md:px-3 py-1 bg-blue-500 text-white rounded-md transition-colors duration-300 hover:bg-blue-400"
        onClick={() => handleFilter('autos')}
      >
        Autos
      </button>
      <button
        className="px-2 md:px-3 py-1 bg-blue-500 text-white rounded-md transition-colors duration-300 hover:bg-blue-400"
        onClick={() => handleFilter('hospedajes')}
      >
        Hospedajes
      </button>
      <button
        className="px-2 md:px-3 py-1 bg-blue-500 text-white rounded-md transition-colors duration-300 hover:bg-blue-400"
        onClick={() => handleFilter('paquetes')}
      >
        Paquetes
      </button>
      <button
        className="px-2 md:px-3 py-1 bg-blue-500 text-white rounded-md transition-colors duration-300 hover:bg-blue-400"
        onClick={() => handleFilter('todas')}
      >
        Todas
      </button>
    </div>
  </div>
    <div>
        {console.log(reservaciones)}
      {/* Renderizar la lista de reservaciones */}
      {reservaciones.map((reservacion) => (
        <ReservacionItem key={reservacion._id} reservacion={reservacion} />
      ))}

      {/* Botones de paginación */}
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Anterior
      </button>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Siguiente
      </button>
    </div>
    </>
    
  );
};

export default ReservacionesList;
