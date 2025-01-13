"use client";


import { Inter } from "next/font/google";
import "./globals.css";
import Header from '../components/Header';
import { AuthProvider } from '../contexts/AuthContext';
import { FormProvider } from '../contexts/FormContext';
import Footer from '../components/Footer';



const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">

      <body className="flex flex-col h-screen justify-between montserrat-light my-8">
        <AuthProvider>
        <FormProvider>

            <Header />
            <div className="border-b-2 border-yellow-500"></div>

            <main className="flex-grow">
              {children}
            </main>

                <Footer />
                
          </FormProvider>
        </AuthProvider>


      </body>
    </html>
  );
}
