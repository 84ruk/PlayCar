import axios from 'axios';

export const getAuth = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/auth', {
        withCredentials: true,
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
    //implementar usesession nextauth
  }
