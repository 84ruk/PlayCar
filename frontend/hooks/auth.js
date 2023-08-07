
import axios from 'axios';


const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {



  

  const register = async ({ nombre, correo, password, setErrorMessages, confirmarPassword, setSuccessMessages, setLoading }) => {
    setLoading(true);
    setErrorMessages([]);
    setSuccessMessages([]);


    try {
      const response = await axios.post(`${process.env.URL_BACKEND}/usuarios`, {
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
        setErrorMessages([error.response.data.errors]); 
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


  return {
    register,
    forgotPassword,
    resetPassword,
  };
};



export default useAuth;