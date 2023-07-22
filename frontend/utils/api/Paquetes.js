
/* import axios from 'axios';

export default async function getPaquetes() {
  const response = await axios.get('/api/paquetes');
  const paquetes = await response.json();

  return {
    props: { paquetes },
  };
} */
//NO SIRVE GET SERVERSIDEPROPS


/* export async function getPaquetes() {
  try {
    const response = await axios.get('http://localhost:8080/api/paquetes');
    const paquetes = response.data.paquetes;
    return {
      paquetes,
      revalidate: 1000 * 60 * 60, // 1 hour
    };
  } catch (error) {
    console.error('Error fetching paquetes:', error);
  }
}
 */

/* 
export async function getServerSideProps() {
  try {
    const response = await axios.get('http://localhost:8080/api/paquetes');
    const paquetes = response.data.paquetes;
    console.log(paquetes);
    return {
      props: {
        paquetes, // Pasar los paquetes como prop
      },
    };
  } catch (error) {
    console.error('Error fetching paquetes:', error);

    return {
      props: {
        paquetes: [], // Si ocurre un error, asignar un array vacío como valor predeterminado
      },
    };
  }
}
 */
