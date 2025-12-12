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
        <div className="flex border-b border-white/10 gap-8 ">
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
