'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useAppContext } from '@/app/context/appContextProvider';
import LoadingSpinner from '@/app/components/Loader';
import Error from '@/app/components/Error';
import Success from '@/app/components/Success';


export default function OlvidePasswordPage() {
  const { loading, setLoading, errorMessages, setErrorMessages, successMessages, setSuccessMessages } = useAppContext();
  
  const params = useParams();
  const { token } = params;
    console.log(token)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const resetPassword = async () => {
  const response = await axios.patch(`http://localhost:8080/api/usuarios/olvide-password/${token}`, { password });
  return response.data;
  };
  
  useEffect(() => {
  setErrorMessages([]);
  setSuccessMessages([]);
  }, []);
  
  const handleSubmit = async(e) => {
  e.preventDefault();
  
  if (password !== confirmPassword) {
    setErrorMessages(['Las contraseñas no coinciden']);
    return;
  }
  
  try {
    const response = await resetPassword();
    if (response.data.msg) {
      console.log('Success:', [response.data.msg]);
      setSuccessMessages([response.data.msg]); // Envolver el mensaje en un array
    } else {
      setErrorMessages([response.data.msg]);
    }
  } catch (error) {
    console.log(error);
    setErrorMessages([error.response.data.msg]);
    // Manejar error en la solicitud de restablecimiento de contraseña
  }
  
  };
  
  return (
  <div className="min-width-container flex flex-col w-9/12 max-w-4xl min-w-xl bg-white rounded-lg shadow-lg p-10 mt-5">
  {loading && <LoadingSpinner />}
  <h1 className="text-5xl center font-bold">Restablecer Contraseña</h1>
  {errorMessages?.length > 0 && <Error messages={errorMessages} />}
  {successMessages?.map((message, index) => (
              <Success key={index} messages={message} />
              ))}

  
    <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
      <label className="mb-4">
        Nueva Contraseña:
        <input
          className="w-full p-3 rounded-md bg-white shadow-md mt-2 min-w-xl"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="mb-4">
        Confirmar Contraseña:
        <input
          className="w-full p-3 rounded-md bg-white shadow-md mt-2 min-w-xl"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button
        className="bg-orange-500 text-white font-bold py-2 px-4 rounded border-none shadow-md transition-colors duration-500 hover:bg-orange-600"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Restablecer Contraseña'}
      </button>
    </form>
  </div>
  
  );
  }