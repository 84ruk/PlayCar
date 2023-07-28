import Header from './components/Header';
import { AppProvider } from './context/appContextProvider'
import './globals.css'
import { Inter } from 'next/font/google'
import Head from 'next/head';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Renta de Autos, Hospedajes y Tours en la Riviera Maya | Play Car Rental',
  description: '¡Bienvenido a Play Car Rental! Descubre una amplia selección de autos de alquiler, paquetes de viaje, opciones de hospedaje y emocionantes tours en la hermosa Riviera Maya. Planifica tu escapada perfecta con nosotros y disfruta de una experiencia inolvidable.',
};


export default function RootLayout({ children }) {

 

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Agrega aquí más etiquetas meta relevantes para el SEO */}
      </Head>
      <body className={`bg-gray-100 w-full justify-center items-center ${inter.className} min-width-container flex flex-col w-11/12 min-w-xl mt-5`}>
      <AppProvider >
        
        <div className='min-width-container flex flex-col  w-11/12 max-w-7xl min-w-xl bg-white rounded-lg shadow-lg mt-5 p-10 sticky top-10 '>
              <Header />

              {children}

        </div>

        </AppProvider>
      </body>
    </html>
  )
}
