import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'



export async function middleware(req) {

  const session = await getToken({ req, secret: process.env.JWT_SECRET});

  if( !session && !req.nextUrl.pathname.startsWith('/auth')){
    
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${requestedPage}`;

      return NextResponse.redirect(url);
  }

    if(session){

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const requestedPage = req.nextUrl.pathname;


    if (session.exp < currentTimestamp) {
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }


    if(requestedPage.startsWith('/auth/') || requestedPage.startsWith('/admin/') && session.user.rol !== "ADMIN_ROLE"){
      const url = req.nextUrl.clone();
      url.pathname = `/`;
      url.search = `p=${requestedPage}`;
      return NextResponse.redirect(url);
    }


  } 
  
  return NextResponse.next();
}


export const config = {
  matcher:[ 
    '/pagar/:path*', '/admin', '/auth/:path*', '/admin/:path*'  /* , '/auth/register' */],

}
