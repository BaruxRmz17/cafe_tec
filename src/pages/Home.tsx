import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Home = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    updateAvailability();
    const interval = setInterval(updateAvailability, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateAvailability = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const schedules = [
      { start: 7 * 3600, end: 9 * 3600 + 30 * 60 },
      { start: 11 * 3600, end: 14 * 3600 },
    ];

    let available = false;
    let nextChange = 24 * 3600;

    for (const { start, end } of schedules) {
      if (totalSeconds >= start && totalSeconds < end) {
        available = true;
        nextChange = end;
        break;
      }
      if (totalSeconds < start && start < nextChange) {
        nextChange = start;
      }
    }

    setIsAvailable(available);
    const remainingSeconds = nextChange - totalSeconds;
    const hoursLeft = Math.floor(remainingSeconds / 3600);
    const minutesLeft = Math.floor((remainingSeconds % 3600) / 60);
    const secondsLeft = remainingSeconds % 60;
    setTimeLeft(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 text-center p-6">
      <div className="max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-purple-900 flex items-center justify-center gap-2">
          Bienvenido a Café Tec
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mt-6 max-w-lg mx-auto leading-relaxed">
          El spot perfecto para universitarios: disfruta de café, comida rica y pedidos rápidos desde tu móvil.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            to="/menu" 
            className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-2"
          >
            Ver Menú <ChevronRight size={20} />
          </Link>
          <button 
            disabled={!isAvailable}
            className={`px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 flex items-center justify-center gap-2 ${
              isAvailable
                ? "bg-gradient-to-r from-purple-800 to-indigo-900 text-white hover:shadow-xl hover:scale-105"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            Hacer Pedido <ChevronRight size={20} />
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-700">{isAvailable ? `Tiempo restante: ${timeLeft}` : `Disponible en: ${timeLeft}`}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-indigo-900/10 to-transparent pointer-events-none" />
      <div className="mt-8 text-gray-600 text-sm text-center">
        <p>📅 Horarios de pedidos:</p>
        <p>🕖 7:00 AM - 9:30 AM</p>
        <p>🕚 11:00 AM - 2:00 PM</p>
      </div>
    </div>
  );
};

export default Home;
