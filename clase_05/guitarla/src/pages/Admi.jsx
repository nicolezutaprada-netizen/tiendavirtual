import { useState } from "react"
import Swal from "sweetalert2"

export default function Admi() {
  const [formulario, setFormulario] = useState({ nombre: "", dni: "" })
  const [guardando, setGuardando] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormulario((actual) => ({ ...actual, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (guardando) return

    const datos = { nombre: formulario.nombre.trim(), dni: formulario.dni.trim() }
    if (!datos.nombre || !datos.dni) {
      await Swal.fire({ title: "Completa el nombre y el DNI", icon: "warning" })
      return
    }

    setGuardando(true)
    try {
      const respuesta = await fetch("https://6ac44bedae53bf25b80f5524.mockapi.io/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) {
        throw new Error(`El servidor rechazó el registro (HTTP ${respuesta.status}).`)
      }
      const usuario = await respuesta.json()
      await Swal.fire({
        titleText: `Usuario ${usuario.nombre} creado con id ${usuario.id}`,
        icon: "success",
      })
      setFormulario({ nombre: "", dni: "" })
    } catch (error) {
      await Swal.fire({
        titleText: "No se pudo confirmar el registro",
        text: error.message,
        icon: "error",
      })
    } finally {
      setGuardando(false)
    }
  }

  return (
    <section className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Registrar usuario</h1>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={guardando} className="flex flex-col gap-4">
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" type="text" name="nombre" value={formulario.nombre}
            onChange={handleChange} placeholder="Nombre del usuario" required
            className="border rounded p-2" />
          <label htmlFor="dni">DNI</label>
          <input id="dni" type="text" name="dni" value={formulario.dni}
            onChange={handleChange} placeholder="DNI" required
            className="border rounded p-2" />
          <button type="submit" className="bg-green-300 p-2 rounded disabled:opacity-60">
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </fieldset>
      </form>
    </section>
  )
}
