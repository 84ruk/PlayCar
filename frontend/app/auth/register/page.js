'use client'
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/auth';
import Error from '@/app/components/Error';
import LoadingSpinner from '@/app/components/Loader';
import Success from '@/app/components/Success';
import BackButton from '@/app/components/ArrowBack';
import { useAppContext } from '@/app/context/appContextProvider';

const Register = () => {


  

  const { register } = useAuth();

  const { loading, setLoading, errorMessages, setErrorMessages, successMessages, setSuccessMessages } = useAppContext();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  

    // Verificar si los campos están vacíos
    if (!nombre || !correo || !password || !confirmarPassword) {
      setErrorMessages('Todos los campos son obligatorios');
      return;
    }

    if (password.length < 6) {
      setErrorMessages('La contraseña debe tener al menos 6 caracteres');
      return;
    }
  
    if (password !== confirmarPassword) {
      setErrorMessages('Las contraseñas no coinciden');
      return;
    }
  
  
    try {
      await register({ nombre, correo, password, confirmarPassword, setSuccessMessages, setErrorMessages, setLoading });
    } catch (error) {
      // Manejar el error si es necesario
      setErrorMessages('Favor de comunicarse con el administrador');
    
    }
  };

  useEffect(() => {
    setSuccessMessages([]);
    setErrorMessages([]);
  }, []);
  
  return (
    <>
      {loading && <LoadingSpinner />}

        <BackButton  lastRoute={'/auth/login'}/>

        <h1 className="text-5xl center font-bold">Registro</h1>
         {errorMessages?.length > 0 && <Error messages={errorMessages} />} 
              {/* Otro contenido de la página */}
              {successMessages?.map((message, index) => (
              <Success key={index} messages={message} />
              ))}

        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-3 rounded-md bg-white shadow-md mt-5 min-w-xl"
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Nombre"
          />
          <input
            className="w-full p-3 rounded-md bg-white shadow-md mt-5 min-w-xl"
            type="email"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            placeholder="Correo electrónico"
          />
          <input
            className="w-full p-3 rounded-md bg-white shadow-md mt-5 min-w-xl"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <input
            className="w-full p-3 rounded-md bg-white shadow-md mt-5 min-w-xl"
            type="password"
            value={confirmarPassword}
            onChange={e => setConfirmarPassword(e.target.value)}
            placeholder="Confirmar contraseña"
          />
          <div className="flex justify-center mt-2">
            <button
              className="bg-orange-500 text-white font-bold py-2 px-4 rounded border-none mt-5 shadow-md transition-colors duration-500 hover:bg-orange-600"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>
    </>
  );
};

export default Register;
