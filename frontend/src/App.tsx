import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import MovieDetails from "./pages/details/MovieDetails";
import SerialDetails from "./pages/details/SerialDetails";
import GameDetails from "./pages/details/GameDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ManagementLayout from "./pages/management/ManagementLayout";
import CatalogLayout from "./pages/catalog/CatalogLayout";
import EmployeesManagement from "./pages/management/EmployeesManagement";
import PageNotFound from "./pages/PageNotFound";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/catalog" element={<CatalogLayout />} />
        <Route path="/movie-details" element={<MovieDetails />} />
        <Route path="/serial-details" element={<SerialDetails />} />
        <Route path="/game-details" element={<GameDetails />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/management" element={<ManagementLayout />} />
        <Route path="/employees-management" element={<EmployeesManagement />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/403" element={<UnauthorizedPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
