import { useState, useRef, useEffect } from "react";
import Card from "../components/Card";

function Catalog() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Películas", "Series", "Juegos"];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const tab = tabRefs.current[activeTab];
    if (tab) {
      const { offsetLeft, clientWidth } = tab;
      setIndicatorStyle({ left: offsetLeft, width: clientWidth });
    }
  }, [activeTab]);

 

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">

            <main className="flex flex-col gap-4 mt-8 px-4">

              {/* Pestañas */}
              <div className="relative pb-0">
                <div className="flex border-b border-white/10 gap-8">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      ref={(el) => { tabRefs.current[index] = el; }}
                      onClick={() => setActiveTab(index)}
                      className={`flex flex-col items-center justify-center pb-[13px] pt-4 text-sm font-bold tracking-[0.015em] transition-colors duration-300
                        ${activeTab === index ? "text-white" : "text-white/50 hover:text-white/80"}
                      `}
                    >
                      {tab}
                    </button>
                  ))}

                  {/* Rayita animada */}
                  <div
                    className="absolute bottom-0 h-[3px] bg-primary transition-all duration-300"
                    style={{
                      left: indicatorStyle.left,
                      width: indicatorStyle.width,
                    }}
                  />
                </div>
              </div>

              {/* Contenido con animación de deslizamiento */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeTab * 180}%)` }}
                >
                  <Card title="Xd" description="Xd" imageSrc= "https://lh3.googleusercontent.com/aida-public/AB6AXuB86sk0I4wNu6V9JgHNc9b0H25aseGwzjGjoPoE4PmkQ4Mx89BzI80QWBFRISU_aw_cqTBWInTp8iHhkZCND0yFgqVDhV2tRw7Yp4dUrq9hfrMbI6AwxcyCIzc7nx6vRFQLqg9TmGRQ2SQtrdDD2qNWA5Vp6t6TbTgoHogKn4Nn2u0Khxhq-4yb9wtuAyll0uyPW8JQDQa2wuganCE7Kur5uDLEB8wffC6dbt6i2X4ZNWNtpvTeCoLzoH5ZdhIFSSL_Q-dvljxCfys"/>
                </div>
              </div>

            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
