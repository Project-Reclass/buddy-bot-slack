import axios from 'axios';

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

interface User {
  login: string;
  avatar_url: string;
  organizations_url: string;
}

export const getAuthToken = async (code: string): Promise<AuthTokenResponse> => {
  const res = await axios.post('/auth-token', {
    code,
  }, {
    headers: {
      'Accept': 'application/json',
    }
  });

  return res.data;
}

export const getUserData = async (token: string): Promise<User> => {
  const res = await axios.get('https://api.github.com/user', {
    headers: {
      'Authorization': `token ${token}`
    }
  });
  return res.data;
}