import { LazyApi } from '../../types';
import { useAxios } from '../../providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import useApi from './useApi';

const useUnFollowApi = (): LazyApi<void> => {
  const { request, status, data, error } = useApi<void>();
  const axios: AxiosInstance = useAxios();

  const load = async (id: string) => {
    const requestHandler = async () =>
      await axios.patch<void>('user/unfollow/', null, { params: { id } });

    await request(requestHandler);
  };

  return {
    status,
    data,
    error,
    load,
  };
};

export default useUnFollowApi;
