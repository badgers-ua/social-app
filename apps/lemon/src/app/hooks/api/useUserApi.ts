import { LazyApi, UserRecord } from '../../types';
import { useAxios } from '../../providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import useApi from './useApi';

const useUserApi = (): LazyApi<UserRecord> => {
  const { request, isLoading, data, error } = useApi<UserRecord>();
  const axios: AxiosInstance = useAxios();

  const load = async (id: string) => {
    const requestHandler = async () =>
      await axios.get<UserRecord>('user/', {
        params: {
          id,
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

export default useUserApi;
