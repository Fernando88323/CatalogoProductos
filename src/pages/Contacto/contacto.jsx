import { useState } from "react";
import Navbar from "../../components/Navbar/navbar";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const telefono = "50373707035"; // tu número de WhatsApp
    const texto = `Hola, mi nombre es ${nombre}. ${mensaje}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");

    setNombre("");
    setMensaje("");
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 py-16 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Contacto</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md"
        >
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Nombre:</span>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium">Mensaje:</span>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
              rows={5}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </label>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition-colors"
          >
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;
