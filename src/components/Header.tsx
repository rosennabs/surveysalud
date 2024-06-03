'use client';
 
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const baseButtonClassName = "bg-gray-300 rounded-xl shadow-xl w-[100px] h-10 bg-teal-500 hover:text-white";
const activeButtonClassName = "rounded-xl shadow-xl w-[100px] h-10 border-2 border-teal-500";

const activeNavClassName = "underline underline-offset-8 text-teal-600 font-bold mr-8";


export default function Header() {

  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();


  const handleLogout = (logoutButton: string) => {
    handleButtonClick(logoutButton);
    logout();
    router.push('/login');
  }

  const [activeButton, setActiveButton] = useState<string | null>(baseButtonClassName);
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
  }

  return (
   
          <header className="z-10 w-full flex items-center justify-between text-m lg:flex">

            <div className="flex items-center w-90">
              <Link href='/'>
                <div onClick={()=> setActiveNav(null)} className="text-3xl mr-16">
                  PMbase
                </div>
              </Link>

              <Link href='/program'>
          <div onClick={() => handleNavClick('program')} className={activeNav === 'program' ? activeNavClassName : 'mr-8'}>
                  Program
                </div>
              </Link>

              <Link href='/knowledge_products'>
          <div onClick={() => handleNavClick('kp')} className={activeNav === 'kp' ? activeNavClassName : 'mr-8'}>
                  Knowledge Products
                </div>
              </Link>

              <Link href='/relationships'>
          <div onClick={() => handleNavClick('relationship')} className={activeNav === 'relationship' ? activeNavClassName : 'mr-8'}>
                  Relationship building
                </div>
              </Link>
      </div>
      
      

      <div className="flex items-center space-x-8">
        
        {isAuthenticated ? (
          <>
            <p className="text-m text-black">Hello, {user.first_name}</p>

            <button onClick={() => handleLogout('logoutButton')} className={activeButton === 'logoutButton' ? activeButtonClassName : baseButtonClassName}>
                Logout
              </button>
            
          </>
        ) : (
          <>
              <Link href='/login'>
                <button onClick={() => handleButtonClick('login')} className={activeButton === 'login' ? activeButtonClassName : baseButtonClassName}>
                  Login
                </button>
              </Link>

              <Link href='/registration'>
              <button onClick={() => handleButtonClick('signup')} className={activeButton === 'signup' ? activeButtonClassName : baseButtonClassName}>
                  Sign up
                </button>
            </Link>
            </>
        )}
            </div>


          </header>

  );
}
