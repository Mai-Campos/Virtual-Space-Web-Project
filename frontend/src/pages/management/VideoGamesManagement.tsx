import { useState } from "react";

function VideoGamesManagement() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value && !selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    }
    // opcional: resetear select a placeholder
    e.target.value = "";
  };

  const removeCategory = (cat) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== cat));
  };

  return (
    <main className="flex-1 mt-6 p-4">
      <div className="mt-8 space-y-12 p-4">
        {/* FORMULARIO */}
        <section>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
            Añadir / Editar Videojuego
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
                    Categorías
                  </p>
                  <select
                    className="form-select flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-black/20 focus:border-primary h-12 p-3 text-base font-normal leading-normal"
                    onChange={handleCategoryChange}
                  >
                    <option value="">Selecciona categoría</option>
                    <option value="Acción">Acción</option>
                    <option value="Aventura">Aventura</option>
                    <option value="RPG">RPG</option>
                    <option value="Estrategia">Estrategia</option>
                    <option value="Simulación">Simulación</option>
                  </select>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="flex items-center gap-1 bg-primary/80 text-white text-sm px-3 py-1 rounded-full"
                      >
                        {cat}
                        <button
                          type="button"
                          onClick={() => removeCategory(cat)}
                          className="text-white/70 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </label>
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className="flex max-w-sm items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 px-8 hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Guardar Videojuego
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* LISTADO */}
        <section>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
            Listado de Videojuegos
          </h2>
          <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-lg">
            <table className="w-full text-sm text-left text-white/80">
              <thead className="text-xs text-white uppercase bg-white/5">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Foto de Portada</th>
                  <th className="px-6 py-3">Título</th>
                  <th className="px-6 py-3">Sinopsis</th>
                  <th className="px-6 py-3 text-center">Peso (GB)</th>
                  <th className="px-6 py-3">Categorías</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

export default VideoGamesManagement;
