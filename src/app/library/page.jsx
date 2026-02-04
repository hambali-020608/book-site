"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import CardBook from "../_components/CardBook";
import useSWR from "swr";
import { useState } from "react";
import { Search, Filter, Grid, List, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ListViewBook from '../_components/ListViewBook';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Library() {
    const router = useRouter();
    const { data, error, isLoading } = useSWR('https://www.dbooks.org/api/recent', fetcher);
    const { data: mathData, error: mathError, isLoading: mathIsLoading } = useSWR('', fetcher);
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
                    viewMode == "grid" ? (
                        <>
                         <Swiper
                                                spaceBetween={20}
                                                slidesPerView={2}
                                                breakpoints={{
                                                    640: { slidesPerView: 2 },
                                                    768: { slidesPerView: 3 },
                                                    1024: { slidesPerView: 4 },
                                                    1280: { slidesPerView: 5 },
                                                }}
                                                grabCursor={true}
                                                className="w-full py-4 px-2"
                                            >
                                                {data?.books?.slice(0, 10).map((book) => (
                                                    <SwiperSlide key={book.id}>
                        
                                                        <CardBook title={book.title} image={book.image} authors={book.authors} slug={book.id} source="dbooks" />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                        </>
                        
                    ) : (
                        <>
                        {data?.books?.slice(0, 10).map((book) => (
                            <ListViewBook key={book.id} book={book} />
                        ))}
                        </>
                    )
                    // <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1 gap-4'}`}>
                        
                    //     {data?.books?.map((book) => (
                    //         <div key={book.id} className={viewMode === 'list' ? 'col-span-full' : ''}>
                    //             {viewMode === 'grid' ? (
                                    
                    //                 <CardBook
                    //                     title={book.title}
                    //                     image={book.image}
                    //                     authors={book.authors}
                    //                     slug={book.id}
                    //                     source="dbooks"
                    //                 />
                    //             ) : (
                    //                 // List View Item
                    //                <ListViewBook book={book} />
                    //             )}
                    //         </div>
                    //     ))}
                    // </div>
                )}
                <div>
                    <h1>Mathematics</h1>
                    <Swiper
                                                spaceBetween={20}
                                                slidesPerView={2}
                                                breakpoints={{
                                                    640: { slidesPerView: 2 },
                                                    768: { slidesPerView: 3 },
                                                    1024: { slidesPerView: 4 },
                                                    1280: { slidesPerView: 5 },
                                                }}
                                                grabCursor={true}
                                                className="w-full py-4 px-2"
                                            >
                                                {data?.books?.slice(0, 10).map((book) => (
                                                    <SwiperSlide key={book.id}>
                        
                                                        <CardBook title={book.title} image={book.image} authors={book.authors} slug={book.id} source="dbooks" />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                </div>
            </main>

            <Footer />
        </div>
    );
}