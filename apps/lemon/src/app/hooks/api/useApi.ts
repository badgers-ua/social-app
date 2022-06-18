import { useState } from 'react';
import { Api } from '../../types';

const useApi = <T>(): Api<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error] = useState<string>('');

  const request = async (requestHandler: Function) => {
    setIsLoading(true);

    const { data: responseData } = await requestHandler();

    setData(responseData);
    setIsLoading(false);
  };

  return {
    isLoading,
    data,
    error,
    request,
  };
};

export default useApi;
