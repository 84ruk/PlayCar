import React from 'react';
import Image from 'next/image';
import Booking from '../public/booking.svg';
import Join from '../public/join.svg';
import Relaxation from '../public/relaxation.svg';

export default function PasosReservaciones() {
    return (
      <div className="container mx-auto mt-10 flex flex-wrap justify-center sm:justify-between ">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-full sm:w-1/2 md:w-1/4 lg:w-64 px-4 mb-4">
          <h2 className="text-xl font-bold mb-4">Paso 1: Selecciona tus servicios</h2>
          <div className="w-13 h-13 mx-auto mb-4">
            <div className="flex justify-center items-center h-full">
              <Image src={Booking} alt={'Selecciona tus servicios'}   />
            </div>
          </div>
          <p className="text-gray-600 text-center">
            Personaliza tu aventura en la Riviera Maya seleccionando entre una amplia variedad de servicios, incluyendo renta de autos, hospedajes de ensueño y emocionantes tours. Arma tu itinerario a medida para vivir una experiencia única en este paraíso tropical.
          </p>
        </div>
  
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-full sm:w-1/2 md:w-1/4  lg:w-64 xl:w-1/4 px-4 mb-4">
          <h2 className="text-xl font-bold mb-4">Paso 2: Realiza tu reserva</h2>
          <div className="w-13 h-13 mx-auto mb-4">
            <div className="flex justify-center items-center h-full">
              <Image src={Join} alt={'Realiza tu reserva'}  />
            </div>
          </div>
          <p className="text-gray-600 text-center">
          Garantiza tu lugar en este inolvidable viaje reservando tus servicios seleccionados. Nuestro sencillo proceso de reserva te permitirá asegurar cada detalle de tu escapada a la Riviera Maya. No pierdas la oportunidad de vivir momentos inolvidables, ¡haz tu reserva hoy mismo!

          </p>
        </div>
  
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center w-full sm:w-1/2 md:w-1/4 lg:w-64 xl:w-1/4 px-4 mb-4">
          <h2 className="text-xl font-bold mb-4">Paso 3: Disfruta de tu viaje</h2>
          <div className=" w-13 h-13 mx-auto mb-4">
            <div className="flex justify-center items-center h-full">
              <Image src={Relaxation} alt={'Disfruta de tu viaje'}   />
            </div>
          </div>
          <p className="text-gray-600 text-center">
            ¡Prepárate para una experiencia inolvidable en la Riviera Maya! Después de reservar, nuestro equipo se pondrá en
            contacto contigo para brindarte una atención personalizada. Disfruta al máximo tus vacaciones, nosotros nos
            encargamos de todo.
          </p>
        </div>
      </div>
    );
  }
  