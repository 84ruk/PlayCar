'use client'
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FileInput from './fileinput';
import { useSession } from 'next-auth/react';
import { useAppContext } from '@/app/context/appContextProvider';
import Error from '@/app/components/Error';
import LoadingSpinner from '@/app/components/Loader';
import Success from '@/app/components/Success';

// Get a cookie



function CrearPaquete() {
  const { loading, setLoading, setErrorMessages, errorMessages, successMessages, setSuccessMessages } = useAppContext();

  const { data: session } = useSession();
  const token = session?.user.jwt;

  const initialValues = {
    nombre: '',
    descripcion: '',
    precio: '',
    autos: [],
    hospedajes: [],
    files: [],
  };

  const [autos, setAutos] = useState([]);
  const [hospedajes, setHospedajes] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setErrorMessages([])
    setSuccessMessages([])
    const obtenerAutos = async () => {
      try {
        const response = await axios.get(`${process.env.URL_BACKEND}/autos`);
        setAutos(response.data.autos);
      } catch (error) {
        setErrorMessages(error.response);
      }
    };

    const obtenerHospedajes = async () => {
      try {
        const response = await axios.get(`${process.env.URL_BACKEND}/hospedajes`);
        setHospedajes(response.data.hospedajes);
      } catch (error) {
        
        setErrorMessages(error.response.errors);
      }
    };

    obtenerAutos();
    obtenerHospedajes();
  }, []);

  const handleFileInputChange = (files) => {
    const fileList = Array.from(files); // Convertir el FileList a un array de Files
    setImages(fileList);
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    setErrorMessages([]);
    setSuccessMessages([]);

    try {
      const formData = new FormData();
      formData.append('nombre', values.nombre);
      formData.append('descripcion', values.descripcion);
      formData.append('precio', values.precio);
      formData.append('autos', JSON.stringify(values.autos));
      formData.append('hospedajes', JSON.stringify(values.hospedajes));

      for (let i = 0; i < images.length; i++) {
        formData.append('files', images[i]);
      }
    

      const response = await axios.post(`${process.env.URL_BACKEND}/paquetes`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
       setSuccessMessages([response.data.message]); 
    } catch (error) {
      setErrorMessages(error.response.data.message); 
    }

    setLoading(false);
    setSubmitting(false);
  };

  return (
    <>
      <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg mt-5">
        <h1 className="text-2xl font-bold mb-4">Crear Paquete</h1>
        {errorMessages?.length > 0 ? <Error messages={errorMessages} /> : null}
        {successMessages?.map((message, index) => (
          <Success key={index} messages={message} />
        ))}
        <Formik initialValues={initialValues} onSubmit={handleSubmit}  encType="multipart/form-data" >
          {({ isSubmitting }) => (
            <Form className="space-y-4" encType="multipart/form-data" >
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <Field
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  id="descripcion"
                  name="descripcion"
                  rows="4"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <Field
                  type="number"
                  id="precio"
                  name="precio"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="autos" className="block text-sm font-medium text-gray-700">
                  Autos
                </label>
                <Field
                  as="select"
                  multiple
                  id="autos"
                  name="autos"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  {autos.map((auto) => (
                    <option key={auto._id} value={auto._id}>
                      {auto.nombre} - {auto.modelo} - {auto.marca}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <label htmlFor="hospedajes" className="block text-sm font-medium text-gray-700">
                  Hospedajes
                </label>
                <Field
                  as="select"
                  multiple
                  id="hospedajes"
                  name="hospedajes"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  {hospedajes.map((hospedaje) => (
                    <option key={hospedaje._id} value={hospedaje._id}>
                      {hospedaje.nombre} - {hospedaje.ubicacion}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <FileInput label="imagen" name="imagen" onChange={handleFileInputChange} />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 hover:bg-orange-400"
                >
                  Crear Paquete
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CrearPaquete;
