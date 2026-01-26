import { useParams } from "react-router-dom";
import type { CompleteMovie } from "../../types/Types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function MovieDetails() {
  const params = useParams();

  const id = parseInt(params.id || "0", 10);

  const token = localStorage.getItem("accesToken");

  const [movieDetail, setMovieDetail] = useState<CompleteMovie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error("Error cargando película");
        throw new Error("Error cargando película");
      }

      const movie = await res.json();

      setMovieDetail(movie);
    };

    fetchMovie();
  }, [token, id]);

  return (
    <main className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[35%_65%] gap-8 lg:gap-12">
        <div className="w-full">
          <img
            className="aspect-2/3 w-full max-w-sm mx-auto md:max-w-none bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white/10 rounded-lg"
            data-alt="Póster de la película"
            src={movieDetail?.coverImg}
          />
        </div>
        <div className="flex flex-col space-y-6">
          <div className="pb-2">
            <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tighter">
              {movieDetail?.title}
            </h1>
            <p className="text-white/70 text-base font-normal leading-normal pt-2">
              <span className="text-primary">Dirigida por:</span>{" "}
              {movieDetail?.director}
            </p>
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold leading-tight tracking-tight mb-3">
              Sinopsis
            </h2>
            <div className="border-0 rounded-2xl bg-gray-400/10 p-4 ">
              <p className="text-white/80 text-base font-light leading-relaxed">
                {movieDetail?.synopsis}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-4 pt-2">
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">Géneros</h3>
              <div className="flex flex-wrap gap-2">
                {movieDetail?.genres.map((g) => (
                  <span
                    key={g.id}
                    className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">
                Peso del Archivo
              </h3>
              <p className="text-white/80 text-base font-light">
                {movieDetail?.sizeGb} GB
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MovieDetails;
