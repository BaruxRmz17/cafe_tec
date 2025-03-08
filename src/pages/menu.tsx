// src/pages/VerMenu.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/supabase'; // Ajusta la ruta según tu estructura
import { Coffee } from 'lucide-react';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  categoria: string;
}

const VerMenu: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('Todas');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Cargar productos y categorías al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from('producto')
        .select('id, nombre, descripcion, precio, categoria')
        .order('categoria', { ascending: true })
        .order('nombre', { ascending: true });

      if (error) {
        setError('Error al cargar el menú: ' + error.message);
        return;
      }

      const productosData = data || [];
      setProductos(productosData);

      // Extraer categorías únicas
      const categoriasUnicas = Array.from(
        new Set(productosData.map((p) => p.categoria))
      ).sort();
      setCategorias(['Todas', ...categoriasUnicas]);
    };

    fetchProductos();
  }, []);

  // Filtrar productos según la categoría seleccionada
  const productosFiltrados =
    filtroCategoria === 'Todas'
      ? productos
      : productos.filter((producto) => producto.categoria === filtroCategoria);

  // Agrupar productos por categoría (solo si no hay filtro o es "Todas")
  const productosPorCategoria =
    filtroCategoria === 'Todas'
      ? productosFiltrados.reduce((acc, producto) => {
          if (!acc[producto.categoria]) {
            acc[producto.categoria] = [];
          }
          acc[producto.categoria].push(producto);
          return acc;
        }, {} as Record<string, Producto[]>)
      : { [filtroCategoria]: productosFiltrados };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
         {/* Botón para volver al Home */}
         <button
         onClick={() => navigate('/')} // O '/HomeAdmin' si es solo para admins       
          className="mb-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Volver al Home
        </button>
        <h2 className="text-3xl md:text-4xl font-extrabold text-indigo-900 mb-8 text-center flex items-center justify-center gap-2">
          <Coffee size={32} /> Menú de Café Tec
        </h2>

        {/* Filtro por categoría */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-2 text-center">
            Filtrar por Categoría
          </label>
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="w-full max-w-xs mx-auto block p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {productos.length === 0 && !error && (
          <p className="text-gray-500 text-center mb-4">No hay productos en el menú aún.</p>
        )}

        {/* Lista de productos por categoría */}
        {Object.keys(productosPorCategoria).length > 0 && (
          <div className="space-y-12">
            {Object.entries(productosPorCategoria).map(([categoria, items]) => (
              <div key={categoria} className="bg-white p-6 rounded-xl shadow-xl">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4 capitalize">
                  {categoria}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {items.map((producto) => (
                    <div
                      key={producto.id}
                      className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 flex flex-col"
                    >
                      <div className="flex justify-between items-start">
                        <p className="font-semibold text-gray-800">{producto.nombre}</p>
                        <p className="text-lg font-bold text-indigo-900">
                          ${producto.precio.toFixed(2)}
                        </p>
                      </div>
                      {producto.descripcion && (
                        <p className="text-sm text-gray-600 mt-1">{producto.descripcion}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

    
      </div>
    </div>
  );
};

export default VerMenu;