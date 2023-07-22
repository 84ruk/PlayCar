'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Error from '@/app/components/Error';
import LoadingSpinner from '@/app/components/Loader';
import Success from '@/app/components/Success';
import { useAppContext } from '@/app/context/appContextProvider';

export default function ForgotPassword() {
  const { loading, setLoading, errorMessages, setErrorMessages, successMessages, setSuccessMessages } = useAppContext();
  const [correo, setCorreo] = useState('');

  const handleForgotPassword = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/usuarios/olvide-password',
        { correo },
        { withCredentials: true }
      );

      if (response.data.msg) {
        console.log('Success:', [response.data.msg]);
        setSuccessMessages([response.data.msg]); // Envolver el mensaje en un array
      } else {
        setErrorMessages([response.data.msg]);
      }
      
    } catch (error) {
      console.log('Error en la petición:', error.response.data.msg);
      setErrorMessages([error.response.data.msg]);
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleForgotPassword();
  };

  useEffect(() => {
    setSuccessMessages([]);
    setErrorMessages([]);
  }, [])

  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Olvidé mi contraseña</h2>
            {errorMessages?.length > 0 && <Error messages={errorMessages} />}
            {successMessages?.map((message, index) => (
              <Success key={index} messages={message} />
              ))}

            <div className="mb-4 mt-5">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
                Correo electrónico
              </label>
              <input
                className="w-full p-3 rounded-md bg-white shadow-md min-w-xl focus:outline-none focus:shadow-outline"
                id="correo"
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-orange-500 text-white font-bold py-2 px-4 rounded border-none shadow-md transition-colors duration-500 hover:bg-orange-600"
                type="submit"
              >
                Enviar correo de restablecimiento
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

