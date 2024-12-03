const express = require("express");
const { agregarVenta } = require("../controllers/ventasController");
const { actualizarTotales } = require("../controllers/ventasController");
const { ventasPorCategoria, ventasPorUbicacion, ventasPorPeriodo, rentabilidadProductos } = require("../controllers/ventasController");

const router = express.Router();

router.post("/agregar", agregarVenta);
router.put("/actualizarTotales", actualizarTotales);
router.get("/analisis/categoria", ventasPorCategoria);
router.get("/analisis/ubicacion", ventasPorUbicacion);
router.get("/analisis/periodo", ventasPorPeriodo);
router.get("/analisis/rentabilidad", rentabilidadProductos);

module.exports = router;
