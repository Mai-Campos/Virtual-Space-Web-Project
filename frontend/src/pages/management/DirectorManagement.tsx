function DirectorManagement() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="col-span-1 bg-white/5 rounded-lg p-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6">
          Añadir Nuevo Director
        </h2>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              className="text-white text-sm font-medium leading-normal"
              htmlFor="director-name"
            >
              Nombre del Director
            </label>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/10 bg-black/20 h-12 placeholder:text-white/40 px-4 text-sm font-normal leading-normal"
              id="director-name"
              placeholder="Ej: Cristopher Nolan"
            />
          </div>
          <button
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:ring-2 focus:ring-primary  "
            type="submit"
          >
            Guardar Director
          </button>
        </form>
      </div>
      <div className="col-span-1 lg:col-span-2  bg-white/5 rounded-lg p-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6">
          Directores Existentes
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
            <tbody className="divide-y divide-white/20"></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DirectorManagement;
