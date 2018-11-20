import { Router, Request, Response } from 'express';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'Todo esta bien'
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
  const { cuerpo, de } = req.body;
  res.json({
    ok: true,
    mensaje: 'POST',
    cuerpo,
    de
  });
});

router.post('/mensajes/:_id', (req: Request, res: Response) => {
  const { cuerpo, de } = req.body;
  const { _id } = req.params;
  res.json({
    ok: true,
    mensaje: 'POST',
    cuerpo,
    de,
    _id
  });
});

export default router;
