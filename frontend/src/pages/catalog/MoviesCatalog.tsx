import { useCallback, useEffect, useMemo, useState } from "react";
import MultiSelect from "../../components/MultiSelect";
import { movies as moviesMock } from "../../mocks/movies.js";
import Card from "../../components/Card.js";
import Pagination from "../../components/Pagination.js";
import { usePaginatedData } from "../../hooks/PaginationHook.js";
import { mockPaginateFiltered } from "../../mocks/mockPaginateFiltered.js";

function MoviesCatalog() {
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const genreOptions = ["Terror", "Acción", "Aventura", "Drama", "Bélico"];

  const moviesForCatalog = useMemo(
    () =>
      moviesMock.map((m) => ({
        ...m,
        tags: m.generos,
      })),
    []
  );

  const fetchMovies = useCallback(
    async (page: number, limit: number) => {
      return Promise.resolve(
        mockPaginateFiltered(moviesForCatalog, {
          page,
          limit,
          search,
          tags: selectedGenres,
        })
      );
    },
    [search, selectedGenres, moviesForCatalog]
  );

  const {
    data: movies,
    currentPage,
    totalPages,
    setCurrentPage,
    loading,
  } = usePaginatedData(fetchMovies, 6);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedGenres, setCurrentPage]);

  return (
    <main>
      <div className="flex flex-col sm:flex-row gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full grow">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <input
              className="form-input flex min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white/5 focus:border-none h-full placeholder:text-white/50 px-4 pl-2 text-base font-normal leading-normal"
              placeholder="Buscar por título"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
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

      {loading && <p className="text-white/60">Cargando...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {movies.map((p) => (
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
