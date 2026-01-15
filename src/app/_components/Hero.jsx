import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Hero() {
 
  const router = useRouter()
  const [search,setSearch] = useState("")

  return (
    <div className="hero bg-base-200 min-h-screen font-sans">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 lg:gap-20 max-w-7xl px-6 lg:px-8">

        {/* Right Content: Image & 3D Effect */}
        <div className="hover-3d relative z-10">
          <figure className="max-w-sm lg:max-w-md xl:max-w-lg drop-shadow-2xl">
            <img src="/img/book3.png" alt="Book Treasure 3D" className="w-full h-auto object-contain" />
          </figure>
          {/* Preserving 3D effect layers */}
          <div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div>
        </div>

        {/* Left Content: Text & CTA */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-base-content leading-tight tracking-tight mb-6">
            BOOKS ARE THE <br className="hidden lg:block" />
            <span className="text-[#FFBF00]">REAL TREASURE</span>
          </h1>

          <p className="py-6 text-lg text-base-content/70 leading-relaxed max-w-xl mx-auto lg:mx-0">
            Buka jendela dunia dan temukan petualangan tak terbatas di setiap halaman.
            Mulailah perjalanan literasi Anda hari ini dan biarkan imajinasi membawa Anda lebih jauh.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div className="join shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-full bg-base-100 p-1">
              <label className="input input-ghost flex items-center gap-2 join-item pl-4 pr-2">
                <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} className="grow placeholder:text-base-content/40" placeholder="Search Books..." required />
              </label>
              <button onClick={() => router.push(`/search?q=${search}`)} className="btn bg-[#FFBF00] hover:bg-[#e6ac00] text-black border-none join-item rounded-r-full px-8 text-base font-semibold">
                Search
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}