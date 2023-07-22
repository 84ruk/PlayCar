
import useSWR from 'swr'
import axios from 'axios';
import { getAuth } from '../helpers/authApi';


const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {

/*   const { data: user, error, mutate } = useSWR(
    '/api/auth',
    getAuth,
    {
      staleTime: 10000,
    },
    );
 */
    

  

  const register = async ({ nombre, correo, password, setErrorMessages, confirmarPassword, setSuccessMessages, setLoading }) => {
    setLoading(true);
    setErrorMessages([]);
    setSuccessMessages([]);


    try {
      const response = await axios.post('http://localhost:8080/api/usuarios', {
              nombre, 
              correo, 
              password
            }, {
              withCredentials: true, // Envía las cookies en la solicitud
              /* headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
              } */
            })
            setSuccessMessages([response.data.msg]);
            
        // Realizar cualquier acción adicional después de registrar correctamente al usuario
  
  
      } catch (error) {
        setSuccessMessages([])
          /* console.log( error.response); */
        setErrorMessages([error.response.data.errors]); 
      }
    

    
    setLoading(false);
  };

  const login = async ({ correo, password, setLoading, setErrorMessages}) => {
    
    setErrorMessages([]);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { correo, 
      password }, {
        withCredentials: true, 
      }
      
      );
      //PONER TOKEN EN COOKIES
       mutate();  // Actualiza el estado del usuario

      // ... Realizar cualquier acción adicional después de iniciar sesión correctamente ...
    } catch (error) {
      console.log(error.response); // Imprime el error en la consola para depuración
      setErrorMessages(error.response.data);
    }
    setLoading(false);
  };


  const forgotPassword = async ({ correo, setErrors, setStatus }) => {
    setErrors([]);
    setStatus(null);

    try {
      const response = await axios.post('/forgot-password', { correo });
      const { msg } = response.data;

      setStatus(msg);

    } catch (error) {
      if (error.response.status !== 422) throw error;

      setErrors(error.response.data.errors);
    }
  };

  const resetPassword = async ({ token, password, setErrors, setStatus }) => {
    setErrors([]);
    setStatus(null);

    try {
      const response = await axios.post('/reset-password', { token, password });
      const { msg } = response.data;

      /* router.push('/login'); */

      setStatus(msg);

    } catch (error) {
      if (error.response.status !== 422) throw error;

      setErrors(error.response.data.errors);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/logout');

       mutate();  // Actualiza el estado del usuario

      /* router.push('/login');  */// Redirige a la página de inicio de sesión

      // ... Realizar cualquier acción adicional después de cerrar sesión correctamente ...

    } catch (error) {
      console.log(error); // Imprime el error en la consola para depuración
    }
  };
/*   useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }
    if (middleware === 'auth' && error) {
      router.push('/auth/login');
    }
  }, [user, error]); */

  return {
    user,  
    register,
    login,
    forgotPassword,
    resetPassword,
    logout,
  };
};



export default useAuth;