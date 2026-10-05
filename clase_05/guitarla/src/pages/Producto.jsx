import { useEffect, useState } from "react"
import { obtenerAPI } from "../helpers/api"
import PersonajeCard from "../components/PersonajeCard"

export default function Productos() {
  const [personajes, setPersonajes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Consultamos la API al montar la página y guardamos los personajes en el estado.
  useEffect(() => {
    const controller = new AbortController()

    async function obtenerPersonajes() {
      try {
        const response = await obtenerAPI("https://dragonball-api.com/api/characters", {
          signal: controller.signal,
        })
        if (!Array.isArray(response.items)) {
          throw new Error("La API no devolvió una lista de personajes.")
        }
        if (!controller.signal.aborted) setPersonajes(response.items)
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    obtenerPersonajes()
    return () => controller.abort()
  }, [])

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Personajes de Dragon Ball</h1>
      {loading ? (
        <p role="status">Cargando personajes...</p>
      ) : error ? (
        <p role="alert" className="text-red-700">{error}</p>
      ) : personajes.length === 0 ? (
        <p>No hay personajes disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {personajes.map((personaje) => (
            <PersonajeCard
              key={personaje.id}
              image={personaje.image}
              name={personaje.name}
              ki={personaje.ki}
            />
          ))}
        </div>
      )}
    </section>
  )
}
