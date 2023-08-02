import { format } from 'date-fns';

function ReservacionItem({ reservacion }) {
    const { cliente, fechaFin, fechaInicio, autoReservado, hospedajeReservado, paqueteReservado } = reservacion;
    const fechaInicioFormateada = format(new Date(fechaInicio), 'dd/MM/yyyy');
    const fechaFinFormateada = format(new Date(fechaFin), 'dd/MM/yyyy');

  return (
    <div className="p-4 mb-4 bg-white shadow-md rounded-md">
      <p>Cliente: {cliente}</p>
      <p>Fecha de inicio: {fechaInicioFormateada}</p>
      <p>Fecha de fin: {fechaFinFormateada}</p>

      {autoReservado && <p>Auto reservado: {autoReservado}</p>}
      {hospedajeReservado && <p>Hospedaje reservado: {hospedajeReservado}</p>}
      {paqueteReservado && <p>Paquete reservado: {paqueteReservado}</p>}

      {!autoReservado && !hospedajeReservado && !paqueteReservado && <p>No se ha reservado ningún servicio</p>}
    </div>
  );
};

export default ReservacionItem;
