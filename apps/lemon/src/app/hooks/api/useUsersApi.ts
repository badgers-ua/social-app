import { LazyApi } from '../../types';
import { useAxios } from '../../providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import useApi from './useApi';
import { User } from '@sapp/types';

const useUsersApi = (): LazyApi<User[]> => {
  const { request, isLoading, data, error } = useApi<User[]>();
  const axios: AxiosInstance = useAxios();

  const load = async (searchTerm: string) => {
    const requestHandler = async () =>
      await axios.get<User[]>('users/', {
        params: {
          term: searchTerm,
        },
      });

    await request(requestHandler);
  };

  return {
    isLoading,
    data,
    error,
    load,
  };
};

export default useUsersApi;
