import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import React from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 text-white p-4 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-3xl font-extrabold tracking-tight hover:text-indigo-300 transition-colors duration-200"
          onClick={scrollToTop} // Hacer scroll al hacer clic
        >
          Café Tec
        </Link>

        {/* Menú Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-lg font-medium hover:text-indigo-300 hover:scale-105 transform transition-all duration-200"
            onClick={scrollToTop} // Hacer scroll al hacer clic
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            className="text-lg font-medium hover:text-indigo-300 hover:scale-105 transform transition-all duration-200"
            onClick={scrollToTop} // Hacer scroll al hacer clic
          >
            Menú
          </Link>
          <Link 
            to="/pedido" 
            className="text-lg font-medium hover:text-indigo-300 hover:scale-105 transform transition-all duration-200"
            onClick={scrollToTop} // Hacer scroll al hacer clic
          >
            Pedidos
          </Link>
          <Link 
            to="/comentarios" 
            className="text-lg font-medium hover:text-indigo-300 hover:scale-105 transform transition-all duration-200"
            onClick={scrollToTop} // Hacer scroll al hacer clic
          >
            Comentarios
          </Link>
          <Link 
            to="/LoginAdmin" 
            className="text-lg font-semibold bg-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-500 transition-all duration-200"
            onClick={scrollToTop} // Hacer scroll al hacer clic
          >
            Admin
          </Link>
        </div>

        {/* Botón Hamburguesa Mobile */}
        <div className="md:hidden">
          <button
            className="p-2 rounded-full bg-indigo-700 text-white hover:bg-indigo-600 transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú Mobile */}
      {isOpen && (
        <div className="md:hidden bg-indigo-800 mt-4 rounded-lg shadow-lg p-6 flex flex-col items-center space-y-6 animate-slide-down">
          <Link 
            to="/" 
            className="text-lg font-medium hover:text-indigo-300 transition-colors duration-200"
            onClick={() => { setIsOpen(false); scrollToTop(); }} // Cerrar y hacer scroll
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            className="text-lg font-medium hover:text-indigo-300 transition-colors duration-200"
            onClick={() => { setIsOpen(false); scrollToTop(); }} // Cerrar y hacer scroll
          >
            Menú
          </Link>
          <Link 
            to="/pedido" 
            className="text-lg font-medium hover:text-indigo-300 transition-colors duration-200"
            onClick={() => { setIsOpen(false); scrollToTop(); }} // Cerrar y hacer scroll
          >
            Pedidos
          </Link>
          <Link 
            to="/comentarios" 
            className="text-lg font-medium hover:text-indigo-300 transition-colors duration-200"
            onClick={() => { setIsOpen(false); scrollToTop(); }} // Cerrar y hacer scroll
          >
            Comentarios
          </Link>
          <Link 
            to="/LoginAdmin" 
            className="text-lg font-semibold bg-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-500 transition-all duration-200"
            onClick={() => { setIsOpen(false); scrollToTop(); }} // Cerrar y hacer scroll
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
