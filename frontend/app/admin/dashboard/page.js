'use client'
import { useState, lazy, Suspense } from 'react';
import Header from '../../components/Header';
import { useAppContext } from '@/app/context/appContextProvider';
import LoadingSpinner from '@/app/components/Loader';
import ReservacionesList from './reservaciones';
import ProductosDashboard from './lista-productos';

// Importa los componentes usando lazy
const CrearPaquete = lazy(() => import('./crear-paquete'));
const CrearAuto = lazy(() => import('./crear-auto'));
const CrearHospedaje = lazy(() => import('./crear-hospedaje'));


function Dashboard() {
  const [activeTab, setActiveTab] = useState('paquete');


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-width-container flex flex-col w-11/12 max-w-7xl min-w-xl bg-white rounded-lg mt-5 p-10 mx-auto sticky top-10">
      <div className="max-w-7xl py-12 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Dashboard</h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Bienvenido al panel de control. Aquí puedes crear nuevos paquetes, autos, hospedajes, etc.
          </p>
        </div>
        <div className="mt-10">
          <div className="mb-5">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex flex-wrap justify-center">
                <button
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium focus:outline-none ${
                    activeTab === 'paquete' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => handleTabClick('paquete')}
                >
                  Crear Paquete
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium focus:outline-none ml-8 ${
                    activeTab === 'auto' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => handleTabClick('auto')}
                >
                  Crear Auto
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium focus:outline-none ml-8 ${
                    activeTab === 'hospedaje' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => handleTabClick('hospedaje')}
                >
                  Crear Hospedaje
                </button>
              </nav>
            </div>
          </div>
            {activeTab === 'paquete' && <CrearPaquete />}
            {activeTab === 'auto' && <CrearAuto />}
            {activeTab === 'hospedaje' && <CrearHospedaje />}
        </div>
      </div>

      <ReservacionesList />

      <ProductosDashboard />

    </div>
  );
}

export default Dashboard;
