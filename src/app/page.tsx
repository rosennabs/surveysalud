'use client'

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';


export default function Home() {
 
  const router = useRouter();
  const { logout } = useAuth();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    setUser(storedUser);
  }, [])
  

  const handleLogout = () => {
    logout();
    router.push('/login');

  }

 
  return (  
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        
        
        {user && <h1 className="text-6xl text-black pb-16">Hello, {user.first_name}</h1>}
        
        {!user && (
          <>
          <Link href='/login'>
            <p className="pr-4">
              Login</p>
          
          </Link>
          
          <Link href='/registration'>
            <p className="pr-4">
              Register</p>
          
            </Link>
          </>
       )}
          
        
        {user && (
          <p onClick={() => handleLogout()} className="pr-4">
            Logout</p>
       )}
            
        
      </div>
     </div>
  );
}
