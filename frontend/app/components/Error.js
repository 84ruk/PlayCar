export default function Error({ messages }) {
  let errorArray = [];

  if (typeof messages === "object" && messages.message) {
    errorArray.push(messages.message);
  } else if (Array.isArray(messages)) {
    errorArray = messages.flatMap((error) => {
      if (Array.isArray(error)) {
        return error.map((innerError) => innerError.msg);
      } else {
        return [error];
      }
    });
  } else {
    errorArray.push(messages);
  }

  return (
    <div className="flex items-center justify-center h-full mt-5">
      <div className="bg-red-500 text-white rounded-lg shadow-lg p-4">
        <p className="text-lg font-bold mb-4">Error</p>
        <ul className="list-disc list-inside">
          {errorArray.map((error, index) => (
            <li key={index} className="mb-1">
              {error}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
