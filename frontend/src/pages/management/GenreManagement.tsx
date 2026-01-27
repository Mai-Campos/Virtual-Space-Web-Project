import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import type { Options } from "../../types/MultiSelectTypes";

function GenreManagement() {
  // Token
  const token = localStorage.getItem("accesToken");

  // Nombre de la categoría
  const [genreName, setGenreName] = useState("");

  // Géneros traidos del backend
  const [genres, setGenres] = useState<Options[]>([]);

  // Saber si se está editando
  const [editingGenreId, setEditingGenreId] = useState<number | null>(null);

  // Para refrescar la tabla
  const [refreshKey, setRefreshKey] = useState(0);

  // Función que refresa la tabla
  const refreshTable = () => {
    setRefreshKey((k) => k + 1);
  };

  // Función que valida el formulario
  const validateForm = () => {
    const errors: string[] = [];

    if (!genreName || genreName.trim().length < 4) {
      errors.push("El nombre debe tener al menos 4 caracteres");
    }

    return errors;
  };

  // Función que resetea el formulario
  const resetForm = () => {
    setEditingGenreId(null);
    setGenreName("");
  };

  // Traer géneros
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/genres`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Error cargando géneros");
        }

        const genresData = await res.json();
        setGenres(genresData);
      } catch (error) {
        console.error("Error cargando géneros:", error);
        toast.error("Error cargando géneros");
      }
    };

    fetchGenres();
  }, [token, refreshKey]);

  // Manejador para enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    const payload = {
      name: genreName,
    };

    const url = editingGenreId
      ? `http://localhost:3000/api/v1/genres/${editingGenreId}`
      : `http://localhost:3000/api/v1/genres`;

    const method = editingGenreId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Error guardando géneros");
    }

    toast.success("Género guardado correctamente");
    resetForm();
    refreshTable();
  };

  // Manejador para eliminar
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar este género?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/v1/genres/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorBody = await res.json();

        const message = Array.isArray(errorBody.message)
          ? errorBody.message.join(", ")
          : errorBody.message || "Error al eliminar género";

        if (errorBody.statusCode === 409) {
          throw new Error(
            "No se puede eliminar el género porque está asociado a uno o más contenidos.",
          );
        }

        throw new Error(message);
      }
      toast.success("Género eliminado correctamente");
      refreshTable();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // Manejador para editar
  const handleEdit = (genre: Options) => {
    setEditingGenreId(genre.id);

    setGenreName(genre.name);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="col-span-1 bg-white/5 rounded-lg p-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6">
          {editingGenreId ? "Editar Género" : "Añadir Nuevo Género"}
        </h2>

        {/* BANNER DE EDICIÓN (solo cuando está editando) */}
        {editingGenreId && (
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
                <p className="font-medium text-blue-300">Modo edición activo</p>
                <p className="text-sm text-blue-400/80">
                  Editando género #{editingGenreId}
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
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              className="text-white text-sm font-medium leading-normal"
              htmlFor="genre-name"
            >
              Nombre del Género
            </label>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/10 bg-black/20 h-12 placeholder:text-white/40 px-4 text-sm font-normal leading-normal"
              id="genre-name"
              placeholder="Ej: Acción"
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
            />
          </div>
          <button
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:ring-2 focus:ring-primary  "
            type="submit"
            onClick={handleSubmit}
          >
            Guardar Género
          </button>
        </form>
      </div>
      <div className="col-span-1 lg:col-span-2  bg-white/5 rounded-lg p-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6">
          Géneros Existentes
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/20">
              <tr>
                <th className="p-4 text-sm font-semibold text-primary uppercase tracking-wider">
                  ID
                </th>
                <th className="p-4 text-sm font-semibold text-primary uppercase tracking-wider">
                  Nombre
                </th>
                <th className="p-4 text-sm font-semibold text-primary uppercase tracking-wider text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {genres.map((genre) => (
                <tr key={genre.id}>
                  <td className="p-4 text-sm text-white font-medium">
                    {genre.id}
                  </td>
                  <td className="p-4 text-sm text-white font-medium">
                    {genre.name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      {/*  EDITAR */}
                      <button
                        title="Editar"
                        className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                        onClick={() => handleEdit(genre)}
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

                      {/* ELIMINAR */}
                      <button
                        title="Eliminar"
                        className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                        onClick={() => handleDelete(genre.id)}
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
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default GenreManagement;
