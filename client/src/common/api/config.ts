import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Config } from '../types';

const getConfig = async(): Promise<Config> => {
  const res = await axios.get('/config');
  return res.data;
}

export const updateConfig = async(config: Config): Promise<boolean> => {
  try {
    await axios.put('/config', { config });
    return true;
  } catch (error) {
    return false;
  }
}

export function useConfig() {
  return useQuery('config', getConfig);
}

export function useUpdateConfig() {
  const queryClient = useQueryClient();

  return useMutation(updateConfig, {
    onSuccess: () => {
      queryClient.invalidateQueries('config');
    }
  })
}