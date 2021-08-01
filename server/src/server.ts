import express from 'express';
import axios from 'axios';
import { WebClient } from '@slack/web-api';

import { loadConfigFile } from './config';
import { copyFileSync, writeFile } from 'fs';
import path from 'path';

const port = 3333;
const app = express();

const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

interface Config {
  client_id: string;
  client_secret: string;
}

interface AuthTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: string;
  scope: string;
}


export const getAuthToken = async (code: string, config: Config): Promise<AuthTokenResponse> => {
  const res = await axios.post('https://github.com/login/oauth/access_token', {
    code,
    ...config,
  }, {
    headers: {
      'Accept': 'application/json',
    }
  });
return res.data;
}

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

app.get('/config', (_, res) => {
  const config = loadConfigFile();
  res.send(config);
});

app.put('/config', (req, res) => {
  const { config } = req.body;
  const configFilePath = path.resolve('default-config.json');
  const configBakFilePath = path.resolve('default-config.json.bak');
  copyFileSync(configFilePath, configBakFilePath);
  writeFile('default-config.json', JSON.stringify(config), err => {
    if (err) {
      res.status(500);
      res.send({ error: err.message });
      return;
    }
    res.status(201);
    res.send();
  })
});

app.post('/auth-token', async (req, res) => {
  const { code } = req.body;
  const response = await getAuthToken(code, {
    client_id: 'Iv1.6809fb9d81d62333',
    client_secret: githubClientSecret || '',
  });
  res.send(response);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});