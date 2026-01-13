export default function Hero(){
return (
    <div className="hero bg-base-200 min-h-screen mx-auto">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src="/img/book3.png"
      className="max-w-xl"
    />
    <div>
      <h1 className="text-5xl font-bold text-[#FFBF00]">BOOKS ARE THE REAL TREASURE</h1>
      <p className="py-6">
Buka jendela dunia dan temukan petualangan tak terbatas di setiap halaman. Mulailah perjalanan literasi Anda hari ini dan biarkan imajinasi membawa Anda lebih jauh.

      </p>
      <button className="btn btn-warning">Get Started</button>
    </div>
  </div>
</div>
)
}