import ReadButton from "./ReadButton";

export default function CardDetail({ book }) {

    return (
        // {console.log(book)}
          
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* Left Column: Book Cover */}
          <div className="">
            {console.log(book)}
          
            <div className="hover-3d">
  {/* content */}
  <figure className="max-w-100 rounded-2xl">
    <img src={book.image} alt="3D card" />
  </figure>
  {/* 8 empty divs needed for the 3D effect */}
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
      
            <div className="bg-base-200/50 backdrop-blur-md rounded-xl p-4 border border-base-content/5 text-center lg:hidden">
              <p className="text-sm text-base-content/60">Tap cover to preview</p>
            </div>
          </div>

          {/* Right Column: Book Details */}
          <div className="flex-1 space-y-8 lg:pt-2">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 delay-100 duration-700">
                <span className="badge badge-lg badge-neutral bg-base-200 border-none text-base-content/70 font-medium px-4">E-Book</span>
                {/* {book.status && <span className="badge badge-lg badge-primary badge-outline px-4">{book.status}</span>} */}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-base-content animate-in fade-in slide-in-from-bottom-2 delay-150 duration-700">
                {book.title}
              </h1>
              <p className="text-xl md:text-2xl text-base-content/60 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-2 delay-200 duration-700">
                {book.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-base-content/10 animate-in fade-in slide-in-from-bottom-2 delay-300 duration-700">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider font-bold text-base-content/40">Author</span>
                <span className="text-lg font-medium text-base-content">{book.authors}</span>
              </div>
              <div className="w-px h-10 bg-base-content/10 hidden sm:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider font-bold text-base-content/40">Publisher</span>
                <span className="text-lg font-medium text-base-content">{book.publisher || "Unknown"}</span>
              </div>
              <div className="w-px h-10 bg-base-content/10 hidden sm:block"></div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider font-bold text-base-content/40">Year</span>
                <span className="text-lg font-medium text-base-content">{book.year || "N/A"}</span>
              </div>
              <div className="w-px h-10 bg-base-content/10 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-bold text-base-content/40">Pages</span>
                <span className="text-lg font-medium text-base-content">{book.pages || "N/A"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2 animate-in fade-in slide-in-from-bottom-2 delay-500 duration-700">
              <ReadButton url={book.url} isDropdown={book.source === 'freeCom' ? true : false} />
             
              {/* <a href={book.download} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg h-14 px-8 rounded-full text-lg border-base-content/20 hover:bg-base-content/5 hover:border-base-content transition-all hover:scale-105 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                Download
              </a> */}
            </div>

            <div className="pt-8 animate-in fade-in slide-in-from-bottom-2 delay-700 duration-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                Description
              </h3>
              <div className="text-lg text-base-content/80 max-w-none leading-relaxed space-y-4">
                <p>{book.description || "No description available for this book."}</p>
              </div>
            </div>
          </div>
        </div>
        
    )
}