const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");
const cors = require('cors');
const ventasRoutes = require("./routes/ventasRoutes");


// Middleware y rutas aquí
app.get("/", (req, res) => {
  res.send("Servidor corriendo correctamente");
});

app.use(cors());

connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para procesar datos codificados en URL
app.use(express.urlencoded({ extended: true }));

//app.use("/api/", userRoutes);
app.use("/api/ventas", ventasRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});