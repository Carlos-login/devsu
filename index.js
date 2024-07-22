import sequelize from './shared/database/database.js';
import { usersRouter } from "./users/router.js";
import express from 'express';

const app = express();
const PORT = 8000;

sequelize.sync({ force: true }).then(() => console.log('db is ready'));

app.use(express.json());
app.use('/api/users', usersRouter);

// Ruta principal
app.get('/', (req, res) => {
    res.send('Bienvenido a la ruta pricinpal de Devsu  correo candidato: cebm.programmer@gmail.com !');
});

// Ruta de healthcheck
app.get('/healthcheck', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

const server = app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});

export { app, server };
