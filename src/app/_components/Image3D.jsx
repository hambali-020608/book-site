export default function Image3D({image}){
    return(
         <div className="hover-3d relative z-10">
          <figure className="max-w-sm lg:max-w-md xl:max-w-lg drop-shadow-2xl">
            <img src={image} alt="Book Treasure 3D" className="w-96 h-auto object-contain" />
          </figure>
          {/* Preserving 3D effect layers */}
          <div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div>
        </div>

    )
}