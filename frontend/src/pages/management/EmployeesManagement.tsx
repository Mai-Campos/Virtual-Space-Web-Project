import { useState } from "react";
import { employees } from "../../data/employees";

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
                    Id
                  </th>
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
              <tbody className="divide-y divide-white/10">
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="p-4 text-sm text-white font-medium">
                      {employee.id}
                    </td>
                    <td className="p-4 text-sm text-white font-medium">
                      {employee.name}
                    </td>
                    <td className="p-4 text-sm text-white font-medium">
                      {employee.email}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-3">
                        {/*  EDITAR */}
                        <button
                          title="Editar"
                          className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                          onClick={() => console.log("Editar", employee.id)}
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
                          onClick={() => console.log("Eliminar", employee.id)}
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
    </div>
  );
}

export default EmployeesManagement;
