import { useCallback, useEffect, useState } from "react";
import MultiSelect from "../../components/MultiSelect";
import Card from "../../components/Card";
import Pagination from "../../components/Pagination";
import { usePaginatedData } from "../../hooks/PaginationHook";
import type { VideoGame } from "../../types/Types";
import type { Options } from "../../types/MultiSelectTypes";
import { toast } from "react-toastify";

function VideoGamesCatalog() {
  const token = localStorage.getItem("accesToken");

  const [categories, setCategories] = useState<Options[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3000/api/v1/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        toast.error("Error cargando categorías");
        throw new Error("Error cargando categorías");
      }

      const categories = await res.json();
      setCategories(categories);
    };

    fetchCategories();
  }, [token]);

  const [search, setSearch] = useState("");

  const fetchVideogames = useCallback(
    async (page: number, limit: number) => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) {
        params.append("search", search);
      }

      if (selectedCategories.length > 0) {
        params.append("categories", selectedCategories.join(","));
      }

      const res = await fetch(
        `http://localhost:3000/api/v1/videogames/catalog?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        toast.error("Error cargando videojuegos");
        throw new Error("Error cargando videojuegos");
      }

      return res.json();
    },
    [search, selectedCategories, token],
  );

  const {
    data: videogames,
    currentPage,
    totalPages,
    setCurrentPage,
    loading,
  } = usePaginatedData<VideoGame>(fetchVideogames, 6);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategories, setCurrentPage]);

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
          options={categories}
          label="Categorías"
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />
      </div>

      {loading && <p className="text-white/60">Cargando...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {videogames.map((v) => (
          <Card
            id={v.id}
            key={v.id}
            type="videogame"
            title={v.title}
            coverImg={v.coverImg}
            synopsis={v.synopsis}
            tags={v.categories}
          />
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

export default VideoGamesCatalog;
