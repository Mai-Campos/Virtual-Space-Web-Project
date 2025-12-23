import { useState } from "react";
import MultiSelect from "../../components/MultiSelect";
import { movies } from "../../data/movies";
import Pagination from "../../components/Pagination";
import { usePagination } from "../../hooks/PaginationHook";

function MoviesManagement() {
  const [selectedGenres, setselectedGenres] = useState<string[]>([]);

  const genresOptions = ["Terror", "Acción", "Aventura", "Drama", "Bélico"];

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedMovies,
    setCurrentPage,
  } = usePagination(movies, 5);

  return (
    <main className="flex-1 mt-6 p-4">
      <div className="mt-8 space-y-12 p-4">
        <section>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
            Añadir / Editar Película
          </h2>
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col">
                <label className="flex flex-col">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Título
                  </p>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-black/20 focus:border-primary h-12 placeholder:text-white/40 p-3 text-base font-normal leading-normal"
                    placeholder="e.g., Cyberpunk 2077"
                    name="title"
                  />
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm font-medium leading-normal pb-2">
                  Director
                </label>
                <select
                  className="form-select flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-black/20 focus:border-primary h-12 p-3 text-base font-normal leading-normal"
                  defaultValue={"Seleccionar director"}
                >
                  <option disabled>Seleccionar director</option>
                  <option className="text-primary" value="1">
                    Cristopher Nolan
                  </option>
                  <option className="text-primary" value="2">
                    Guillermo del Toro
                  </option>
                  <option className="text-primary" value="3">
                    Quentin Tarantino
                  </option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="flex flex-col">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Peso en GB
                  </p>
                  <input
                    type="number"
                    name="weight"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-black/20 focus:border-primary h-12 placeholder:text-white/40 p-3 text-base font-normal leading-normal"
                    placeholder="e.g., 70.5"
                  />
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="flex flex-col">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Sinopsis
                  </p>
                  <textarea
                    name="synopsis"
                    className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-black/20 focus:border-primary min-h-28 placeholder:text-white/40 p-3 text-base font-normal leading-normal"
                    placeholder="Describe brevemente el videojuego..."
                  />
                </label>
              </div>

              <div className="flex flex-col">
                <label className="flex flex-col">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Foto de Portada
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-black/20 focus:border-primary h-12 placeholder:text-white/40 p-3 text-base font-normal leading-normal"
                  />
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="flex flex-col">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Géneros
                  </p>
                  <MultiSelect
                    options={genresOptions}
                    label="Géneros"
                    selected={selectedGenres}
                    setSelected={setselectedGenres}
                  />
                </label>
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className="flex max-w-sm items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 px-8 hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Guardar Película
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* LISTADO */}
        <section>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
            Listado de Películas
          </h2>
          <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white/5 border border-white/10 rounded-lg">
            <table className="w-full min-w-[900px] text-sm text-left text-white/80">
              <thead className="text-xs text-white uppercase bg-white/5">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Foto de Portada</th>
                  <th className="px-6 py-3">Título</th>
                  <th className="px-6 py-3">Sinopsis</th>
                  <th className="px-6 py-3">Director</th>
                  <th className="px-6 py-3 text-center">Peso (GB)</th>
                  <th className="px-6 py-3">Géneros</th>
                  <th className="px-6 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMovies.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <td className="px-6 py-4">{m.id}</td>
                    <td className="px-6 py-4">
                      <img
                        src={m.imageUrl}
                        alt={m.nombre}
                        className="w-16 h-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {m.nombre}
                    </td>
                    <td className="px-6 py-4 max-w-xs ">{m.sinopsis}</td>
                    <td className="px-6 py-4">{m.Director}</td>
                    <td className="px-6 py-4 text-center">{m.peso}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {m.generos.map((g) => (
                          <span
                            key={g}
                            className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-3">
                        {/*  EDITAR */}
                        <button
                          title="Editar"
                          className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                          onClick={() => console.log("Editar", m.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            viewBox="0 0 640 640"
                          >
                            <path
                              fill="#74C0FC"
                              d="M100.4 417.2C104.5 402.6 112.2 389.3 123 378.5L304.2 197.3L338.1 163.4C354.7 180 389.4 214.7 442.1 267.4L476 301.3L442.1 335.2L260.9 516.4C250.2 527.1 236.8 534.9 222.2 539L94.4 574.6C86.1 576.9 77.1 574.6 71 568.4C64.9 562.2 62.6 553.3 64.9 545L100.4 417.2zM156 413.5C151.6 418.2 148.4 423.9 146.7 430.1L122.6 517L209.5 492.9C215.9 491.1 221.7 487.8 226.5 483.2L155.9 413.5zM510 267.4C493.4 250.8 458.7 216.1 406 163.4L372 129.5C398.5 103 413.4 88.1 416.9 84.6C430.4 71 448.8 63.4 468 63.4C487.2 63.4 505.6 71 519.1 84.6L554.8 120.3C568.4 133.9 576 152.3 576 171.4C576 190.5 568.4 209 554.8 222.5C551.3 226 536.4 240.9 509.9 267.4z"
                            />
                          </svg>
                        </button>

                        {/* 🗑ELIMINAR */}
                        <button
                          title="Eliminar"
                          className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                          onClick={() => console.log("Eliminar", m.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="20"
                            viewBox="0 0 640 640"
                          >
                            <path
                              fill="#e60f0f"
                              d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}

export default MoviesManagement;
