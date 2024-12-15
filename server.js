const express = require('express');
const path = require('path');
const app = express();

// Puerto donde se ejecutará el servidor
const PORT = 3000;

// Ruta para servir archivos estáticos desde el directorio actual
app.use(express.static(path.join(__dirname)));

// Ruta principal para redirigir al archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejo de rutas no encontradas (opcional)
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en: http://localhost:${PORT}`);
});
