// src/pages/admin/PedidoAdmin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/supabase'; // Ajusta la ruta según tu estructura
import { ShoppingCart, CheckCircle } from 'lucide-react';

interface DetallePedido {
  id: number;
  producto: {
    id: number;
    nombre: string;
    precio: number;
    categoria: string;
  };
  cantidad: number;
}

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
  detalle_pedido: DetallePedido[];
}

const PedidoAdmin: React.FC = () => {
  const [codigo, setCodigo] = useState('');
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setPedido(null);

    if (!codigo) {
      setError('Por favor, ingresa un código de pedido.');
      return;
    }

    // Buscar el pedido por código
    const { data, error: fetchError } = await supabase
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
      .eq('codigo', codigo)
      .single();

    if (fetchError || !data) {
      setError('No se encontró un pedido con ese código.');
      return;
    }

    setPedido(data);
  };

  const handleFinalize = async () => {
    if (!pedido) return;

    setError('');
    setSuccess('');

    // Actualizar el estado del pedido a "Completado"
    const { error: updateError } = await supabase
      .from('pedido')
      .update({ estado: 'Completado' })
      .eq('id', pedido.id);

    if (updateError) {
      setError('Error al finalizar el pedido: ' + updateError.message);
      return;
    }

    setSuccess('Pedido finalizado exitosamente.');
    setPedido({ ...pedido, estado: 'Completado' });
    window.scrollTo(0, 0); // Esto asegura que la página siempre empiece desde la parte superior

  };

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
          Gestionar Pedidos
        </h2>

        {/* Input para buscar pedido */}
        <div className="bg-white p-6 rounded-xl shadow-xl mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-2/3">
              <label className="block text-gray-700 font-medium mb-2">
                Ingresa el Código del Pedido
              </label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Ej. ABC123"
                maxLength={6}
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 text-white p-3 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 mt-4 sm:mt-0"
            >
              Buscar
            </button>
          </form>
        </div>

        {/* Mensajes y detalles del pedido */}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4 text-center">{success}</p>}

        {pedido && (
          <div className="bg-white p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <ShoppingCart size={24} /> Detalles del Pedido #{pedido.codigo}
            </h3>

            {/* Información del cliente */}
            <div className="mb-4">
              <p className="font-semibold text-gray-800">Cliente:</p>
              <p className="text-gray-700">{pedido.usuario.nombre} ({pedido.usuario.correo})</p>
            </div>

            {/* Método de pago */}
            <div className="mb-4">
              <p className="font-semibold text-gray-800">Método de Pago:</p>
              <p className="text-gray-700">{pedido.metodo_pago}</p>
            </div>

            {/* Estado */}
            <div className="mb-4">
              <p className="font-semibold text-gray-800">Estado:</p>
              <p className={`text-gray-700 ${pedido.estado === 'Completado' ? 'text-green-600' : 'text-yellow-600'}`}>
                {pedido.estado}
              </p>
            </div>

            {/* Productos ordenados */}
            <div className="mb-6">
              <p className="font-semibold text-gray-800 mb-2">Productos:</p>
              {pedido.detalle_pedido.length === 0 ? (
                <p className="text-gray-500">No hay productos en este pedido.</p>
              ) : (
                <ul className="space-y-2">
                  {pedido.detalle_pedido.map((detalle) => (
                    <li key={detalle.id} className="flex justify-between border-b py-2">
                      <span>
                        {detalle.producto.nombre} ({detalle.producto.categoria}) x{detalle.cantidad}
                      </span>
                      <span>${(detalle.producto.precio * detalle.cantidad).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Total */}
            <div className="mb-6">
              <p className="font-semibold text-gray-800">Total a Pagar:</p>
              <p className="text-xl font-bold text-indigo-900">${pedido.total.toFixed(2)}</p>
            </div>

            {/* Botón Finalizar Pedido */}
            {pedido.estado !== 'Completado' && (
              <button
                onClick={handleFinalize}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white p-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} /> Finalizar Pedido
              </button>
            )}
          </div>
        )}

      
      </div>
    </div>
  );
};

export default PedidoAdmin;