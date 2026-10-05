export default function PersonajeCard({ image, name, ki }) {
  return (
    <article className="flex flex-col items-center gap-4 border border-amber-300 rounded-3xl p-6 bg-amber-200">
      <img className="w-40 h-64 object-contain" src={image} alt={name} />
      <h2 className="text-xl font-bold">Nombre: {name}</h2>
      <p>Ki: {ki}</p>
    </article>
  )
}
