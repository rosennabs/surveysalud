"use client"; 


import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';
import { AuthProvider } from '../contexts/AuthContext';
import { FormProvider} from '../contexts/FormContext';
import Footer from '../components/Footer';
import { usePathname } from 'next/navigation';



const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname(); // Use the useRouter hook
  const isDashboard = pathname === '/dashboard'; // Check if the current route is /dashboard

  return (
    <html lang="en">

      <body className="flex flex-col h-screen justify-between montserrat-light my-8 bg-off-white">
       
        <FormProvider>
        <AuthProvider>

            <Header />
            <div className="border-b-2 border-teal-600"></div>

            <main className="flex-grow">
              
            {children}
          </main>

            
            {/* Conditionally render the footer */}
            {!isDashboard && (
            <footer className="w-full py-4 mt-32 bg-light-teal">
        <Footer />
              <p className="text-sm my-10 text-center mt-32">© 2024 HECBASE. All rights reserved.</p>
            </footer>
            )}

          </AuthProvider>
        </FormProvider>

       
      </body>
    </html>
  );
}
