import React, { useState } from "react";
import Navbar from "../../components/Navbar/navbar";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const telefono = "50373707035"; // número real en formato internacional
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(
      `Hola, soy ${nombre}. ${mensaje}`
    )}`;

    setTimeout(() => {
      window.open(url, "_blank");
      setLoading(false);
    }, 1500); // delay para mostrar el loader
  };

  return (
    <div>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-6 py-12">
        <div className="w-full max-w-lg bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800 p-10 text-white relative">
          {loading && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center rounded-3xl z-20">
              <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-cyan-400 font-medium tracking-wide animate-pulse">
                Redirigiendo a WhatsApp...
              </p>
            </div>
          )}

          <h2 className="text-4xl font-bold tracking-tight text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Contáctanos
          </h2>
          <p className="text-gray-400 text-center mb-10">
            Déjanos tu mensaje y te responderemos lo antes posible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tu nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                placeholder="Ingresa tu nombre"
                className="w-full px-4 py-3 rounded-2xl bg-gray-900/70 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mensaje
              </label>
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
                placeholder="Escribe tu mensaje..."
                rows="4"
                className="w-full px-4 py-3 rounded-2xl bg-gray-900/70 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold text-lg tracking-wide text-white shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar por WhatsApp"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
