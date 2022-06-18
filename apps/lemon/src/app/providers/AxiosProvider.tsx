import React, { createContext, useContext } from 'react';
import axios, { AxiosInstance } from 'axios';
import { Children } from '../types';
import { useSigninCheck } from 'reactfire';
import { environment } from '../../environments/environment';

const Context = createContext<any>(axios.create());

export const useAxios = (): AxiosInstance => useContext(Context);

const AxiosProvider = ({ children }: Children) => {
  const { data } = useSigninCheck();

  const axiosLocal: AxiosInstance = axios.create({
    baseURL: environment.apiBaseUrl,
  });

  axiosLocal.interceptors.request.use(
    async (config) => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${await data.user?.getIdToken()}`,
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return <Context.Provider value={axiosLocal}>{children}</Context.Provider>;
};

export default AxiosProvider;
