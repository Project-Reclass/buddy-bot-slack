import express from 'express';
import { WebClient } from '@slack/web-api';

const port = 3333;
const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.send({
    status: 'ok',
  });
});

app.post('/test-auth', async (req, res) => {
  const web = new WebClient(req.body.token);
  try {
    const test = await web.auth.test();
    res.send(test);
  } catch (error) {
    res.send({
      ok: false,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});