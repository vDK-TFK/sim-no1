import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [ventasCategoria, setVentasCategoria] = useState([]);
  const [ventasUbicacion, setVentasUbicacion] = useState([]);
  const [ventasPeriodo, setVentasPeriodo] = useState([]);
  const [rentabilidadProductos, setRentabilidadProductos] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/ventas/analisis/categoria")
      .then((response) => setVentasCategoria(response.data))
      .catch((error) => console.error("Error al obtener ventas por categoría:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/ventas/analisis/ubicacion")
      .then((response) => setVentasUbicacion(response.data))
      .catch((error) => console.error("Error al obtener ventas por ubicación:", error));
  }, []);

  const fetchVentasPeriodo = () => {
    axios
      .get(`http://localhost:3000/api/ventas/analisis/periodo?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
      .then((response) => setVentasPeriodo(response.data))
      .catch((error) => console.error("Error al obtener ventas por período:", error));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/ventas/analisis/rentabilidad")
      .then((response) => setRentabilidadProductos(response.data))
      .catch((error) =>
        console.error("Error al obtener la rentabilidad de los productos:", error)
      );
  }, []);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Análisis de Ventas</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ventas por Categoría</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventasCategoria.map((venta, index) => (
            <div key={index} className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-blue-500">{venta._id}</h3>
              <p className="text-gray-700">Total Ventas: ${venta.totalVentas.toFixed(2)}</p>
              <p className="text-gray-700">Productos Vendidos: {venta.totalProductosVendidos}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ventas por Ubicación</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventasUbicacion.map((venta, index) => (
            <div key={index} className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-green-500">{venta._id}</h3>
              <p className="text-gray-700">Total Ventas: ${venta.totalVentas.toFixed(2)}</p>
              <p className="text-gray-700">Productos Vendidos: {venta.totalProductosVendidos}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ventas por Período</h2>
        <div className="flex gap-4 mb-6">
          <div>
            <label className="block mb-2 text-gray-600">Fecha de Inicio:</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className="border rounded p-2 w-full shadow-sm"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-600">Fecha de Fin:</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className="border rounded p-2 w-full shadow-sm"
            />
          </div>
        </div>
        <button
          onClick={fetchVentasPeriodo}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Buscar
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {ventasPeriodo.map((venta, index) => (
            <div key={index} className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-purple-500">Período</h3>
              <p className="text-gray-700">Total Ventas: ${venta.totalVentas.toFixed(2)}</p>
              <p className="text-gray-700">Productos Vendidos: {venta.totalProductosVendidos}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Productos Más Rentables</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentabilidadProductos.map((producto, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-md rounded-lg border border-gray-200"
            >
              <h3 className="text-lg font-bold text-red-500">{producto._id}</h3>
              <p className="text-gray-700">Ingresos Totales: ${producto.totalIngresos.toFixed(2)}</p>
              <p className="text-gray-700">Cantidad Vendida: {producto.totalCantidadVendida}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default App;
