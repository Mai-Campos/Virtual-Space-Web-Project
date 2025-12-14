import { useState } from "react";
import SeriesManagement from "./SeriesManagement";
import MoviesManagement from "./MoviesManagement";
import VideoGamesManagement from "./VideoGamesManagement";
import CategoryManagement from "./CategoryManagement";
import GenreManagement from "./GenreManagement";
import DirectorManagement from "./DirectorManagement";
import PlatformManagement from "./PlatformManagement";

function ManagementLayout() {
  const [activeTab, setActiveTab] = useState("Videojuegos");

  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    "Videojuegos",
    "Películas",
    "Series",
    "Categorías",
    "Géneros",
    "Directores",
    "Plataformas",
  ];

  return (
    <main className="flex-1 mt-6 p-4">
      {/* TABS */}
      <div className="pb-3 mt-4 ">
        <div className="hidden md:flex border-b border-white/10 gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`flex flex-col cursor-pointer items-center justify-center pb-[13px] pt-4 text-sm font-bold ${
                activeTab === tab
                  ? "border-b-[3px] border-b-primary text-white"
                  : "border-b-[3px] border-b-transparent text-white/60 hover:text-white transition-colors"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="md:hidden relative">
          {/* Botón hamburguesa */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 bg-white/5 text-white px-4 py-2 rounded-lg border border-white/10"
          >
            ☰ Gestión
            <span className="text-white/60 text-sm">({activeTab})</span>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute mt-2 w-56 bg-black border border-white/10 rounded-lg shadow-lg z-50">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                    activeTab === tab
                      ? "bg-primary text-white"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-8">
        {activeTab === "Videojuegos" && <VideoGamesManagement />}
        {activeTab === "Películas" && <MoviesManagement />}
        {activeTab === "Series" && <SeriesManagement />}
        {activeTab === "Categorías" && <CategoryManagement />}
        {activeTab === "Géneros" && <GenreManagement />}
        {activeTab === "Directores" && <DirectorManagement />}
        {activeTab === "Plataformas" && <PlatformManagement />}
      </div>
    </main>
  );
}

export default ManagementLayout;
