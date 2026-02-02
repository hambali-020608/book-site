"use client";

import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import CardBook from "../_components/CardBook";
import useSWR from "swr";
import { useState } from "react";
import { Search, Filter, Grid, List, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Library() {
    const router = useRouter();
    const { data, error, isLoading } = useSWR('https://www.dbooks.org/api/recent', fetcher);
    const [viewMode, setViewMode] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            <Navbar />

            {/* Hero / Header Section */}
            <div className="bg-base-200/50 pt-32 pb-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                                Library <span className="text-[#FFBF00]">collection</span>
                            </h1>
                            <p className="mt-4 text-lg text-base-content/70 max-w-2xl">
                                Explore our extensive collection of digital books. From classics to contemporary masterpieces.
                            </p>
                        </div>

                        {/* Search Widget */}
                        <form onSubmit={handleSearch} className="w-full md:w-auto min-w-[300px]">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-base-content/40 group-focus-within:text-[#FFBF00] transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    className="input input-bordered w-full pl-10 bg-base-100 focus:border-[#FFBF00] focus:ring-1 focus:ring-[#FFBF00] transition-all"
                                    placeholder="Search books, authors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="border-b border-base-300 bg-base-100 sticky top-[64px] z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button className="btn btn-sm btn-ghost gap-2">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                        <div className="hidden sm:flex text-sm text-base-content/60">
                            Showing {data?.books?.length || 0} books
                        </div>
                    </div>

                    <div className="join">
                        <button
                            className={`join-item btn btn-sm ${viewMode === 'grid' ? 'btn-active bg-[#FFBF00] text-black border-none' : 'btn-ghost'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            className={`join-item btn btn-sm ${viewMode === 'list' ? 'btn-active bg-[#FFBF00] text-black border-none' : 'btn-ghost'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-grow max-w-7xl mx-auto px-6 lg:px-8 py-12 w-full">
                {isLoading ? (
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}`}>
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <div className={`skeleton w-full rounded-2xl ${viewMode === 'grid' ? 'h-64' : 'h-32'}`}></div>
                                <div className="skeleton h-4 w-3/4"></div>
                                <div className="skeleton h-4 w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="alert alert-error max-w-lg mx-auto">
                        <span>Error loading library content. Please try again.</span>
                    </div>
                ) : (
                    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1 gap-4'}`}>
                        {data?.books?.map((book) => (
                            <div key={book.id} className={viewMode === 'list' ? 'col-span-full' : ''}>
                                {viewMode === 'grid' ? (
                                    <CardBook
                                        title={book.title}
                                        image={book.image}
                                        authors={book.authors}
                                        slug={book.id}
                                        source="dbooks"
                                    />
                                ) : (
                                    // List View Item
                                    <div className="flex gap-4 p-4 rounded-xl bg-base-200 hover:bg-base-300 transition-colors group cursor-pointer" onClick={() => router.push(`/books/detail/${book.id}/dbooks`)}>
                                        <div className="w-24 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                                            <img src={book.image} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="flex flex-col justify-center flex-grow">
                                            <h3 className="text-xl font-bold group-hover:text-[#FFBF00] transition-colors">{book.title}</h3>
                                            <p className="text-base-content/60">{book.authors}</p>
                                            <div className="mt-2">
                                                <span className="badge badge-outline">Book</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center px-4">
                                            <button className="btn bg-[#FFBF00] border-none text-black hover:bg-[#e6ac00] btn-sm rounded-full">
                                                Read
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}