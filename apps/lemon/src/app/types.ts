export type Children = {
  children?: JSX.Element | boolean | null;
};

export type isLoading = {
  isLoading: boolean;
};

export type Api<T> = {
  isLoading: boolean;
  data?: T;
  error: string;
  request: (requestHandler: Function) => void;
};

export type LazyApi<T> = Omit<Api<T>, 'request'> & {
  load: (options?: any) => void;
};
