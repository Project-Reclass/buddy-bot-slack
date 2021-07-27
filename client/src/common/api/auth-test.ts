import axios from 'axios';
import { useQuery } from 'react-query';
import { AuthTestResponse } from '../types';

const testAuthToken = async (token: string): Promise<AuthTestResponse> => {
  const res = await axios.post(`/test-auth`, { token });
  return res.data;
}

export function useTestAuthToken(token: string) {
  return useQuery(['auth-token', token], () => testAuthToken(token));
}
