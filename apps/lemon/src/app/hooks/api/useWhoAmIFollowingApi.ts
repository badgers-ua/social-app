import { LazyApi } from '../../types';
import { useAxios } from '../../providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import useApi from './useApi';

const useWhoAmIFollowingApi = (): LazyApi<string[]> => {
  const { request, isLoading, data, error } = useApi<string[]>();

  const axios: AxiosInstance = useAxios();

  const load = async () => {
    const requestFn = async () => await axios.get<string[]>('user/following');
    await request(requestFn);
  };

  return {
    isLoading,
    data,
    error,
    load,
  };
};

export default useWhoAmIFollowingApi;
