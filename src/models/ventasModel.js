const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema(
    {
        producto: { type: String, required: true }, 
        categoria: { type: String, required: true }, 
        cantidad: { type: Number, required: true }, 
        precio_unitario: { type: Number, required: true },
        total: { type: Number, required: true }, 
        cliente: { type: String }, 
        ubicacion: { type: String },
        fecha_venta: { type: Date, required: true },
    },
    { collection: "ventas" } 
);

module.exports = mongoose.model("Venta", VentaSchema);
