// src/pages/admin/VentasTotales.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/supabase'; // Ajusta la ruta según tu estructura
import { DollarSign } from 'lucide-react';

interface Pedido {
  id: number;
  codigo: string;
  usuario: {
    id: number;
    nombre: string;
    correo: string;
  };
  metodo_pago: string;
  total: number;
  estado: string;
  detalle_pedido: {
    id: number;
    cantidad: number;
    producto: {
      id: number;
      nombre: string;
      precio: number;
      categoria: string;
    };
  }[];
}

const VentasTotales: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [totalVentas, setTotalVentas] = useState<number>(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Cargar pedidos completados al montar el componente
  useEffect(() => {
    const fetchVentas = async () => {
      const { data, error } = await supabase
        .from('pedido')
        .select(`
          id,
          codigo,
          metodo_pago,
          total,
          estado,
          usuario (
            id,
            nombre,
            correo
          ),
          detalle_pedido (
            id,
            cantidad,
            producto (
              id,
              nombre,
              precio,
              categoria
            )
          )
        `)
        .eq('estado', 'Completado')
        .order('id', { ascending: false }); // Ordenar por ID descendente (más recientes primero)

      if (error) {
        setError('Error al cargar las ventas: ' + error.message);
        return;
      }

      const pedidosCompletados = data || [];
      setPedidos(pedidosCompletados);

      // Calcular total de ventas
      const total = pedidosCompletados.reduce((sum, pedido) => sum + pedido.total, 0);
      setTotalVentas(total);
    };

    fetchVentas();
    window.scrollTo(0, 0); // Esto asegura que la página siempre empiece desde la parte superior

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
         {/* Botón para volver al Home */}
         <button
          onClick={() => navigate('/HomeAdmin')}
          className="mb-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Volver al Home
        </button>
        <h2 className="text-3xl font-extrabold text-indigo-900 mb-6 text-center">
          Ventas Totales
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        {/* Total de ventas */}
        <div className="bg-white p-6 rounded-xl shadow-xl mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <DollarSign size={24} /> Total Acumulado
          </h3>
          <p className="text-4xl font-bold text-green-600 text-center">
            ${totalVentas.toFixed(2)}
          </p>
        </div>

        {/* Lista de pedidos completados */}
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Pedidos Completados
          </h3>
          {pedidos.length === 0 ? (
            <p className="text-gray-500 text-center">No hay ventas completadas aún.</p>
          ) : (
            <div className="space-y-6">
              {pedidos.map((pedido) => (
                <div
                  key={pedido.id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Pedido #{pedido.codigo} - {pedido.usuario.nombre}
                      </p>
                      <p className="text-sm text-gray-600">
                        Método de Pago: {pedido.metodo_pago}
                      </p>
                      <p className="text-sm text-gray-600">
                        Cliente: {pedido.usuario.correo}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-green-600">
                      ${pedido.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-gray-700">Productos:</p>
                    <ul className="text-sm text-gray-600">
                      {pedido.detalle_pedido.map((detalle) => (
                        <li key={detalle.id}>
                          {detalle.producto.nombre} ({detalle.producto.categoria}) x{detalle.cantidad}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default VentasTotales;