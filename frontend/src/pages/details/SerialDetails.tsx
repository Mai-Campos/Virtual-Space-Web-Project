import { useParams } from "react-router-dom";
import type { CompleteSerie } from "../../types/Types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function SerialDetails() {
  const params = useParams();

  const id = parseInt(params.id || "0", 10);

  const token = localStorage.getItem("accesToken");

  const [serieDetail, setSerieDetail] = useState<CompleteSerie | null>(null);

  useEffect(() => {
    const fetchSerie = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/series/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error("Error cargando serie");
        throw new Error("Error cargando serie");
      }

      const serie = await res.json();

      setSerieDetail(serie);
    };

    fetchSerie();
  }, [token, id]);

  return (
    <main className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-10">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-1 lg:col-span-1 flex justify-center md:justify-start">
            <img
              className="w-full max-w-sm bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl aspect-2/3"
              data-alt="The Witcher serieDetails poster with Geralt of Rivia"
              src={serieDetail?.coverImg}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-4 text-white">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-[-0.033em]">
              {serieDetail?.title}
            </h1>
            <div className="flex gap-3 flex-wrap">
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary px-4">
                <p className="text-white/90 text-sm font-medium leading-normal">
                  {serieDetail?.sizeGb} GB
                </p>
              </div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary px-4">
                <p className="text-white/90 text-sm font-medium leading-normal">
                  {serieDetail?.seasons} Temporadas
                </p>
              </div>
              <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary px-4">
                <p className="text-white/90 text-sm font-medium leading-normal">
                  {serieDetail?.platform}
                </p>
              </div>
            </div>
            <div className="flex gap-3 pt-2 flex-wrap">
              {serieDetail?.genres.map((genre, index) => (
                <div
                  key={index}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full border border-white/20 hover:bg-primary/20 hover:border-primary/50 transition-colors cursor-pointer px-4"
                >
                  <p className="text-white/90 text-sm font-medium leading-normal">
                    {genre.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="pt-4 max-w-2xl">
              <div className="border-0 rounded-2xl bg-gray-400/10 p-4 ">
                <p className="text-white/70 text-base leading-relaxed">
                  {serieDetail?.synopsis}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SerialDetails;
