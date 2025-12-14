import { useState } from "react";
import MultiSelect from "../../components/MultiSelect";
import { videogames } from "../../data/videogames";
import Card from "../../components/Card";

function VideoGamesCatalog() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categoryOptions = ["RPG", "Acción", "Aventura", "Rol", "Shooter"];

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
          options={categoryOptions}
          label="Categorías"
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {videogames.map((v) => (
          <Card
            id={v.id}
            key={v.id}
            type="videogame"
            title={v.nombre}
            imageUrl={v.imageUrl}
            sinopsis={v.sinopsis}
            tags={v.categorias}
          />
        ))}
      </div>
    </main>
  );
}

export default VideoGamesCatalog;
