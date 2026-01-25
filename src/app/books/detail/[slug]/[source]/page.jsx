import Navbar from "@/app/_components/Navbar"
import Link from "next/link"
import CardDetail from "@/app/_components/CardDetail"
// import { Bokor } from "next/font/google"

export default async function BookDetailPage({ params }) {
  const { slug } = await params
  const {source} = await params
  const data = await fetch(`http://localhost:3001/api/books/details?slug=${slug}&source=${source}`)
  const book = await data.json()
  console.log(book)

  return (
    <div className="min-h-screen bg-base-100 pb-20 font-sans selection:bg-primary selection:text-primary-content">
      <Navbar />
      

      {/* Ambient Background Effect */}
      <div className="fixed inset-0 w-full h-[60vh] -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center blur-[100px] opacity-20 dark:opacity-10 scale-125 transform transition-opacity duration-700"
          style={{ backgroundImage: `url(${book.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-100/80 to-base-100" />
      </div>

      <main className="container mx-auto px-4 md:px-6 pt-6 md:pt-14 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 mt-10">
        {/* Breadcrumb / Back */}
        <div className="mb-8 md:mb-12">
          <Link href="/" className="btn btn-ghost btn-sm gap-2 pl-0 text-base-content/60 hover:text-base-content hover:bg-transparent transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6" /></svg>
            Back to Library
          </Link>
        </div>
<CardDetail book={book.book} />
      </main>
    </div>
  )
}