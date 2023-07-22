'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Profile from '../../public/profile.svg';
import Image from 'next/image';
import Logo from '../../public/logo.png';
import Cart from '../../public/shoppingcart.svg';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isLinkSelected = (actualPathname) => {
    return pathname === actualPathname ? 'text-orange-500' : 'text-nextjs13';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="px-4 py-2 bg-white sticky ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src={Logo} alt="logo" width={"auto"} height={"auto"} />
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/">
            <span className={`cursor-pointer ${isLinkSelected('/')} hover:text-orange-500`}>Inicio</span>
          </Link>
          <div className="ml-auto">
            <Link href="/catalogo">
              <span className={`cursor-pointer ${isLinkSelected('/catalogo')} hover:text-orange-500`}>Catálogo</span>
            </Link>
          </div>
          <Link href="/contacto">
            <span className={`cursor-pointer ${isLinkSelected('/contacto')} hover:text-orange-500`}>Contacto</span>
          </Link>
          <Link href="/profile">
            <span className="cursor-pointer">
              <Image src={Profile} alt="profile" width={25} height={25} className="rounded-full" />
            </span>
          </Link>
          <Link href="/shopping-cart">
            <span className="cursor-pointer">
              <Image src={Cart} alt="carrito" width={25} height={25} />
            </span>
          </Link>
          {session?.user?.rol === 'ADMIN_ROLE' && ( // Validación del rol de administrador
            <Link href="/admin/dashboard">
              <span className={`cursor-pointer ${isLinkSelected('/admin/dashboard')} hover:text-orange-500`}>Dashboard</span>
            </Link>
          )}
        </div>
        <div className={`flex items-center space-x-4 lg:hidden`} onClick={toggleMenu}>
          <span className="inline-block ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-nextjs13 hover:text-orange-500 hover:cursor-pointer transition-colors duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="w-full bg-white shadow-md top-full left-0 py-2 px-4">
          <div className="flex flex-col space-y-2 items-center">
            <Link href="/">
              <span className={`block ${isLinkSelected('/')} hover:text-orange-500`} onClick={toggleMenu}>
                Inicio
              </span>
            </Link>
            <Link href="/catalogo">
              <span className={`block ${isLinkSelected('/catalogo')} hover:text-orange-500`} onClick={toggleMenu}>
                Catálogo
              </span>
            </Link>
            <Link href="/contacto">
              <span className={`block ${isLinkSelected('/contacto')} hover:text-orange-500`} onClick={toggleMenu}>
                Contacto
              </span>
            </Link>
            <Link href="/profile">
              <span className="block cursor-pointer">
                <Image src={Profile} alt="profile" width={35} height={35} className="rounded-full" />
              </span>
            </Link>
            <Link href="/shopping-cart">
              <span className="block cursor-pointer">
                <Image src={Cart} alt="carrito" width={35} height={35} />
              </span>
            </Link>
            {session?.user?.rol === 'ADMIN_ROLE' && ( // Validación del rol de administrador
              <Link href="/admin/dashboard">
                <span className={`block ${isLinkSelected('/admin/dashboard')} hover:text-orange-500`} onClick={toggleMenu}>
                  Dashboard
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
