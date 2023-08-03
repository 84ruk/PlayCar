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

function CrearAuto() {
  const { loading, setLoading, setErrorMessages, errorMessages, successMessages, setSuccessMessages } = useAppContext();
  const { data: session } = useSession();
  const token = session?.user.jwt;

  const initialValues = {
    nombre: '',
    marca: '',
    modelo: 0,
    descripcion: '',
    categoria: '',
    precio: 0,
    estado: false,
    files: [],
  };


  const [images, setImages] = useState([]);

  useEffect(() => {
    setErrorMessages([]);
    setSuccessMessages([]);
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
        formData.append('marca', values.marca);
        formData.append('modelo', values.modelo);
        formData.append('descripcion', values.descripcion);
        formData.append('categoria', values.categoria);
        formData.append('precio', values.precio);
        formData.append('estado', values.estado);

      for (let i = 0; i < images.length; i++) {
        formData.append('files', images[i]);
      }
    

      const response = await axios.post(`${process.env.URL_BACKEND}/autos`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
       setSuccessMessages([response.data.message]); 
    } catch (error) {
      setErrorMessages([error.response.data.errors]); 
        console.log(error.response.data);
    }

    setLoading(false);
    setSubmitting(false);
  };

  return (
    <>
      {loading ? <LoadingSpinner /> : null}
      <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg mt-5">
        <h1 className="text-2xl font-bold mb-4">Crear Auto</h1>
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
                <label htmlFor="marca" className="block text-sm font-medium text-gray-700">
                  Marca
                </label>
                <Field
                  type="text"
                  id="marca"
                  name="marca"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">
                  Modelo
                </label>
                <Field
                  type="number"
                  id="modelo"
                  name="modelo"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-2">
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
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <Field
                  type="text"
                  id="categoria"
                  name="categoria"
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
                <FileInput label="imagen" name="imagen" onChange={handleFileInputChange} />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 hover:bg-orange-400"
                >
                  Crear Auto
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CrearAuto;
