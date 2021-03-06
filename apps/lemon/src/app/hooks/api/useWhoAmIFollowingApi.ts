import { LazyApi } from '../../types';
import { useAxios } from '../../providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import useApi from './useApi';
import { User } from '@sapp/types';

const useWhoAmIFollowingApi = (): LazyApi<User[]> => {
  const { request, status, data, error } = useApi<User[]>();

  const axios: AxiosInstance = useAxios();

  const load = async () => {
    const requestFn = async () => await axios.get<User[]>('user/following');
    await request(requestFn);
  };

  return {
    status,
    data,
    error,
    load,
  };
};

export default useWhoAmIFollowingApi;
