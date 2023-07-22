'use client'
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { createContext, useContext, useState, useEffect } from "react";
//sigyue sin redirigirme aun que no este autendtivado
const AppContext = createContext();


//MEtadata



export const AppProvider = ({ children, session }) => {

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessages, setSuccessMessages] = useState([]);

/*   const router = useRouter();
  const pathname = usePathname()
 */



  return (
    <AppContext.Provider value={{ loading, setLoading, error, setError, errorMessages, setErrorMessages, successMessages, setSuccessMessages }}>
          <SessionProvider  session={session}>
            {children}
          </SessionProvider>
        </AppContext.Provider>
  );
};


export const useAppContext = () => useContext(AppContext);
