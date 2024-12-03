const Venta = require("../models/ventasModel");

const ventasPorPeriodo = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;

        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({ error: "Se requieren 'fechaInicio' y 'fechaFin'" });
        }

        const resultado = await Venta.aggregate([
            {
                $match: {
                    fecha_venta: {
                        $gte: new Date(fechaInicio),
                        $lte: new Date(fechaFin)
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalVentas: { $sum: "$total" }, 
                    totalProductosVendidos: { $sum: "$cantidad" } 
                }
            }
        ]);

        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al analizar ventas por período de tiempo:", error.message);
        res.status(500).json({ error: "No se pudo realizar el análisis por período de tiempo." });
    }
};

const ventasPorUbicacion = async (req, res) => {
    try {
        const resultado = await Venta.aggregate([
            {
                $group: {
                    _id: "$ubicacion", 
                    totalVentas: { $sum: "$total" }, 
                    totalProductosVendidos: { $sum: "$cantidad" } 
                }
            },
            {
                $sort: { totalVentas: -1 } 
            }
        ]);

        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al analizar ventas por ubicación:", error.message);
        res.status(500).json({ error: "No se pudo realizar el análisis por ubicación." });
    }
};

const ventasPorCategoria = async (req, res) => {
    try {
        const resultado = await Venta.aggregate([
            {
                $group: {
                    _id: "$categoria",
                    totalVentas: { $sum: "$total" }, 
                    totalProductosVendidos: { $sum: "$cantidad" } 
                }
            },
            {
                $sort: { totalVentas: -1 }
            }
        ]);

        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al analizar ventas por categoría:", error.message);
        res.status(500).json({ error: "No se pudo realizar el análisis por categoría." });
    }
};

const rentabilidadProductos = async (req, res) => {
    try {
        const resultado = await Venta.aggregate([
            {
                $group: {
                    _id: "$producto", 
                    totalIngresos: { $sum: "$total" }, 
                    totalCantidadVendida: { $sum: "$cantidad" } 
                }
            },
            {
                $sort: { totalIngresos: -1 } 
            }
        ]);

        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al analizar la rentabilidad:", error.message);
        res.status(500).json({ error: "No se pudo realizar el análisis de rentabilidad." });
    }
};

const actualizarTotales = async (req, res) => {
    try {
        const ventasSinTotal = await Venta.find({ total: { $exists: false } });

        for (let venta of ventasSinTotal) {
            const total = venta.cantidad * venta.precio_unitario;

            await Venta.updateOne({ _id: venta._id }, { $set: { total } });
        }

        res.status(200).json({
            message: "Totales actualizados correctamente",
            totalVentasActualizadas: ventasSinTotal.length,
        });
    } catch (error) {
        console.error("Error al actualizar los totales:", error.message);
        res.status(500).json({ error: "No se pudieron actualizar los totales." });
    }
};

const agregarVenta = async (req, res) => {
    try {
        const { producto, categoria, cantidad, precio_unitario, cliente, ubicacion, fecha_venta } = req.body;

        if (!producto || !categoria || !cantidad || !precio_unitario || !fecha_venta) {
            return res.status(400).json({ error: "Todos los campos requeridos deben ser proporcionados." });
        }

        const total = cantidad * precio_unitario;

        const nuevaVenta = new Venta({
            producto,
            categoria,
            cantidad,
            precio_unitario,
            total,
            cliente,
            ubicacion,
            fecha_venta,
        });

        const ventaGuardada = await nuevaVenta.save();
        res.status(201).json(ventaGuardada);
    } catch (error) {
        console.error("Error al agregar la venta:", error.message);
        res.status(500).json({ error: "No se pudo agregar la venta." });
    }
};

module.exports = {
    agregarVenta,
    actualizarTotales,
    ventasPorCategoria,
    ventasPorUbicacion,
    ventasPorPeriodo,
    rentabilidadProductos
};
