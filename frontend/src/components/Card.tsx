import { Link } from "react-router-dom";
import type { MediaCardProps } from "../types/Types";

function Card({ title, imageUrl, sinopsis, tags, type, id }: MediaCardProps) {
  return (
    <div className="flex flex-col bg-white/5 rounded-lg overflow-hidden group ">
      <div className="relative overflow-hidden">
        <img
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          data-alt="A lone spaceship drifts in the vastness of space near a nebula"
          src={imageUrl}
        />
      </div>
      <div className="p-4 flex flex-col grow">
        <h3 className="text-white text-lg font-bold">{title}</h3>
        <p className="text-white/70 text-sm mt-2 grow">{sinopsis}</p>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          to={`/${type}/details/${id}`}
          className="mt-4 w-full flex items-center justify-center rounded-md h-10 bg-primary/80 hover:bg-primary text-white text-sm font-bold transition-colors cursor-pointer"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default Card;
