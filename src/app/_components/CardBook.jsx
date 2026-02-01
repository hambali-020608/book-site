export default function CardBook({title,image,authors,slug,source}) {
    return (
      <div className="group relative flex flex-col gap-3 h-full">
                                    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-base-100 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                                        <img
                                            src={image}
                                            alt={title}
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
                                        <h3 className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-[#FFBF00] transition-colors" title={title}>
                                            {title}
                                        </h3>
                                        <p className="text-sm text-base-content/60 line-clamp-1">
                                            by {authors}
                                        </p>
                                        <button onClick={() => router.push(`/books/detail/${slug}/${source}`)} className="btn btn-sm bg-[#FFBF00] hover:bg-[#e6ac00] text-black border-none font-bold rounded-full px-6">Read Now</button>
                                    </div>
                                </div>
    )
}