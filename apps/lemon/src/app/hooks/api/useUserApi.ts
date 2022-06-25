import { LazyApi } from '../../types';
import { useAxios } from '../../providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import useApi from './useApi';
import { User } from '@sapp/types';

const useUserApi = (): LazyApi<User> => {
  const { request, status, data, error } = useApi<User>();
  const axios: AxiosInstance = useAxios();

  const load = async (id: string) => {
    const requestHandler = async () =>
      await axios.get<User>('user/', {
        params: {
          id,
        },
      });

    await request(requestHandler);
  };

  return {
    status,
    data,
    error,
    load,
  };
};

export default useUserApi;
