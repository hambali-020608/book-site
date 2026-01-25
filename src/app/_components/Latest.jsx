"use client"
import useSWR from "swr";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from "next/navigation";
const fetcher = (url) => fetch(url).then((r) => r.json())
export default function Latest() {
    const router = useRouter()

    const { data, error, isLoading } = useSWR(
    'https://www.dbooks.org/api/recent',
    fetcher
  )
//    if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error: {error.message}</div>
    
    return (
        <div className="py-20 bg-base-200/50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                            Fresh from the <span className="text-[#FFBF00]">Shelves</span>
                        </h2>
                        <p className="mt-2 text-base-content/60">Discover the latest additions to our curated library.</p>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex flex-col gap-4">
                                <div className="skeleton h-64 w-full rounded-2xl"></div>
                                <div className="skeleton h-4 w-3/4"></div>
                                <div className="skeleton h-4 w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="alert alert-error max-w-lg mx-auto">
                        <span>Error loading books. Please try again later.</span>
                    </div>
                ) : (
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
                        {data.books?.slice(0, 10).map((book) => (
                            <SwiperSlide key={book.id}>
                                <div className="group relative flex flex-col gap-3 h-full">
                                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-base-100 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                                            <button className="btn bg-[#FFBF00] border-none text-black hover:bg-[#e6ac00] rounded-full px-6 font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                Read Now
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-[#FFBF00] transition-colors" title={book.title}>
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-base-content/60 line-clamp-1">
                                            by {book.authors}
                                        </p>
                                        <button onClick={() => router.push(`/books/detail/${book.id}/dbooks`)} className="btn btn-sm bg-[#FFBF00] hover:bg-[#e6ac00] text-black border-none font-bold rounded-full px-6">Read Now</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    )
}