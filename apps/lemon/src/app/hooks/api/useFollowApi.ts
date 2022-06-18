import { LazyApi } from '../../types';
import { useAxios } from '../../providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import useApi from './useApi';

const useFollowApi = (): LazyApi<string[]> => {
  const { request, isLoading, data, error } = useApi<string[]>();
  const axios: AxiosInstance = useAxios();

  const load = async (id: string) => {
    const requestHandler = async () =>
      await axios.patch<string[]>('user/follow/', null, { params: { id } });

    await request(requestHandler);
  };

  return {
    isLoading,
    data,
    error,
    load,
  };
};

export default useFollowApi;
