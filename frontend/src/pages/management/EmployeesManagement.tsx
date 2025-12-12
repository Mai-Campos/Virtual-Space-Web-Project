import { useState } from "react";

function EmployeesManagement() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
      <div className="lg:col-span-1">
        <div className="flex flex-col gap-8 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white">
            Añadir Nuevo Empleado
          </h2>
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                className="text-base font-medium text-white/80"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                className="form-input h-12 w-full resize-none overflow-hidden rounded-lg border border-white/20 bg-black/20 p-3 text-base font-normal text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                id="nombre"
                placeholder="Ej: Ana Torres"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-base font-medium text-white/80"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="form-input h-12 w-full resize-none overflow-hidden rounded-lg border border-white/20 bg-black/20 p-3 text-base font-normal text-white placeholder:text-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                id="email"
                placeholder="Ej: ana.torres@email.com"
                type="email"
              />
            </div>

            <div className="flex flex-col">
              <label
                className="mb-2 text-sm font-medium text-white"
                htmlFor="password"
              >
                Contraseña
              </label>

              <div className="relative">
                <input
                  className="form-input w-full rounded-lg border border-white/10 bg-black/20 p-3 pr-12 text-white placeholder:text-zinc-500 focus:border-primary focus:ring-primary focus:outline-none focus:ring-1"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                />

                {/* BOTÓN MOSTRAR/OCULTAR */}
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                >
                  {showPassword ? (
                    // OJO ABIERTO
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      width="18"
                      viewBox="0 0 640 640"
                    >
                      <path
                        fill="#ffffff"
                        d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320z"
                      />
                    </svg>
                  ) : (
                    // OJO CERRADO
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      width="18"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="#ffffff"
                        d="M633.8 458.1 45.5 2.5A16 16 0 1 0 21.1 26.9l84.6 71.4C39.2 140.8-3.8 216.6 1.6 235.5c3 10.6 34.3 62.5 81.1 106C129.8 385.2 194.6 416 320 416c52.4 0 98.2-9.2 137.4-24.6l96.5 81.4a16 16 0 1 0 24.4-24.7zm-317.7-79.5c-79.5 0-144-64.5-144-144 0-16.6 3.4-32.5 8.8-47.3l204.3 172.5c-16.7 11.1-36.8 18.8-58.9 18.8zM320 96c80.8 0 145.5 36.8 192.6 80.6 46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-6.3 15.4-19.3 39.4-37.8 63.4l-83.8-70.7A143.5 143.5 0 0 0 464 320c0-79.5-64.5-144-144-144-22.3 0-42.5 7.7-59.3 18.9L209.8 136C241.4 110.8 280.3 96 320 96z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-bold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark cursor-pointer"
              type="submit"
            >
              Añadir Empleado
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white">
            Lista de Empleados
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="text-left">
                <tr>
                  <th
                    className="px-4 py-3.5 text-sm font-semibold text-white"
                    scope="col"
                  >
                    Nombre
                  </th>
                  <th
                    className="px-4 py-3.5 text-sm font-semibold text-white"
                    scope="col"
                  >
                    Email
                  </th>
                  <th className="relative py-3.5 pl-4 pr-4 sm:pr-6" scope="col">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeesManagement;
