'use client'
import { useState } from 'react';

export default async function CartPage() {
  // Supongamos que tienes un array de productos en el carrito
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Producto 1',
      image: 'url-de-la-imagen-1.jpg',
      reservationDate: '2023-08-01',
    },
    {
      id: 2,
      name: 'Producto 2',
      image: 'url-de-la-imagen-2.jpg',
      reservationDate: '2023-08-15',
    },
    // Agrega más productos aquí
  ]);

  // Función para eliminar un producto del carrito
  const removeItemFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Función para modificar la fecha de reservación de un producto
  const updateReservationDate = (itemId, newDate) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, reservationDate: newDate } : item
      )
    );
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Carrito de compras</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border p-4 flex items-center justify-between"
          >
            {/* Foto del artículo */}
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded object-cover mr-4"
            />

            {/* Información del artículo */}
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600">Fecha de reservación: {item.reservationDate}</p>
            </div>

            {/* Opciones para eliminar y modificar fechas */}
            <div className="flex flex-col items-end">
              {/* Botón para eliminar */}
              <button
                className="text-red-500 hover:text-red-600"
                onClick={() => removeItemFromCart(item.id)}
              >
                Eliminar
              </button>

              {/* Campo para modificar fecha */}
              <input
                type="date"
                value={item.reservationDate}
                onChange={(e) => updateReservationDate(item.id, e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

