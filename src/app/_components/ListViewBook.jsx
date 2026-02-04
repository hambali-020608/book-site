export default function ListViewBook({book}) {
    return(
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
    )
}