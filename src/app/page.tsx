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
     
  );
}
