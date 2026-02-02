"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Navbar from "../_components/Navbar"
import Link from "next/link"
import { Suspense } from "react"
function SearchResultContent() {
     const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const searchParams = useSearchParams()
    const query = searchParams.get("q")

    // Pagination specific states
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    useEffect(() => {
        const fetchBooks = async () => {
            if (!query) return
            setLoading(true)
            try {
                
                const response = await fetch(`/api/books/search?q=${decodeURIComponent(query)}`)
                const data = await response.json()
                // The API usually returns { status: "ok", books: [...] }
                setBooks(data.books || [])
                setLoading(false)
            } catch (error) {
                console.error("Error fetching books:", error)
                setError(error)
                setLoading(false)
            }
        }
        fetchBooks()
        // Reset to page 1 when query changes
        setCurrentPage(1)
    }, [query])

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(books.length / itemsPerPage)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        
        <div className="min-h-screen bg-base-100 pb-20">
            <Navbar />
            {/* {console.log(books)} */}

            <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-10 mt-10">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                        Search Results for <span className="text-[#FFBF00]">"{query}"</span>
                    </h1>
                    <p className="mt-2 text-base-content/60">
                        Found {books.length} result{books.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <div className="skeleton h-64 w-full rounded-2xl"></div>
                                <div className="skeleton h-4 w-3/4"></div>
                                <div className="skeleton h-4 w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="alert alert-error max-w-lg mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Error loading books. Please try again later.</span>
                    </div>
                ) : books.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold mb-2">No results found</h3>
                        <p className="text-base-content/60">Try searching for a different keyword</p>
                    </div>
                ) : (
                    <>
                        {/* Grid Results */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
                            {currentBooks.map((book) => (
                                <div key={book.id} className="group relative flex flex-col gap-3 h-full">
                                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-base-200 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                                            {/* We can link to details page if it exists, for now render a button */}
                                            <button className="btn bg-[#FFBF00] border-none text-black hover:bg-[#e6ac00] rounded-full px-6 font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                View Details
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg leading-tight line-clamp-2 min-h-[3rem] group-hover:text-[#FFBF00] transition-colors" title={book.title}>
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-base-content/60 line-clamp-1">
                                            {book.authors? `by ${book.authors}`  : ""}
                                        </p>
                                        <Link href={`/books/detail/${book.slug}/${book.source}`} className="btn bg-[#FFBF00] border-none text-black hover:bg-[#e6ac00] rounded-full px-6 font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Read Books</Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center">
                                <div className="join">
                                    <button
                                        className="join-item btn"
                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        «
                                    </button>

                                    {/* Smart Pagination Logic - Show restricted set of pages if too many */}
                                    {totalPages <= 7 ? (
                                        [...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                className={`join-item btn ${currentPage === i + 1 ? 'btn-active bg-[#FFBF00] text-black border-[#FFBF00]' : ''}`}
                                                onClick={() => handlePageChange(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        ))
                                    ) : (
                                        <>
                                            {/* First Page */}
                                            <button
                                                className={`join-item btn ${currentPage === 1 ? 'btn-active bg-[#FFBF00] text-black border-[#FFBF00]' : ''}`}
                                                onClick={() => handlePageChange(1)}
                                            >
                                                1
                                            </button>

                                            {currentPage > 3 && <button className="join-item btn btn-disabled">...</button>}

                                            {/* Middle Pages */}
                                            {[...Array(totalPages)].map((_, i) => i + 1)
                                                .filter(p => p > 1 && p < totalPages && Math.abs(currentPage - p) <= 1)
                                                .map(p => (
                                                    <button
                                                        key={p}
                                                        className={`join-item btn ${currentPage === p ? 'btn-active bg-[#FFBF00] text-black border-[#FFBF00]' : ''}`}
                                                        onClick={() => handlePageChange(p)}
                                                    >
                                                        {p}
                                                    </button>
                                                ))
                                            }

                                            {currentPage < totalPages - 2 && <button className="join-item btn btn-disabled">...</button>}

                                            {/* Last Page */}
                                            <button
                                                className={`join-item btn ${currentPage === totalPages ? 'btn-active bg-[#FFBF00] text-black border-[#FFBF00]' : ''}`}
                                                onClick={() => handlePageChange(totalPages)}
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}

                                    <button
                                        className="join-item btn"
                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        »
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    )
    
}

export default function SearchResult() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResultContent />
        </Suspense>
    )
   
}