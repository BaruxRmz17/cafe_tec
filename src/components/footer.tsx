import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Coffee } from "lucide-react"; // Añadimos íconos de Lucide

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 text-white p-6 mt-10 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Sección Izquierda */}
        <div className="flex flex-col items-center md:items-start">
          <Link 
            to="/" 
            className="text-2xl font-extrabold tracking-tight hover:text-indigo-300 transition-colors duration-200 flex items-center"
          >
            <Coffee size={24} className="mr-2" /> Café Tec
          </Link>
          <p className="text-sm mt-2 opacity-80">
            © {new Date().getFullYear()} Café Tec. Todos los derechos reservados.
          </p>
        </div>

        {/* Sección Derecha */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          {/* Redes Sociales */}
          
          {/* Créditos */}
          <p className="text-sm">
            Creado por{" "}
            <a 
              href="https://ramireztech.netlify.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold hover:text-indigo-300 transition-colors duration-200"
            >
              Ramirez Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;