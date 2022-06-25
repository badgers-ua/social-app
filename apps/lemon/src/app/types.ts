export type Children = {
  children?: JSX.Element | boolean | null;
};

export type isLoading = {
  isLoading: boolean;
};

export type Api<T> = {
  status: API_LOAD_STATUS;
  data?: T;
  error: string;
  request: (requestHandler: Function) => void;
};

export type LazyApi<T> = Omit<Api<T>, 'request'> & {
  load: (options?: any) => void;
};

export enum API_LOAD_STATUS {
  INIT,
  LOADING,
  LOADED,
  ERROR,
}
