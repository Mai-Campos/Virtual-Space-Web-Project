import type { MovieDetailsProps } from "../../types/Types";

function MovieDetails(movieDetailsProps: MovieDetailsProps) {
  return (
    <main className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[35%_65%] gap-8 lg:gap-12">
        <div className="w-full">
          <img
            className="aspect-2/3 w-full max-w-sm mx-auto md:max-w-none bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white/10 rounded-lg"
            data-alt="Póster de la película"
            src={movieDetailsProps.posterUrl}
          />
        </div>
        <div className="flex flex-col space-y-6">
          <div className="pb-2">
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tighter">
              {movieDetailsProps.title}
            </h1>
            <p className="text-white/70 text-base font-normal leading-normal pt-2">
              <span className="text-primary">Dirigida por:</span>{" "}
              {movieDetailsProps.director}
            </p>
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold leading-tight tracking-tight mb-3">
              Sinopsis
            </h2>
            <p className="text-white/80 text-base font-light leading-relaxed">
              {movieDetailsProps.sinopsis}
            </p>
          </div>
          <div className="flex flex-col space-y-4 pt-2">
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">Géneros</h3>
              <div className="flex flex-wrap gap-2">
                {movieDetailsProps.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full bg-primary"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">
                Peso del Archivo
              </h3>
              <p className="text-white/80 text-base font-light">
                {movieDetailsProps.fileSize} GB
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
