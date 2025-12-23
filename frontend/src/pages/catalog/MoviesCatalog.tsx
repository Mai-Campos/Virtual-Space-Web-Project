import { useState } from "react";
import MultiSelect from "../../components/MultiSelect";
import { movies } from "../../data/movies.js";
import Card from "../../components/Card.js";
import Pagination from "../../components/Pagination.js";
import { usePagination } from "../../hooks/PaginationHook.js";

function MoviesCatalog() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const genreOptions = ["Terror", "Acción", "Aventura", "Drama", "Bélico"];

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedMovies,
    setCurrentPage,
  } = usePagination(movies, 6);

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
        {paginatedMovies.map((p) => (
          <Card
            id={p.id}
            type="movie"
            key={p.id}
            title={p.nombre}
            imageUrl={p.imageUrl}
            sinopsis={p.sinopsis}
            tags={p.generos}
          ></Card>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}

export default MoviesCatalog;
