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
    <header className="bg-white sticky top-0 z-10 w-full">
      <div className="container mx-auto px-4 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Play Car</h1>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/">
            <span className={`cursor-pointer font-medium text-gray-600 hover:text-orange-500 ${isLinkSelected('/')}`}>Inicio</span>
          </Link>
          <Link href="/catalogo">
            <span className={`cursor-pointer font-medium text-gray-600 hover:text-orange-500 ${isLinkSelected('/catalogo')}`}>Catálogo</span>
          </Link>
          <Link href="/contacto">
            <span className={`cursor-pointer font-medium text-gray-600 hover:text-orange-500 ${isLinkSelected('/contacto')}`}>Contacto</span>
          </Link>
          <Link href="/profile">
            <span className="cursor-pointer">
              <Image src={Profile} alt="profile" width={35} height={35} className="rounded-full" />
            </span>
          </Link>
          <Link href="/shopping-cart">
            <span className="cursor-pointer">
              <Image src={Cart} alt="carrito" width={30} height={30} />
            </span>
          </Link>
          {session?.user?.rol === 'ADMIN_ROLE' && (
            <Link href="/admin/dashboard">
              <span className={`cursor-pointer font-medium text-gray-600 hover:text-orange-500 ${isLinkSelected('/admin/dashboard')}`}>Dashboard</span>
            </Link>
          )}
        </div>
        <div className="flex items-center lg:hidden">
          <span className="inline-block" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 hover:text-orange-500 cursor-pointer transition-colors duration-300"
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
        <div className="lg:hidden bg-white py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link href="/">
              <span className={`block font-medium text-gray-600 hover:text-orange-500 ${isLinkSelected('/')}`} onClick={toggleMenu}>
                Inicio
              </span>
            </Link>
            <Link href="/catalogo">
              <span className={`block font-medium text-gray-600 hover:text-orange-500 ${isLinkSelected('/catalogo')}`} onClick={toggleMenu}>
                Catálogo
              </span>
            </Link>
            <Link href="/contacto">
              <span className={`block font-medium text-gray-600 hover:text-orange-500 ${isLinkSelected('/contacto')}`} onClick={toggleMenu}>
                Contacto
              </span>
            </Link>
            <Link href="/profile">
              <span className="block cursor-pointer" onClick={toggleMenu}>
                <Image src={Profile} alt="profile" width={35} height={35} className="rounded-full" />
              </span>
            </Link>
            <Link href="/shopping-cart">
              <span className="block cursor-pointer" onClick={toggleMenu}>
                <Image src={Cart} alt="carrito" width={30} height={30} />
              </span>
            </Link>
            {session?.user?.rol === 'ADMIN_ROLE' && (
              <Link href="/admin/dashboard">
                <span className={`block font-medium text-gray-600 hover:text-orange-500 ${isLinkSelected('/admin/dashboard')}`} onClick={toggleMenu}>
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
