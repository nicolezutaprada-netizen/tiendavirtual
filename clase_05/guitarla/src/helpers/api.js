export async function obtenerAPI(url, options = {}) {
  const respuesta = await fetch(url, options)

  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar la información (HTTP ${respuesta.status}).`)
  }

  return await respuesta.json()
}
