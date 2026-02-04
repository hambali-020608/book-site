
import { BookOpen } from "lucide-react"
export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-content/10">
      <div className="navbar max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex-none">
    <button className="btn btn-square btn-ghost">
           <BookOpen className="w-6 h-6 text-[#FFBF00]" />
    </button>
  </div>
        <div className="flex-1">
          <a className="text-2xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">
            Vidya<span className="text-[#FFBF00]">Hub</span>
          </a>
        </div>
        <div className="flex-none hidden md:block">
          <ul className="menu menu-horizontal px-1 gap-2 font-medium text-base-content/80">
            <li><a href="/" className="hover:text-[#FFBF00] hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors">Home</a></li>
            <li><a href="/library" className="hover:text-[#FFBF00] hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors">Library</a></li>
            <li><a className="hover:text-[#FFBF00] hover:bg-transparent focus:bg-transparent active:bg-transparent transition-colors">Categories</a></li>
          </ul>
        </div>
        <div className="flex-none ml-4">
          
        </div>
      </div>
    </div>
  )
}