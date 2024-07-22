import sequelize from './shared/database/database.js';
import { usersRouter } from "./users/router.js";
import express from 'express';

const app = express();
const PORT = 8000;
let server;

const startServer = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('db is ready');

    app.use(express.json());
    app.use('/api/users', usersRouter);

    // Ruta principal
    app.get('/', (req, res) => {
      res.send('Bienvenido a la ruta principal de Devsu  candidato: Carlos Bejarano  correo:cebm.programmer@gmail.com !');
    });

    app.get('/healthcheck', (req, res) => {
      res.status(200).json({ status: 'OK' });
    });

    server = app.listen(PORT, () => {
      console.log('Server running on port', PORT);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();


export { app, server };
