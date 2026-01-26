import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import MovieDetails from "./pages/details/MovieDetails";
import SerialDetails from "./pages/details/SerialDetails";
import GameDetails from "./pages/details/VideoGameDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ManagementLayout from "./pages/management/ManagementLayout";
import CatalogLayout from "./pages/catalog/CatalogLayout";
import EmployeesManagement from "./pages/management/EmployeesManagement";
import PageNotFound from "./pages/PageNotFound";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { ProtectedRoute } from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/403" element={<UnauthorizedPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/catalog" element={<CatalogLayout />} />
          <Route path="/movie/details/:id" element={<MovieDetails />} />
          <Route path="/series/details/:id" element={<SerialDetails />} />
          <Route path="/videogame/details/:id" element={<GameDetails />} />
        </Route>

        <Route
          element={<ProtectedRoute allowedRoles={["admin", "employee"]} />}
        >
          <Route path="/management" element={<ManagementLayout />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route
            path="/employees-management"
            element={<EmployeesManagement />}
          />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
