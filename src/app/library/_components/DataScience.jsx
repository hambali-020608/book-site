
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CardBook from "@/app/_components/CardBook";

const fetcher = (url) => fetch(url).then((r) => r.json());
import useSWR from "swr";

export default function DataScience() {
    const { data: ComScienceData, error: ComScienceError, isLoading: ComScienceIsLoading } = useSWR('https://ebook-scraper.vercel.app/api/books/v1/get-books?subCategoryPath=/dbAnalysisMiningBooks.html', fetcher);
    return (
       <div className='mt-10'>
                    <div className="flex flex-wrap items-end justify-between gap-4 mb-8 border-b border-base-content/10 pb-4">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                            Data Science<span className="text-[#FFBF00]"> Books</span>
                        </h2>
                        <Link href="/library/mathematics" className="group flex items-center gap-2 pb-1">
                            <span className="text-sm font-semibold uppercase tracking-wider opacity-70 group-hover:opacity-100 group-hover:text-[#FFBF00] transition-all">See All</span>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-base-content/20 bg-transparent group-hover:bg-[#FFBF00] group-hover:border-[#FFBF00] group-hover:text-black transition-all">
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
                            </div>
                        </Link>
                    </div>
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
                        {ComScienceData?.slice(0, 10).map((book) => (

                            <SwiperSlide key={book.id}>

                                <CardBook title={book.title} image={book.imgUrl} slug={book.detailUrl} source="freeCom" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
    )
}