'use client';
 
import Link from 'next/link';
import { useState } from 'react';

const baseButtonClassName = "bg-gray-300 rounded-xl shadow-xl w-[100px] h-10 bg-green-600/75";
const activeButtonClassName = "rounded-xl shadow-xl w-[100px] h-10 border-2 border-green-600";


export default function Header() {

  const [activeButton, setActiveButton] = useState<string | null>(baseButtonClassName);

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
   
          <header className="z-10 w-full flex items-center justify-between text-m lg:flex">

            <div className="flex items-center w-90">
              <Link href='/'>
                <div className="text-3xl mr-16">
                  PMbase
                </div>
              </Link>

              <Link href='/program'>
                <div className="mr-8">
                  Program
                </div>
              </Link>

              <Link href='/knowledge_products'>
                <div className="mr-8">
                  Knowledge Products
                </div>
              </Link>

              <Link href='/relationships'>
                <div>
                  Relationship building
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-8">
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
            </div>


          </header>

  );
}
