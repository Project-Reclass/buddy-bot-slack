import React, { useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useLocation, useHistory } from 'react-router-dom';

import { useLocalStorage } from '../common/utils';
import { getAuthToken } from '../common/api/login';

import { useAuthContext } from './AuthProvider';

const clientId = 'Iv1.6809fb9d81d62333';

interface Props {
  isCallback?: boolean;
}

const buildGithubOauthUrl = (clientId: string) => {
  const redirectUrl = `${window.location.origin}/login/oauth/callback`
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}`
}

const redirectToGithubOauth = () => {
  window.open(buildGithubOauthUrl(clientId));
}

const Login = ({ isCallback }: Props) => {
  const location = useLocation();
  const { setValues, ...values } = useAuthContext();
  const history = useHistory();
  const [token, setToken] = useLocalStorage('oauth-key')

  useEffect(() => {
    if (isCallback) {
      const params = new URLSearchParams(location.search);
      const authCode = params.get('code');
      console.log({ authCode });
      if (authCode && !token) {
        (async() => {
          const result = await getAuthToken(authCode);
          if (result.access_token) {
            setToken(result.access_token);
          }
        })();
      }
    }
  }, [isCallback, location.search, setToken, token]);

  useEffect(() => {
    if (token) {
      setValues(prevValues => ({...prevValues, isLoggedIn: true, accessToken: token }));
      history.push('/')
    }
  }, [history, setValues, token]);

  return (
    <Box>
      <Button onClick={redirectToGithubOauth}>Login with GitHub</Button>
    </Box>
  );
}

export default Login;