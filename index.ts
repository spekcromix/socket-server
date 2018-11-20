import Server from './classes/server';
import router from './routes/router';
import bodyParser = require('body-parser');
import cors from 'cors';

const server = new Server();
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

server.app.use(cors({ origin: true, credentials: true }));

server.app.use('/api', router);

server.start(() => {
  console.log(`El servidor esta corriendo en el puerto: ${server.port}`);
});
