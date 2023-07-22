import LogoutButton from "../components/logoutButton";



function Details() {

return (
  <div>
    <h1>Home Page</h1>
    <LogoutButton/>
  </div>
);

}


export default Details;

/* import { useSession } from 'next-auth/client'

function ProfilePage() {
  const [session, loading] = useSession()

  if (loading) {
    return <div>Cargando...</div>
  }

  if (!session) {
    return <div>No has iniciado sesión</div>
  }

  return (
    <div>
      <h1>Hola, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      <button onClick={() => signOut()}>Cerrar sesión</button>
    </div>
  )
}
 */