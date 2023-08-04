'use client'
import { useEffect, useState } from 'react';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { useAppContext } from '../../context/appContextProvider';
import Error from '../../components/Error';
import LoadingSpinner from '../../components/Loader';
import BackButton from '../../components/ArrowBack';
import Link from 'next/link';

const Login = () => {
  
  const router = useRouter();
  const { loading, setLoading, setErrorMessages, errorMessages, setSuccessMessages} = useAppContext();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!correo.length || !password.length) {
      setErrorMessages('Todos los campos son obligatorios');
      return;
    }
  
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        correo,
        password,
        redirect: false,
      });
      if (result.error) {
        let errorMessages = [];
        if (typeof result.error === 'string') {
          errorMessages.push(result.error);
        } else if (Array.isArray(result.error)) {
          errorMessages = result.error.map((error) => error.msg);
        }
        setErrorMessages(errorMessages);
      } else {
        router.push('/');
        setErrorMessages([]);
      }
    } catch (error) {
      console.log(error);
      // Manejar otros errores
    }
  
    setLoading(false);
  };
  
  useEffect(() => {
    
    setErrorMessages([])
    setSuccessMessages([])
  }, [])
  
  

  return (
    <>
      {loading ? <LoadingSpinner /> : null}

        <BackButton lastRoute={'/'} />
        <h1 className="text-5xl center font-bold">Inicia sesion</h1>
        { errorMessages.length > 0 && <Error messages={errorMessages} /> }
        
        <form onSubmit={handleLogin}>
          <input
            className="w-full p-3 rounded-md bg-white shadow-md mt-5 min-w-xl"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="correo@correo.com"
          />
          <input
            className="w-full p-3 rounded-md bg-white shadow-md mt-5 min-w-xl "
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <div className="flex justify-between w-full mt-3">
            <Link className="text-gray-500 hover:text-blue-600" href="/auth/register">Crear cuenta</Link>
            <Link className="text-gray-500 hover:text-blue-600" href="/auth/olvide-password">Olvidé mi contraseña</Link>
          </div>
          <div className="flex justify-center mt-2 py">
            <button
              className="bg-orange-500 text-white font-bold py-2 px-4 rounded border-none mt-5 shadow-md transition-colors duration-500 hover:bg-orange-600"
              onClick={handleLogin}
            >
              Iniciar sesión
            </button>
          </div>
        </form>
    </>
  );
};

export default Login;
