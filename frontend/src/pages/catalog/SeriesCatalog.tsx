import { useState } from "react";
import MultiSelect from "../../components/MultiSelect";

function SeriesCatalog() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const genreOptions = ["Terror", "Acción", "Aventura", "Drama", "Bélico"];

  return (
    <main>
      <div className="flex flex-col sm:flex-row gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full grow">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <input
              className="form-input flex min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white/5 focus:border-none h-full placeholder:text-white/50 px-4 pl-2 text-base font-normal leading-normal"
              placeholder="Buscar por título"
            />
          </div>
        </label>

        <MultiSelect
          options={genreOptions}
          label="Géneros"
          selected={selectedGenres}
          setSelected={setSelectedGenres}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        <div className="flex flex-col bg-white/5 rounded-lg overflow-hidden group">
          <div className="relative overflow-hidden">
            <img
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              data-alt="Futuristic cityscape at night with neon lights"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuClLKrjnsTr9cQlGcsZzHJz4uZFAdAa0PobMX4zs4ZGdDOzJWd7GV8Sz-SLcPUJ-UElb6cWVhJmithwagBPdoqQnClyZGD2LJX6EAxhRk-PHKIZJaLTdZ046wt-LWhqNDazkomRkVuJmpieKhHSnvbxVwmXlyotSUndwevnhEd60c7kFTQxEuATZMw_YkHw6Bp3Aey-_NW5Huoae4gUvPqQ6OqKfC4ZDlVviNfLQbIZ3_nj7c0ELzHEJNBb36D3Qaw5kpuHuRjFqy8"
            />
          </div>
          <div className="p-4 flex flex-col grow">
            <h3 className="text-white text-lg font-bold">Cyberpunk Runners</h3>
            <p className="text-white/70 text-sm mt-2 grow">
              En una metrópolis distópica, un equipo de mercenarios debe navegar
              por un mundo de implantes cibernéticos y conspiraciones
              corporativas.
            </p>
            <button className="mt-4 w-full flex items-center justify-center rounded-md h-10 bg-primary/80 hover:bg-primary text-white text-sm font-bold transition-colors">
              Ver Detalles
            </button>
          </div>
        </div>

        <div className="flex flex-col bg-white/5 rounded-lg overflow-hidden group">
          <div className="relative overflow-hidden">
            <img
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              data-alt="Ancient ruins in a lush jungle"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxGmrjaI4vxBiiwGHChFRWpqiqDF0BGR5j-2wfDimhPSgUHZv6OtXz-NRm2R5T_xXsfb94oLLe0cDPkZnfs8hswLrTDJ-RLs8hCLNNI1Lz1EtOMKTsrfSfocKSzxek2cutkLtYmhpatQgD-sA-WZEk4E2JIe_rQow0zrOF_wOPnVmb_M_sFw6YOsULzmtnfIoFA-y8jFEi2nxdA0N5RCzbM2CHprv5bmyjSXXZL--Gx3kheBhIifASKg52mODu-ll1pJLNlR-AKSg"
            />
          </div>
          <div className="p-4 flex flex-col grow">
            <h3 className="text-white text-lg font-bold">El Orbe Perdido</h3>
            <p className="text-white/70 text-sm mt-2 grow">
              Una intrépida arqueóloga se embarca en una peligrosa búsqueda para
              encontrar un artefacto antiguo con el poder de cambiar el mundo.
            </p>
            <button className="mt-4 w-full flex items-center justify-center rounded-md h-10 bg-primary/80 hover:bg-primary text-white text-sm font-bold transition-colors">
              Ver Detalles
            </button>
          </div>
        </div>

        <div className="flex flex-col bg-white/5 rounded-lg overflow-hidden group">
          <div className="relative overflow-hidden">
            <img
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              data-alt="Man looking up at a sky full of abstract data visualizations"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB86sk0I4wNu6V9JgHNc9b0H25aseGwzjGjoPoE4PmkQ4Mx89BzI80QWBFRISU_aw_cqTBWInTp8iHhkZCND0yFgqVDhV2tRw7Yp4dUrq9hfrMbI6AwxcyCIzc7nx6vRFQLqg9TmGRQ2SQtrdDD2qNWA5Vp6t6TbTgoHogKn4Nn2u0Khxhq-4yb9wtuAyll0uyPW8JQDQa2wuganCE7Kur5uDLEB8wffC6dbt6i2X4ZNWNtpvTeCoLzoH5ZdhIFSSL_Q-dvljxCfys"
            />
          </div>
          <div className="p-4 flex flex-col grow">
            <h3 className="text-white text-lg font-bold">
              La Paradoja del Tiempo
            </h3>
            <p className="text-white/70 text-sm mt-2 grow">
              Un físico descubre accidentalmente el viaje en el tiempo y debe
              arreglar la historia antes de que se desmorone por completo.
            </p>
            <button className="mt-4 w-full flex items-center justify-center rounded-md h-10 bg-primary/80 hover:bg-primary text-white text-sm font-bold transition-colors">
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SeriesCatalog;
