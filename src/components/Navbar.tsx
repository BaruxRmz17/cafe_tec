import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import React from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOrderAvailable, setIsOrderAvailable] = useState(false);

  useEffect(() => {
    const checkOrderAvailability = () => {
      // Get current time in Mexico Central Time (Aguascalientes)
      const now = new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" });
      const date = new Date(now);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      
      // Convert time to minutes for easier comparison
      const totalMinutes = hours * 60 + minutes;
      
      // Define time ranges in minutes
      const morningStart = 7 * 60;      // 7:00 AM
      const morningEnd = 9 * 60 + 30;   // 9:30 AM
      const afternoonStart = 11 * 60;   // 11:00 AM
      const afternoonEnd = 14 * 60;     // 2:00 PM
      
      // Check if current time falls within available periods
      const isMorningPeriod = totalMinutes >= morningStart && totalMinutes < morningEnd;
      const isAfternoonPeriod = totalMinutes >= afternoonStart && totalMinutes < afternoonEnd;
      
      setIsOrderAvailable(isMorningPeriod || isAfternoonPeriod);
    };

    // Check immediately and then every minute
    checkOrderAvailability();
    const interval = setInterval(checkOrderAvailability, 60000); // Update every minute
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 text-white p-4 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold tracking-tight hover:text-indigo-300 transition-colors duration-200" onClick={scrollToTop}>Café Tec</Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-lg font-medium hover:text-indigo-300 transition-all duration-200" onClick={scrollToTop}>Home</Link>
          <Link to="/menu" className="text-lg font-medium hover:text-indigo-300 transition-all duration-200" onClick={scrollToTop}>Menú</Link>
          <span className={`text-lg font-medium transition-all duration-200 ${isOrderAvailable ? "hover:text-indigo-300 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}>
            {isOrderAvailable ? <Link to="/pedido" onClick={scrollToTop}>Pedidos</Link> : "Pedidos"}
          </span>
          <Link to="/comentarios" className="text-lg font-medium hover:text-indigo-300 transition-all duration-200" onClick={scrollToTop}>Comentarios</Link>
          <Link to="/LoginAdmin" className="text-lg font-semibold bg-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-500 transition-all duration-200" onClick={scrollToTop}>Admin</Link>
        </div>

        <div className="md:hidden">
          <button className="p-2 rounded-full bg-indigo-700 text-white hover:bg-indigo-600 transition-all duration-200" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-indigo-800 mt-4 rounded-lg shadow-lg p-6 flex flex-col items-center space-y-6">
          <Link to="/" className="text-lg font-medium hover:text-indigo-300 transition-all duration-200" onClick={() => { setIsOpen(false); scrollToTop(); }}>Home</Link>
          <Link to="/menu" className="text-lg font-medium hover:text-indigo-300 transition-all duration-200" onClick={() => { setIsOpen(false); scrollToTop(); }}>Menú</Link>
          <span className={`text-lg font-medium transition-all duration-200 ${isOrderAvailable ? "hover:text-indigo-300 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}>
            {isOrderAvailable ? <Link to="/pedido" onClick={() => { setIsOpen(false); scrollToTop(); }}>Pedidos</Link> : "Pedidos"}
          </span>
          <Link to="/comentarios" className="text-lg font-medium hover:text-indigo-300 transition-all duration-200" onClick={() => { setIsOpen(false); scrollToTop(); }}>Comentarios</Link>
          <Link to="/LoginAdmin" className="text-lg font-semibold bg-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-500 transition-all duration-200" onClick={() => { setIsOpen(false); scrollToTop(); }}>Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;