import React from 'react';

function FileInput({ label, name, onChange }) {
  const handleInputChange = (event) => {
    const fileList = event.target.files;
    const serializedFiles = Array.from(fileList); // Serializar el objeto FileList a un arreglo
    onChange(serializedFiles); // Pasar el arreglo serializado a la función onChange
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        onChange={handleInputChange}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        multiple
        accept='image/*'
      />
    </div>
  );
}

export default FileInput;
