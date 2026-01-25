export default function ReadButton({isDropdown=false,url}){

    if(isDropdown){
        return (
            <div className="dropdown dropdown-center">
                 <button tabIndex={0} role="button" target="_blank" rel="noopener noreferrer" className="btn bg-[#FFBF00] btn-lg h-14 px-8 rounded-full text-lg shadow-lg shadow-[#FFBF00]/20 hover:shadow-[#FFBF00]/40 transition-all hover:scale-105 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                Read Now
              </button>
  {/* <div tabIndex={0} role="button" className="btn m-1">Click  ⬇️</div> */}
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    {url.map((u)=>{
        return (
         <li><a href={u.url}>{u.label}</a></li>
        )
    })}
  </ul>
</div>

            
        )
    }
    else{
        return (
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn bg-[#FFBF00] btn-lg h-14 px-8 rounded-full text-lg shadow-lg shadow-[#FFBF00]/20 hover:shadow-[#FFBF00]/40 transition-all hover:scale-105 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
            Read Now
          </a>
        )
    }
  
}