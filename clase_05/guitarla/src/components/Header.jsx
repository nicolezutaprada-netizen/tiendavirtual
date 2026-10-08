import { Link } from "react-router-dom"
import { IoCartOutline } from "react-icons/io5"
import { CiUser } from "react-icons/ci"

export default function Header() {
  return (
    <header className="border flex flex-wrap items-center justify-between gap-5 py-5 px-6 lg:px-15">
      <Link to="/" className="font-bold text-xl">Luthier &amp; Co.</Link>
      <nav aria-label="Navegación principal" className="flex flex-wrap items-center gap-4">
        <Link to="/catalogo">Shop</Link>
        <Link to="/productos">Dragon Ball</Link>
        <Link to="/contacto">Contacto</Link>
        <Link to="/acerca">About</Link>
      </nav>
      <div className="flex items-center gap-2">
        <IoCartOutline className="text-2xl" aria-label="Carrito (próximamente)" />
        <Link to="/admi" aria-label="Registrar usuario"><CiUser className="text-2xl" /></Link>
      </div>
    </header>
  )
}
