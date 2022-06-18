import { LazyApi } from '../../types';
import { useAxios } from '../../providers/AxiosProvider';
import { AxiosInstance } from 'axios';
import useApi from './useApi';

const useCreatePost = (): LazyApi<string[]> => {
  const { request, isLoading, data, error } = useApi<string[]>();
  const axios: AxiosInstance = useAxios();

  const load = async (text: string) => {
    const requestHandler = async () =>
      await axios.post<string[]>('post', { text });

    await request(requestHandler);
  };

  return {
    isLoading,
    data,
    error,
    load,
  };
};

export default useCreatePost;
