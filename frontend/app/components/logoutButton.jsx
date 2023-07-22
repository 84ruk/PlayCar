'use client'
import axios from 'axios';
import Link from 'next/link';


export default async  function LogoutButton() {


  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
    } catch (error) {
      console.log(error);
      // Manejar el error de cierre de sesión
    }
  };

  return (
      <Link href='/' replace={true} type="button" className="bg-color-red-500" onClick={handleLogout}>
        Logout
      </Link>

  );
}
