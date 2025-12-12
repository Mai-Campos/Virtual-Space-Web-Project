import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Catalog from "./pages/Catalog";
import MovieDetails from "./pages/MovieDetails";
import SerialDetails from "./pages/SerialDetails";
import GameDetails from "./pages/GameDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ManagementLayout from "./pages/management/ManagementLayout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route
          path="/movie-details"
          element={
            <MovieDetails
              title={"Inception"}
              director={"Cristopher Nolan"}
              sinopsis={"Blablablablabla"}
              genres={["acción", "aventura", "sci-fi"]}
              fileSize={2}
              posterUrl={
                "https://lh3.googleusercontent.com/aida-public/AB6AXuB9v-Q1yhf4I-CqoTaaAZAzZysUBMmZdtP4_PJuYtiZfhL6WB7Z9oW3xbBw_TZ4l9opnNMvCnMF0MjBuAizUVKWVwS4fhvue4OqBlyJwfXnCVt5rEy7oDMBMWNlDiGrWsLSh2gwJqHXUFjIzjXiW-Tt6Ux396Fvozg0mzW8KkxgzGBGl0xwGVKSS2rFVugE-4nDZW0i0WyvGCEwojnRrWwpTjNtbYO_vPFPFMOcGCzBsDsmJppcu4rgvYAhrOyCqGRtHt3gUPHFUbw"
              }
            />
          }
        />

        <Route
          path="/serial-details"
          element={
            <SerialDetails
              title={"The witcher"}
              sinopsis={"Blablablablabla"}
              genres={["acción", "aventura", "rol", "fantasia"]}
              fileSize={1.74}
              posterUrl={
                "https://lh3.googleusercontent.com/aida-public/AB6AXuC77NATVZsRZNyAAJawoPslJl6TYhpRakh1O6oDThJoWGuitVyXeFAq50cDdWQ_DRXlYVZ7b0vAluT2SCqY6LmFoI7j8suBQre9OYGTzd5YPeuzPo2nisEibHhAx-hgqcJv_afvhQWGBbBKXeFEX248pw_2wm1UODX2kAaOXQbuVVNaPOUIVEzDwpROnT2GRQdNWVPK4P6IWjuJ60JIW2GBepa5uE4x8ElFpUfswMDEy8dKBG1s93VLfy3DBX8T1iv-7M213c3D6lY"
              }
              temporades={3}
              platform={"Netflix"}
            />
          }
        />

        <Route
          path="/game-details"
          element={
            <GameDetails
              title={"Cyber Dawn"}
              sinopsis={"Blablablablabla"}
              categories={["rpg", "accion", "rol"]}
              fileSize={1.8}
              posterUrl={
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAclh1h2-t5Z7KvJOrVU2YPWexiGWSHwy9qI9Y46kZWS8ARxWJKO82yjNgd1VaqMQ4sfurdGFWprZWPU0NbNwEcBkYmqPSkpVBTBnXMtifeYpiAGihj_zTCqI9byubbngEU5VoJ0X-u2VhXSgkAaQROh5t3a-oT4Y4ORvDIjNSeeB-RI9YAXmHsMmQmckYVWhAKMfhbAVu-n3AAZ8deb4aYrAVQkswGXD6rIF04gVNPo5CPVqvblfXigtZ1NwdqozJ3Y6drLtl7wS4"
              }
            />
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/management" element={<ManagementLayout />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
