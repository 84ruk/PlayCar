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

function CrearHospedaje() {
  const { loading, setLoading, setErrorMessages, errorMessages, successMessages, setSuccessMessages } = useAppContext();
  const { data: session } = useSession();
  const token = session?.user.jwt;
  
  const initialValues = {
    nombre: '',
    direccion: {
      calle: '',
      numero: '',
      ciudad: '',
      estado: '',
      codigoPostal: '',
      pais: ''
    },
    tipo: '', //hotel, departamento, casa, hostal
    habitaciones: 0,
    capacidad: "",
    descripcion: "",
    precio: 0,
    imagenes: [],
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
      formData.append('tipo', values.tipo);
      formData.append('habitaciones', values.habitaciones);
      formData.append('capacidad', values.capacidad);
      formData.append('descripcion', values.descripcion);
      formData.append('precio', values.precio);
      /* formData.append('estado', values.estado); */

       // Agregar campos de dirección al formData
       formData.append('direccion.calle', values.direccion.calle);
       formData.append('direccion.numero', values.direccion.numero);
       formData.append('direccion.ciudad', values.direccion.ciudad);
       formData.append('direccion.estado', values.direccion.estado);
       formData.append('direccion.codigoPostal', values.direccion.codigoPostal);
       
      for (let i = 0; i < images.length; i++) {
        formData.append('files', images[i]);
      }
    

      const response = await axios.post('http://localhost:8080/api/hospedajes', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      }); 

      setSuccessMessages([response.data.message]);  
    } catch (error) {
      console.log(error.response.data)
      setErrorMessages([error.response.data.errors]); 
    }

    setLoading(false);
    setSubmitting(false);
  };

  return (
<>
  {loading ? <LoadingSpinner /> : null}
  <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-lg mt-5">
    <h1 className="text-2xl font-bold mb-4">Crear Hospedaje</h1>
    {errorMessages?.length > 0 ? <Error messages={errorMessages} /> : null}
    {successMessages?.map((message, index) => (
      <Success key={index} messages={message} />
    ))}
    <Formik initialValues={initialValues} onSubmit={handleSubmit} encType="multipart/form-data">
      {({ isSubmitting }) => (
        <Form className="space-y-4" encType="multipart/form-data">
          {/* Datos del Hospedaje */}
          <fieldset>
            <legend className="text-lg font-bold">Datos del Hospedaje</legend>
            <div className="grid grid-cols-2 gap-4">
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
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                  Tipo
                </label>
                <Field
                  as="select"
                  id="tipo"
                  name="tipo"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="hotel">Hotel</option>
                  <option value="departamento">Departamento</option>
                  <option value="casa">Casa</option>
                  <option value="hostal">Hostal</option>
                </Field>
              </div>
              <div>
                <label htmlFor="habitaciones" className="block text-sm font-medium text-gray-700">
                  Habitaciones
                </label>
                <Field
                  type="number"
                  id="habitaciones"
                  name="habitaciones"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="capacidad" className="block text-sm font-medium text-gray-700">
                  Capacidad
                </label>
                <Field
                  type="number"
                  id="capacidad"
                  name="capacidad"
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
            </div>
          </fieldset>

          {/* Dirección del Hospedaje */}
          <fieldset>
            <legend className="text-lg font-bold">Dirección del Hospedaje</legend>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="calle" className="block text-sm font-medium text-gray-700">
                  Calle
                </label>
                <Field
                  type="text"
                  id="calle"
                  name="direccion.calle"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                  Número
                </label>
                <Field
                  type="text"
                  id="numero"
                  name="direccion.numero"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
                  Ciudad
                </label>
                <Field
                  type="text"
                  id="ciudad"
                  name="direccion.ciudad"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              {/* Agrega aquí los demás campos de dirección si es necesario (estado, código postal, país, etc.) */}
            </div>
          </fieldset>

          {/* Imágenes del Hospedaje */}
          <fieldset>
            <legend className="text-lg font-bold">Imágenes del Hospedaje</legend>
            <div>
              <FileInput label="imagen" name="imagen" onChange={handleFileInputChange} />
            </div>
          </fieldset>

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

export default CrearHospedaje;
