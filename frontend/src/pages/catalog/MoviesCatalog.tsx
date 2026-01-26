import { useCallback, useEffect, useState } from "react";
import MultiSelect from "../../components/MultiSelect";
import Card from "../../components/Card.js";
import Pagination from "../../components/Pagination.js";
import { usePaginatedData } from "../../hooks/PaginationHook.js";
import type { VisualContent } from "../../types/Types.js";
import type { Options } from "../../types/MultiSelectTypes.js";
import { toast } from "react-toastify";

function MoviesCatalog() {
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("accesToken");

  const [genres, setGenres] = useState<Options[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch("http://localhost:3000/api/v1/genres", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error("Error cargando géneros");
        throw new Error("Error cargando géneros");
      }

      const genres = await res.json();
      setGenres(genres);
    };

    fetchGenres();
  }, [token]);

  const fetchMovies = useCallback(
    async (page: number, limit: number) => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) {
        params.append("search", search);
      }

      if (selectedGenres.length) {
        params.append("genres", selectedGenres.join(","));
      }

      const res = await fetch(
        `http://localhost:3000/api/v1/movies/catalog?${params}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!res.ok) {
        toast.error("Error cargando películas");
        throw new Error("Error al cargar películas");
      }

      return res.json();
    },
    [search, selectedGenres, token],
  );

  const {
    data: movies,
    currentPage,
    totalPages,
    setCurrentPage,
    loading,
  } = usePaginatedData<VisualContent>(fetchMovies, 6);

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
          options={genres}
          label="Géneros"
          selected={selectedGenres}
          setSelected={setSelectedGenres}
        />
      </div>

      {loading && <p className="text-white/60">Cargando...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {movies.map((m) => (
          <Card
            id={m.id}
            type="movie"
            key={m.id}
            title={m.title}
            coverImg={m.coverImg}
            synopsis={m.synopsis}
            tags={m.genres}
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
