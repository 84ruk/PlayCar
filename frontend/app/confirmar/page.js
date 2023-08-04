'use client'
import { useParams } from 'next/navigation'

import Link from "next/link";
import { useEffect } from 'react';


function ConfirmacionCuentaPage() {
  const params = useParams();
  //extraer el token
  const { token } = params;

  useEffect(() => {
    const confirmarCuenta = async(token) => {
      try {

        const url = `${process.env.URL_BACKEND}/api/usuarios/confirmar/${id}`
        const { data } = await axios(url);

      } catch (error) {
        console.log(error);
      }
    }


    if (token) {
      confirmarCuenta(token);
    }
  }
  , [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center  max-w-lg px-6 py-10 bg-white shadow-md rounded-md ">
        <h1 className="text-3xl font-bold text-center text-gray-800">¡Cuenta Confirmada!</h1>
        <p className="mt-4 text-lg text-center text-gray-600">
          Gracias por confirmar tu cuenta. Ahora puedes disfrutar de todos nuestros servicios.
        </p>
        <Link href="/auth/login">
          <span className=" inline-block text-center  bg-orange-500 text-white font-bold py-2 px-4 rounded border-none mt-5 shadow-md transition-colors duration-500 hover:bg-orange-600">
            Iniciar sesión
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ConfirmacionCuentaPage;
