
type CardProps = {
  title: string;
  description: string;
  imageSrc: string; 
}

function Card(CardProps: CardProps) {
  return (
    <div className="flex flex-col bg-white/5 rounded-lg overflow-hidden group">
<div className="relative overflow-hidden">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-alt="A lone spaceship drifts in the vastness of space near a nebula" src={CardProps.imageSrc}/>
</div>
<div className="p-4 flex flex-col grow">
<h3 className="text-white text-lg font-bold">{CardProps.title}</h3>
<p className="text-white/70 text-sm mt-2 grow">{CardProps.description}</p>
<button className="mt-4 w-full flex items-center justify-center rounded-md h-10 bg-primary/80 hover:bg-primary text-white text-sm font-bold transition-colors">Ver Detalles</button>
</div>
</div>
  )
}

export default Card