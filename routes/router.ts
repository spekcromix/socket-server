import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo esta bien'
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  const { cuerpo, de } = req.body;

  const server = Server.instance;

  const payload = { de, cuerpo };

  server.io.emit('mensaje-nuevo', payload);

  res.json({
    ok: true,
    mensaje: 'POST',
    cuerpo,
    de
  });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const { cuerpo, de } = req.body;
  const { id } = req.params;

  const server = Server.instance;

  const payload = { de, cuerpo };

  server.io.in(id).emit('mensaje-privado', payload);

  res.json({
    ok: true,
    mensaje: 'POST',
    cuerpo,
    de,
    id
  });
});

router.get('/usuarios', ( req: Request, res: Response) => {

  const server = Server.instance;

  server.io.clients( (err: any, clientes: string[]) => {
    if ( err ) {
      return res.json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      clientes
    })
  }
});

router.get('/usuarios/detalle', (req: Request, res: Response) => {

  res.json({
    ok: true,
    clientes: usuariosConectados.getLista()
  });
});

export default router;
