import { LazyApi } from '../../types';
import { useAxios } from '../../providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import useApi from './useApi';
import { Post } from '@sapp/types';

const useMyPosts = (): LazyApi<Post[]> => {
  const { request, isLoading, data, error } = useApi<Post[]>();
  const axios: AxiosInstance = useAxios();

  const load = async () => {
    const requestHandler = async () => await axios.get<string[]>('posts/my');

    await request(requestHandler);
  };

  return {
    isLoading,
    data,
    error,
    load,
  };
};

export default useMyPosts;
