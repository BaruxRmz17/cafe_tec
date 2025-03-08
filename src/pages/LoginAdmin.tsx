// src/pages/LoginAdmin.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/supabase';

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Consultar la tabla 'admin' para verificar las credenciales
    const { data: adminData, error: fetchError } = await supabase
      .from("admin")
      .select("id, nombre, correo, password")
      .eq("correo", email)
      .single();

    if (fetchError || !adminData) {
      setError("Usuario no encontrado o error en la base de datos.");
      return;
    }

    // Verificar la contraseña directamente (sin hash por ahora)
    if (adminData.password !== password) {
      setError("Contraseña incorrecta.");
      return;
    }

    // Si todo está bien, mostrar mensaje y redirigir
    alert(`Bienvenido, ${adminData.nombre}`);
    navigate("/HomeAdmin"); // Redirige a HomeAdmin tras login exitoso
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-indigo-900 mb-6 text-center">
          Login Administrador
        </h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="admin@cafetec.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}