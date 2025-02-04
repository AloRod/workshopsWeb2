// Importar express y otras dependencias
const express = require('express');
const cors = require('cors'); // Para manejar solicitudes desde el frontend
const app = express();
const port = 3001;

// Usar CORS para permitir solicitudes desde otros orígenes
app.use(cors());

// Definir la ruta para obtener el tipo de cambio
app.get('/tipodecambio', (req, res) => {
  const type = req.query.type; // Obtenemos el parámetro 'type' de la URL

  // Simular la respuesta de la API 
  if (type === 'usd') {
    res.json({
      TipoCompraDolares: 1.23,
      TipoVentaDolares: 1.25,
      TipoCompraEuros: 1.10,
      TipoVentaEuros: 1.12,
    });
  } else if (type === 'eur') {
    res.json({
      TipoCompraDolares: 1.23,
      TipoVentaDolares: 1.25,
      TipoCompraEuros: 1.10,
      TipoVentaEuros: 1.12,
    });
  } else {
    res.status(400).send('Tipo de cambio no válido');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
