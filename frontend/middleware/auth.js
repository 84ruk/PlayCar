/* const { NextResponse } = require('next/server');
const jose = require('jose');
const { convertVariableToUint8Array } = require('./helpers/convertVariableToUint8Array');

const authMiddleware = async (request) => {
  // Obtiene el token de la cabecera de la solicitud
  const token = request.cookies.get('auth-token');

  if (!token) {
    return NextResponse.json({ message: 'Token no proporcionado' }, { status: 401 });
  }

  try {
    const secret = process.env.JWT_SECRET;
    const uint8Array = convertVariableToUint8Array(secret);
    const decodedToken = jose.decodeJwt(token.value);
    request.userId = decodedToken.userId; // Agrega el ID de usuario a la solicitud
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
  }
};

export default authMiddleware;
 