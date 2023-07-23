
import Link from 'next/link';
import Header from './components/Header';
import Paquetes from './paquetes';
import Pasos from './pasos';
import Head from 'next/head';
import Image from 'next/image';
import Flecha from '../public/Arrow_Up_Right_LG.svg';


export default async function Home() {



  return( 
    <>
      
      <div className="flex flex-col justify-center items-center lg:flex-row">
        <div className="w-full lg:w-1/2 px-10 space-y-8">
          <h1 className="text-black  text-4xl font-bold leading-10 tracking-tight">
            Renta de autos y traslados en la Riviera Maya
          </h1>
          <div className="flex flex-col justify-between space-y-10  md:justify-between md:flex-row md:space-y-0 ">
            {/* Wrap the buttons on smaller screens */}
             <div className="flex justify-center w-auto ">
                <Link href="/renta-hospedajes" className="px-5 py-3 rounded-sm bg-orange-500 text-white font-bold text-base shadow-md hover:bg-orange-400 transition-colors duration-300 hover:shadow-none my-auto mx-2">
                    Hacer una reservacion
                </Link>
              </div>
              <div className="flex justify-center w-auto">
                <Link href="/contacto" className="px-5 py-3 rounded-sm bg-white text-black font-bold text-base transition-colors duration-300 hover:shadow-md mx-2">
                  <span  >
                    Renta hospedaje o paquetes turisticos 
                    <Image src={Flecha } alt='Flecha'/>
                  </span>
                </Link>
              </div>


          </div>
        </div>
        
        <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
          <div className="bg-gray-300 w-full h-80 rounded-lg"></div>
        </div>
      </div>

        <Pasos />
        <Paquetes />


    </>

    
  );
}



