export default function Success({ messages }) {
  
  return (
    messages && (
      <div className="flex items-center justify-center h-full mt-5">
        <div className="bg-green-500 text-white rounded-lg shadow-lg p-4">
          <p className="text-lg font-bold mb-4">Éxito</p>
          <p>{messages}</p>

        </div>
      </div>
    )
  );
}
