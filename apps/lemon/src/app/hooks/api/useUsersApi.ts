import { LazyApi, UserRecord } from '../../types';
import { useAxios } from '../../providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import useApi from './useApi';

const useUsersApi = (): LazyApi<UserRecord[]> => {
  const { request, isLoading, data, error } = useApi<UserRecord[]>();
  const axios: AxiosInstance = useAxios();

  const load = async (searchTerm: string) => {
    const requestHandler = async () =>
      await axios.get<UserRecord[]>('users/', {
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
