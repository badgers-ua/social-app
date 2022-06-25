import { API_LOAD_STATUS } from './../../types';
import { useState } from 'react';
import { Api } from '../../types';

const useApi = <T>(): Api<T> => {
  const [data, setData] = useState<T>();
  const [error] = useState<string>('');
  const [status, setStatus] = useState<API_LOAD_STATUS>(API_LOAD_STATUS.INIT);

  const request = async (requestHandler: Function) => {
    setStatus(API_LOAD_STATUS.LOADING);

    const { data: responseData } = await requestHandler();

    setData(responseData);
    setStatus(API_LOAD_STATUS.LOADED);
  };

  return {
    status,
    data,
    error,
    request,
  };
};

export default useApi;
