import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <main className="grow flex items-center justify-center relative overflow-hidden py-10 md:py-20">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full"></div>
      </div>
      <div className="layout-content-container flex flex-col max-w-[960px] w-full z-10 px-6">
        <div className="flex flex-col items-center gap-10 md:gap-14">
          <div className="relative flex flex-col items-center justify-center text-center">
            <h1 className="text-[140px] md:text-[240px] font-bold leading-none tracking-tighter text-primary neon-text select-none">
              404
            </h1>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&amp;w=2670&amp;auto=format&amp;fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
              data-alt="Abstract digital glitch texture overlay"
            ></div>
            <div className="h-1 w-32 bg-white/20 mt-4 rounded-full"></div>
          </div>

          <div className="flex max-w-[580px] flex-col items-center gap-6 text-center">
            <div className="flex flex-col gap-3">
              <p className="text-white text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                Oops! Enlace Roto.
              </p>
              <p className="text-[#cb9090] text-base md:text-lg font-normal leading-relaxed">
                Parece que te has perdido en el ciberespacio. El contenido
                digital que buscas ha sido eliminado o nunca existió.
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <Link
                to={"/home"}
                className="flex min-w-40 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white text-sm font-bold tracking-[0.05em] uppercase"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PageNotFound;
