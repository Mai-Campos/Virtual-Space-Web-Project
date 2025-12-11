
function Catalog() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<div className="layout-container flex h-full grow flex-col">
<div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
<div className="layout-content-container flex flex-col max-w-[960px] flex-1">


<main className="flex flex-col gap-4 mt-8 px-4">

<div className="flex flex-wrap justify-between gap-3 p-4">
<p className="text-white text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Explora Nuestro Catálogo</p>
</div>

<div className="pb-3">
<div className="flex border-b border-white/10 px-4 gap-8">
<a className="flex flex-col items-center justify-center border-b-[3px] border-primary text-white pb-[13px] pt-4" href="#">
<p className="text-white text-sm font-bold leading-normal tracking-[0.015em]">Películas</p>
</a>
<a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-white/50 hover:text-white/80 pb-[13px] pt-4 transition-colors" href="#">
<p className="text-sm font-bold leading-normal tracking-[0.015em]">Series</p>
</a>
<a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-white/50 hover:text-white/80 pb-[13px] pt-4 transition-colors" href="#">
<p className="text-sm font-bold leading-normal tracking-[0.015em]">Juegos</p>
</a>
</div>
</div>

<div className="flex flex-col sm:flex-row gap-4 px-4 py-3">

<label className="flex flex-col min-w-40 h-12 w-full flex-grow">
<div className="flex w-full flex-1 items-stretch rounded-lg h-full">

<input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white/5 focus:border-none h-full placeholder:text-white/50 px-4 pl-2 text-base font-normal leading-normal" placeholder="Buscar por título, actor, director..." value=""/>
</div>
</label>

<div className="flex gap-3 items-center">
<button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white/5 hover:bg-white/10 pl-4 pr-3 transition-colors">
<p className="text-white text-sm font-medium leading-normal">Género</p>
<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 640 640"><path fill="#ffffff" d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z"/></svg>
</button>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">

<div className="flex flex-col bg-white/5 rounded-lg overflow-hidden group">
<div className="relative overflow-hidden">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Futuristic cityscape at night with neon lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClLKrjnsTr9cQlGcsZzHJz4uZFAdAa0PobMX4zs4ZGdDOzJWd7GV8Sz-SLcPUJ-UElb6cWVhJmithwagBPdoqQnClyZGD2LJX6EAxhRk-PHKIZJaLTdZ046wt-LWhqNDazkomRkVuJmpieKhHSnvbxVwmXlyotSUndwevnhEd60c7kFTQxEuATZMw_YkHw6Bp3Aey-_NW5Huoae4gUvPqQ6OqKfC4ZDlVviNfLQbIZ3_nj7c0ELzHEJNBb36D3Qaw5kpuHuRjFqy8"/>
</div>
<div className="p-4 flex flex-col flex-grow">
<h3 className="text-white text-lg font-bold">Cyberpunk Runners</h3>
<p className="text-white/70 text-sm mt-2 flex-grow">En una metrópolis distópica, un equipo de mercenarios debe navegar por un mundo de implantes cibernéticos y conspiraciones corporativas.</p>
<button className="mt-4 w-full flex items-center justify-center rounded-md h-10 bg-primary/80 hover:bg-primary text-white text-sm font-bold transition-colors">Ver Detalles</button>
</div>
</div>

<div className="flex flex-col bg-white/5 rounded-lg overflow-hidden group">
<div className="relative overflow-hidden">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Ancient ruins in a lush jungle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxGmrjaI4vxBiiwGHChFRWpqiqDF0BGR5j-2wfDimhPSgUHZv6OtXz-NRm2R5T_xXsfb94oLLe0cDPkZnfs8hswLrTDJ-RLs8hCLNNI1Lz1EtOMKTsrfSfocKSzxek2cutkLtYmhpatQgD-sA-WZEk4E2JIe_rQow0zrOF_wOPnVmb_M_sFw6YOsULzmtnfIoFA-y8jFEi2nxdA0N5RCzbM2CHprv5bmyjSXXZL--Gx3kheBhIifASKg52mODu-ll1pJLNlR-AKSg"/>
</div>
<div className="p-4 flex flex-col flex-grow">
<h3 className="text-white text-lg font-bold">El Orbe Perdido</h3>
<p className="text-white/70 text-sm mt-2 flex-grow">Una intrépida arqueóloga se embarca en una peligrosa búsqueda para encontrar un artefacto antiguo con el poder de cambiar el mundo.</p>
<button className="mt-4 w-full flex items-center justify-center rounded-md h-10 bg-primary/80 hover:bg-primary text-white text-sm font-bold transition-colors">Ver Detalles</button>
</div>
</div>

<div className="flex flex-col bg-white/5 rounded-lg overflow-hidden group">
<div className="relative overflow-hidden">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Man looking up at a sky full of abstract data visualizations" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB86sk0I4wNu6V9JgHNc9b0H25aseGwzjGjoPoE4PmkQ4Mx89BzI80QWBFRISU_aw_cqTBWInTp8iHhkZCND0yFgqVDhV2tRw7Yp4dUrq9hfrMbI6AwxcyCIzc7nx6vRFQLqg9TmGRQ2SQtrdDD2qNWA5Vp6t6TbTgoHogKn4Nn2u0Khxhq-4yb9wtuAyll0uyPW8JQDQa2wuganCE7Kur5uDLEB8wffC6dbt6i2X4ZNWNtpvTeCoLzoH5ZdhIFSSL_Q-dvljxCfys"/>
</div>
<div className="p-4 flex flex-col flex-grow">
<h3 className="text-white text-lg font-bold">La Paradoja del Tiempo</h3>
<p className="text-white/70 text-sm mt-2 flex-grow">Un físico descubre accidentalmente el viaje en el tiempo y debe arreglar la historia antes de que se desmorone por completo.</p>
<button className="mt-4 w-full flex items-center justify-center rounded-md h-10 bg-primary/80 hover:bg-primary text-white text-sm font-bold transition-colors">Ver Detalles</button>
</div>
</div>

<div className="flex flex-col bg-white/5 rounded-lg overflow-hidden group">
<div className="relative overflow-hidden">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A lone spaceship drifts in the vastness of space near a nebula" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_xOWZjGg5wo3KJN06xu90KN8_0zuY4rCk7jvZFs_s0Pvy-gzG0bnl4R64CuDobGplAZRNHjpp30ddpdmPOoECZpdJsXKWl2ex2SyRvtK7rgxXeeANHVI4bxyrkRqPf0rFCKJi0bOMZUFDrXd7lG4_ToNFpnd9pjuZDfi5wmW2l6AJHSQfjAJJ3E178284QgJIcxbACtdN-EYUzi9vB5Hdcyebtzax93Wtf-yej4RTvdevFykct9FACU4wInGmBgzpPDgNzarXpXM"/>
</div>
<div className="p-4 flex flex-col flex-grow">
<h3 className="text-white text-lg font-bold">Odisea Estelar</h3>
<p className="text-white/70 text-sm mt-2 flex-grow">La última nave de la humanidad busca un nuevo hogar entre las estrellas, enfrentándose a maravillas y terrores desconocidos.</p>
<button className="mt-4 w-full flex items-center justify-center rounded-md h-10 bg-primary/80 hover:bg-primary text-white text-sm font-bold transition-colors">Ver Detalles</button>
</div>
</div>

<div className="flex flex-col bg-white/5 rounded-lg overflow-hidden group">
<div className="relative overflow-hidden">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A knight in shining armor standing in front of a castle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgf09zThS6DS1sk3yNxmeJbHBq4HZVa2Ei0EOee95atvG9g3toa3o4y2UFVZOf4bAfQPuQHP_9Ed60mTXrNzwGBrGn0o_TmbHUGiiDzXznNCmHI1tHl7FpBSolJFrYFBfdM9y6eMjxQ4PDaTcHg_13rkj0QQQ9binFQFNDBj7mYLoTPyetuKMGpbpPP5fGXTeYeu4iE2VI6DvbQBAf7drP2UGUY3e8iAFuwhG-IwRd8Q77gmQpo-wT1_qypzxiWZwv7yGaKrcMUTk"/>
</div>
<div className="p-4 flex flex-col flex-grow">
<h3 className="text-white text-lg font-bold">El Reino de Sombras</h3>
<p className="text-white/70 text-sm mt-2 flex-grow">Un joven caballero debe unir los reinos enfrentados para combatir una antigua oscuridad que amenaza con consumirlo todo.</p>
<button className="mt-4 w-full flex items-center justify-center rounded-md h-10 bg-primary/80 hover:bg-primary text-white text-sm font-bold transition-colors">Ver Detalles</button>
</div>
</div>

<div className="flex flex-col bg-white/5 rounded-lg overflow-hidden group">
<div className="relative overflow-hidden">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A group of people playing a video game in a dark room with neon lights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACpe7n0Cl2tUlqWbKERPYSUg8ZXBCHepwRlT-2oo7YJMX36my1HcxGdNNBtDjsr5-tsFH5vtTwAVpIW37UxxRtOa9EumRqOtsunbGtJW-ipjM7q9rAYJlC9roi_mrtZGcQ7_dLRDNw-jr6hE2Pvsld--lo2fG0gLsZlEj9AAsL0bNQt1bIeWlS-Jrc6t2quRudej1tsU06z-KO33sXF_NAMJ-QwRkipHgGEAdA-yCK7v3WZ-sKlairB_faGwwrttnZdTNEsEQj9gw"/>
</div>
<div className="p-4 flex flex-col flex-grow">
<h3 className="text-white text-lg font-bold">Nivel Final</h3>
<p className="text-white/70 text-sm mt-2 flex-grow">Un grupo de jugadores queda atrapado dentro de un videojuego de realidad virtual y debe superar el nivel final para poder escapar.</p>
<button className="mt-4 w-full flex items-center justify-center rounded-md h-10 bg-primary/80 hover:bg-primary text-white text-sm font-bold transition-colors">Ver Detalles</button>
</div>
</div>
</div>
</main>
</div>
</div>
</div>
</div>
  )
}

export default Catalog