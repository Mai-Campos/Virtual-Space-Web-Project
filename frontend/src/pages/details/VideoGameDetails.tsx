import { videogames } from "../../data/videogames";
import { useParams } from "react-router-dom";

function VideoGameDetails() {
  const params = useParams();

  const id = parseInt(params.id || "0", 10);

  const videoGame = videogames.find((v) => v.id === id);

  return (
    <main className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[35%_65%] gap-8 lg:gap-12">
        <div className="w-full">
          <img
            className="aspect-2/3 w-full max-w-sm mx-auto md:max-w-none bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white/10 rounded-lg"
            data-alt="Póster de la película"
            src={videoGame?.imageUrl}
          />
        </div>
        <div className="flex flex-col space-y-6">
          <div className="pb-2">
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tighter">
              {videoGame?.nombre}
            </h1>
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold leading-tight tracking-tight mb-3">
              Sinopsis
            </h2>
            <div className="border rounded-2xl bg-gray-400/10 p-4 ">
              <p className="text-white/80 text-base font-light leading-relaxed">
                {videoGame?.sinopsis}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-4 pt-2">
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Categorías
              </h3>
              <div className="flex flex-wrap gap-2">
                {videoGame?.categorias.map((category, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full bg-primary"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">
                Peso del Archivo
              </h3>
              <p className="text-white/80 text-base font-light">
                {videoGame?.peso} GB
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default VideoGameDetails;
