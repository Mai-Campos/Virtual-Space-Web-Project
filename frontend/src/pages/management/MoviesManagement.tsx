import { useCallback, useEffect, useState } from "react";
import MultiSelect from "../../components/MultiSelect";
import Pagination from "../../components/Pagination";
import { usePaginatedData } from "../../hooks/PaginationHook";
import type { Options } from "../../types/MultiSelectTypes";
import type { CompleteMovie } from "../../types/Types";
import { toast, ToastContainer } from "react-toastify";

function MoviesManagement() {
  // Token
  const token = localStorage.getItem("accesToken");

  // Ids de géneros
  const [selectedGenres, setselectedGenres] = useState<number[]>([]);

  // Géneros traidos del backend
  const [genres, setGenres] = useState<Options[]>([]);

  // Directores traidos del backend
  const [directors, setDirectors] = useState<Options[]>([]);

  // Archivo de imagen
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Saber si se está editando
  const [editingMovieId, setEditingMovieId] = useState<number | null>(null);

  // Para refrescar la tabla
  const [refreshKey, setRefreshKey] = useState(0);

  // Estado del formulario
  const [formData, setFormData] = useState({
    title: "",
    synopsis: "",
    directorId: "",
    sizeGb: "",
    coverImg: "",
  });

  // Función que refresa la tabla
  const refreshTable = () => {
    setRefreshKey((k) => k + 1);
  };

  // Función que valida el formulario
  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.title || formData.title.trim().length < 4) {
      errors.push("El título debe tener al menos 4 caracteres");
    }

    if (!formData.synopsis || formData.synopsis.trim().length < 10) {
      errors.push("La sinopsis debe tener al menos 10 caracteres");
    }

    if (!formData.directorId) {
      errors.push("Debes seleccionar un director");
    }

    if (!formData.sizeGb || parseFloat(formData.sizeGb) <= 0) {
      errors.push("El peso en GB debe ser mayor a 0");
    }

    if (!imageFile && !formData.coverImg) {
      errors.push("Debes subir una imagen de portada");
    }

    if (selectedGenres.length === 0) {
      errors.push("Debes seleccionar al menos un género");
    }

    return errors;
  };

  // Función que resetea el formulario
  const resetForm = () => {
    setEditingMovieId(null);
    setFormData({
      title: "",
      synopsis: "",
      directorId: "",
      sizeGb: "",
      coverImg: "",
    });
    setselectedGenres([]);
    setImageFile(null);
  };

  // Traer géneros y directores al cargar el componente
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch("http://localhost:3000/api/v1/genres", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error cargando géneros");

      const genresData = await res.json();
      setGenres(genresData);
    };

    const fetchDirectors = async () => {
      const res = await fetch("http://localhost:3000/api/v1/directors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error cargando géneros");

      const directorsData = await res.json();
      setDirectors(directorsData);
    };

    fetchGenres();
    fetchDirectors();
  }, [token]);

  // Traer películas
  const fetchMovies = useCallback(
    async (page: number, limit: number) => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      const res = await fetch(
        `http://localhost:3000/api/v1/movies/admin?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Error cargando películas");

      return res.json();
    },
    [token, refreshKey],
  );

  // Paginación y datos de películas
  const {
    data: movies,
    currentPage,
    totalPages,
    setCurrentPage,
    loading,
  } = usePaginatedData<CompleteMovie>(fetchMovies, 5);

  // Manejador para subir imágen
  const uploadImageHandle = async (): Promise<string> => {
    if (!imageFile) throw new Error("Sin imágen seleccionada");

    const data = new FormData();
    data.append("image", imageFile);

    const res = await fetch("http://localhost:3000/api/v1/upload/image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (!res.ok) {
      toast.error("Error subiendo imágen");
      throw new Error("Error subiendo imágen");
    }

    const { url } = await res.json();
    toast.success("Imágen subida a Cloudinary");
    return url;
  };

  // Manejador para enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    let coverImgUrl = formData.coverImg;

    if (imageFile) {
      coverImgUrl = await uploadImageHandle();
    }

    const payload = {
      title: formData.title,
      synopsis: formData.synopsis,
      directorId: Number(formData.directorId),
      sizeGb: parseFloat(formData.sizeGb),
      coverImg: coverImgUrl,
      genreIds: selectedGenres,
    };

    const url = editingMovieId
      ? `http://localhost:3000/api/v1/movies/${editingMovieId}`
      : `http://localhost:3000/api/v1/movies`;

    const method = editingMovieId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      toast.error("Error guardando película");
      throw new Error("Error guardando película");
    }

    toast.success("Película guardada correctamente");
    resetForm();
    refreshTable();
  };

  // Manejador para eliminar
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar esta película?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:3000/api/v1/movies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      toast.error("Error eliminando película");
      throw new Error("Error eliminando película");
    }

    toast.success("Película eliminada correctamente");
    refreshTable();
  };

  // Manejador para editar
  const handleEdit = (movie: CompleteMovie) => {
    setEditingMovieId(movie.id);

    setFormData({
      title: movie.title,
      synopsis: movie.synopsis,
      directorId: String(movie.directorId),
      sizeGb: String(movie.sizeGb),
      coverImg: movie.coverImg,
    });

    setselectedGenres(movie.genres.map((g) => g.id));
  };

  return (
    <main className="flex-1 mt-6 p-4">
      <div className="mt-8 space-y-12 p-4">
        <section>
          <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
            {editingMovieId ? "Editar Película" : "Añadir Nueva Película"}
          </h2>

          {/* BANNER DE EDICIÓN (solo cuando está editando) */}
          {editingMovieId && (
            <div className="flex items-center justify-between rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                    fill="#60a5fa"
                  >
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-blue-300">
                    Modo edición activo
                  </p>
                  <p className="text-sm text-blue-400/80">
                    Editando empleado #{editingMovieId}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-400/20"
              >
                Cancelar
              </button>
            </div>
          )}
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
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="flex flex-col">
                <label className="text-white text-sm font-medium leading-normal pb-2">
                  Director
                </label>
                <select
                  className="form-select flex w-full min-w-0 flex-1 overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-black/20 focus:border-primary h-12 p-3 text-base font-normal leading-normal"
                  name="directorId"
                  value={formData.directorId}
                  onChange={(e) =>
                    setFormData({ ...formData, directorId: e.target.value })
                  }
                >
                  <option disabled>Seleccionar director</option>
                  {directors.map((d) => (
                    <option key={d.id} value={d.id} className="text-primary">
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="flex flex-col">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Peso en GB
                  </p>
                  <input
                    type="number"
                    name="sizeGb"
                    value={formData.sizeGb}
                    onChange={(e) =>
                      setFormData({ ...formData, sizeGb: e.target.value })
                    }
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
                    value={formData.synopsis}
                    onChange={(e) =>
                      setFormData({ ...formData, synopsis: e.target.value })
                    }
                    className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/20 bg-black/20 focus:border-primary min-h-28 placeholder:text-white/40 p-3 text-base font-normal leading-normal"
                    placeholder="Describe brevemente la película..."
                  />
                </label>
              </div>

              <div className="flex flex-col">
                <label className="flex flex-col">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Foto de Portada
                  </p>
                  <input
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
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
                    options={genres}
                    label="Géneros"
                    selected={selectedGenres}
                    setSelected={setselectedGenres}
                  />
                </label>
              </div>

              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="flex max-w-sm items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 px-8 hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  {editingMovieId ? "Guardar Cambios" : "Añadir Película"}
                </button>
              </div>
            </form>
          </div>
        </section>

        {loading && <p className="text-white/60">Cargando...</p>}

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
                {movies.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <td className="px-6 py-4">{m.id}</td>
                    <td className="px-6 py-4">
                      <img
                        src={m.coverImg}
                        alt={m.title}
                        className="w-16 h-20 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      {m.title}
                    </td>
                    <td className="px-6 py-4 max-w-xs ">{m.synopsis}</td>
                    <td className="px-6 py-4">{m.director}</td>
                    <td className="px-6 py-4 text-center">{m.sizeGb}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {m.genres.map((g) => (
                          <span
                            key={g.id}
                            className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full"
                          >
                            {g.name}
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
                          onClick={() => handleEdit(m)}
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
                          onClick={() => handleDelete(m.id)}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  );
}

export default MoviesManagement;
