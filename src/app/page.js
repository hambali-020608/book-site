"use client"
import Image from "next/image";
import Hero from "./_components/Hero"
import Navbar from "./_components/Navbar";
import Latest from "./_components/Latest";
import ComScienceBook from "./_components/ComScienceBook";
export default function Home() {
  
  return (

   <div>
    <Navbar/>
    <main>
    <Hero/>
    <Latest/>
    <ComScienceBook/>
    </main>
   </div>
  );
}
