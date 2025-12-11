import { Link } from "react-router-dom"

function Navbar() {
  return (
    <header className=" text-white p-4 flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 sm:px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <Link to = {'/'}>
          <h1 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em]">Digital Space </h1>
        </Link>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link to={'/catalog'}>
            <a className="text-white text-xl font-medium leading-normal hover:text-primary transition-colors" href="#">Catálogo</a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar