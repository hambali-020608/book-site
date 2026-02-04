"use client"
import useSWR from "swr";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from "next/navigation";
import CardBook from "./CardBook";
import { useState } from "react";
const fetcher = (url) => fetch(url).then((r) => r.json())
export default function ComScienceBook() {
    const router = useRouter()
    
    const{data:subject,error:errorSubject,isLoading:isLoadingSubject} = useSWR(
        'https://ebook-scraper.vercel.app/api/books/v1/subcategory?categoryPath=compscCategory.html',
        fetcher
    )

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryName,setSelectedCategoryName] = useState(null);
    const { data:books, error, isLoading } = useSWR(
    `https://ebook-scraper.vercel.app/api/books/v1/get-books?subCategoryPath=${selectedCategory ? selectedCategory : '/compscAlgorithmBooks.html'}`,
    fetcher
  )
//    if (isLoading) return <div>Loading...</div>
//   if (error) return <div>Error: {error.message}</div>
    
    return (
        <section className="py-20 bg-base-200/50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {console.log(subject)}
                {console.log(books)}
                {/* Section Header */}
                <div className="mb-12">
                    <div className="text-center md:text-left ">
                        <div className="flex justify-between ">
                           
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                        Computer Science<span className="text-[#FFBF00]"> Books</span>
                        </h2>
     <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">{selectedCategory ? selectedCategoryName : 'Category'}</div>
  
 
  <ul 
    tabIndex={0} 
    className="dropdown-content menu p-2 shadow-sm bg-base-100 rounded-box z-[50] w-52 h-96 overflow-y-auto flex-nowrap"
  >
    {subject?.map((item, index) => (
      <li key={index}>
        <button onClick={()=>{setSelectedCategory(item.subCategoryUrl),setSelectedCategoryName(item.subject)}}>{item.subject}</button>
      </li>
    ))}
  </ul>
</div>

                        </div>
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
                        {books?.slice(0, 10).map((book) => (
                            <SwiperSlide key={book.id}>

                                <CardBook title={book.title} image={book.imgUrl} authors={book.authors} slug={book.detailUrl} source="freeCom" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    )
}