const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ubicaciones'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado a la base de datos');
});

// Ruta para guardar la ubicación
app.post('/save-location', (req, res) => {
    const { latitude, longitude } = req.body;
    const query = 'INSERT INTO ubicaciones (latitude, longitude) VALUES (?, ?)';
    db.query(query, [latitude, longitude], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
