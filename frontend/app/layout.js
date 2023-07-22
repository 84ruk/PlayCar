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
      <body className={`bg-gray-100 w-full h-screen flex justify-center items-center ${inter.className}`}>
      <AppProvider >
              {children}

        </AppProvider>
      </body>
    </html>
  )
}
