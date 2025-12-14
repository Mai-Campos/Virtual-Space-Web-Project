function PlatformManagement() {
  const platforms = [
    {
      id: 1,
      name: "Netflix",
    },
    {
      id: 2,
      name: "Amazon Prime",
    },
    {
      id: 3,
      name: "HBO",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="col-span-1 bg-white/5 rounded-lg p-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6">
          Añadir Nueva Plataforma
        </h2>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              className="text-white text-sm font-medium leading-normal"
              htmlFor="platform-name"
            >
              Nombre de la Plataforma
            </label>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/10 bg-black/20 h-12 placeholder:text-white/40 px-4 text-sm font-normal leading-normal"
              id="platform-name"
              placeholder="Ej: Netflix"
            />
          </div>
          <button
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:ring-2 focus:ring-primary  "
            type="submit"
          >
            Guardar Plataforma
          </button>
        </form>
      </div>
      <div className="col-span-1 lg:col-span-2  bg-white/5 rounded-lg p-6">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6">
          Plataformas Existentes
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
              {platforms.map((platform) => (
                <tr key={platform.id}>
                  <td className="p-4 text-sm text-white font-medium">
                    {platform.id}
                  </td>
                  <td className="p-4 text-sm text-white font-medium">
                    {platform.name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="inline-flex items-center gap-3">
                      {/*  EDITAR */}
                      <button
                        title="Editar"
                        className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                        onClick={() => console.log("Editar", platform.id)}
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
                        onClick={() => console.log("Eliminar", platform.id)}
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
    </div>
  );
}

export default PlatformManagement;
