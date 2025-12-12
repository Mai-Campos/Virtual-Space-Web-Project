import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center p-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

      <div
        className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"
        data-alt="Noise texture overlay"
      ></div>
      <div className="relative z-10 layout-content-container flex flex-col items-center max-w-[960px] w-full animate-[fadeIn_0.5s_ease-out]">
        <div className="relative flex items-center justify-center mb-6 select-none">
          <h1 className="text-[120px] md:text-[200px] font-bold leading-none text-white/5 tracking-tighter mix-blend-overlay">
            403
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex items-center justify-center size-20 md:size-40 rounded-full bg-black/50 border border-primary/20 shadow-[0_0_60px_rgba(244,37,37,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path
                  className="text-5xl text-primary drop-shadow-[0_0_10px_rgba(244,37,37,0.8)]"
                  fill="currentColor"
                  d="M256 160L256 224L384 224L384 160C384 124.7 355.3 96 320 96C284.7 96 256 124.7 256 160zM192 224L192 160C192 89.3 249.3 32 320 32C390.7 32 448 89.3 448 160L448 224C483.3 224 512 252.7 512 288L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 288C128 252.7 156.7 224 192 224z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex max-w-[520px] flex-col items-center gap-6 text-center z-20">
          <div>
            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-2">
              Error de Permisos
            </p>
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight drop-shadow-lg">
              Acceso Denegado
            </h2>
          </div>
          <p className="text-gray-400 text-base md:text-lg font-normal leading-relaxed">
            Lo sentimos, pero no tienes los permisos necesarios para acceder a
            este contenido digital. Esta zona es restringida.
          </p>

          <div className="h-px w-24 bg-linear-to-r from-transparent via-primary/50 to-transparent my-2"></div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:justify-center pt-2">
            <Link to={"/login"}>
              <button className="w-full sm:w-auto flex min-w-40 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-red-600 transition-all duration-300 text-white text-sm font-bold tracking-[0.015em] shadow-[0_0_20px_rgba(244,37,37,0.25)] hover:shadow-[0_0_30px_rgba(244,37,37,0.5)] transform hover:-translate-y-0.5">
                <span className="truncate">Iniciar Sesión</span>
              </button>
            </Link>

            <Link to="/home">
              <button className="w-full sm:w-auto flex min-w-40 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-transparent border border-[#492222] hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-white text-sm font-bold tracking-[0.015em]">
                <span className="truncate">Volver al Inicio</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default UnauthorizedPage;
