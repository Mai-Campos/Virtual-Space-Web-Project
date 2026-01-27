import { Link } from "react-router-dom";
import { canAccess } from "../auth/canAccess";
import { NAV_PERMISSIONS } from "../auth/permissions";
import { useAuth } from "../hooks/UseAuth";

function Footer() {
  const { isAuthenticated, user, logout } = useAuth();

  const canAccessContent =
    isAuthenticated && user
      ? canAccess(user.roles || [], NAV_PERMISSIONS?.CONTENT_MANAGEMENT || [])
      : false;

  const canAccessUsers =
    isAuthenticated && user
      ? canAccess(user.roles || [], NAV_PERMISSIONS?.EMPLOYEE_MANAGEMENT || [])
      : false;

  return (
    <footer className="w-full border-t border-solid border-white/10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-4 sm:px-8 text-white/80">
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-sm mb-2">
            &copy; 2026 Digital Space. Todos los derechos reservados.
          </p>
          <p className="text-sm">
            Desarrollado por <strong>Maikol Campos</strong>.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 sm:mt-0">
          {isAuthenticated && canAccessContent && (
            <Link
              to="/management"
              className="text-sm hover:text-white transition-colors font-medium text-green-300"
            >
              Administración de contenidos
            </Link>
          )}

          {isAuthenticated && canAccessUsers && (
            <Link
              to="/employees-management"
              className="text-sm hover:text-white transition-colors font-medium text-blue-300"
            >
              Gestión de Empleados
            </Link>
          )}

          {isAuthenticated && (
            <button
              onClick={logout}
              className="text-sm hover:text-white transition-colors font-medium text-red-300 cursor-pointer
      "
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
