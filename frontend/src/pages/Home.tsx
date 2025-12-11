import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="grow">
      <div className="py-8 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-4">

          {/* TEXT AREA */}
          <div className="flex flex-col gap-6 text-center lg:text-left flex-1 lg:ml-20">
            <div className="flex flex-col gap-4">
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tighter">
                Tu portal al mejor contenido digital del mercado.
              </h2>

              <div className="w-20 sm:w-24 h-1 bg-primary my-2 mx-auto lg:mx-0"></div>

              <p className="text-white/80 text-base sm:text-lg font-normal leading-normal max-w-lg mx-auto lg:mx-0">
                Explora nuestro catálogo exclusivo - Reunimos el mejor contenido multimedia
                para los verdaderos amantes del cine, las series y los videojuegos.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start ">
              <Link to={'/catalog'} className="flex min-w-[84px] h-12 px-8 cursor-pointer items-center justify-center 
                rounded-lg bg-transparent text-white text-base font-bold 
                border-2 border-primary hover:bg-primary/20 transition-colors">
                Ver catálogo
              </Link>
            </div>
          </div>

          {/* IMAGE / LOGO AREA */}
          <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto lg:mr-20">
            <div className="relative w-full aspect-5/4 p-3 rounded-xl border border-primary 
              shadow-[0_0_12px_rgba(244,37,37,0.45)]">

              <div
                className="w-full h-full bg-center bg-cover rounded-lg flex items-center justify-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxwUalWeVtaSEr-Re_cFpj9Y-VAOZmwlPUMGMM23JIY3lo0btinUMi7vl6GiNpgT_O40ZEp2rtejxZxR63ZVPzbPHCHsH8ewcp2CIVFS-G2RreC6r3gTTBudzI_i_KCzJItOc1dawsYd7MTozFw231gmjEB8eLT6k8TqlZSKugVhdT2ltm5eUeBhM4A_jISFUfwo55MEk2eHztx-Qzv3_bfJiBFmK5wHpik9OXnHI5bUxS332kgXjibsqBKDhD-49eCnfFgBESer4')",
                }}
              >
                <div className="flex flex-col items-center gap-2 text-white text-center">
                  <div className="text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 640 640"><path fill="#f42525" d="M96 128C60.7 128 32 156.7 32 192L32 448C32 483.3 60.7 512 96 512L544 512C579.3 512 608 483.3 608 448L608 192C608 156.7 579.3 128 544 128L96 128zM112 192L144 192C152.8 192 160 199.2 160 208L160 240C160 248.8 152.8 256 144 256L112 256C103.2 256 96 248.8 96 240L96 208C96 199.2 103.2 192 112 192zM96 304C96 295.2 103.2 288 112 288L144 288C152.8 288 160 295.2 160 304L160 336C160 344.8 152.8 352 144 352L112 352C103.2 352 96 344.8 96 336L96 304zM208 192L240 192C248.8 192 256 199.2 256 208L256 240C256 248.8 248.8 256 240 256L208 256C199.2 256 192 248.8 192 240L192 208C192 199.2 199.2 192 208 192zM192 304C192 295.2 199.2 288 208 288L240 288C248.8 288 256 295.2 256 304L256 336C256 344.8 248.8 352 240 352L208 352C199.2 352 192 344.8 192 336L192 304zM208 384L432 384C440.8 384 448 391.2 448 400L448 432C448 440.8 440.8 448 432 448L208 448C199.2 448 192 440.8 192 432L192 400C192 391.2 199.2 384 208 384zM288 208C288 199.2 295.2 192 304 192L336 192C344.8 192 352 199.2 352 208L352 240C352 248.8 344.8 256 336 256L304 256C295.2 256 288 248.8 288 240L288 208zM304 288L336 288C344.8 288 352 295.2 352 304L352 336C352 344.8 344.8 352 336 352L304 352C295.2 352 288 344.8 288 336L288 304C288 295.2 295.2 288 304 288zM384 208C384 199.2 391.2 192 400 192L432 192C440.8 192 448 199.2 448 208L448 240C448 248.8 440.8 256 432 256L400 256C391.2 256 384 248.8 384 240L384 208zM400 288L432 288C440.8 288 448 295.2 448 304L448 336C448 344.8 440.8 352 432 352L400 352C391.2 352 384 344.8 384 336L384 304C384 295.2 391.2 288 400 288zM480 208C480 199.2 487.2 192 496 192L528 192C536.8 192 544 199.2 544 208L544 240C544 248.8 536.8 256 528 256L496 256C487.2 256 480 248.8 480 240L480 208zM496 288L528 288C536.8 288 544 295.2 544 304L544 336C544 344.8 536.8 352 528 352L496 352C487.2 352 480 344.8 480 336L480 304C480 295.2 487.2 288 496 288z"/></svg>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight drop-shadow-[0_2px_3px_rgba(0,0,0,0.45)]">
                    DS
                  </h3>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      </div>
    </main>
  );
}

export default Home;
