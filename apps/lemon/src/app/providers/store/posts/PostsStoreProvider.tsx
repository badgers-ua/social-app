import createContext from 'zustand/context';
import { Children } from '../../../types';
import { StoreApi } from 'zustand';
import createPostsStore, { PostsState } from './createPostsStore';

const Context = createContext<StoreApi<PostsState>>();

const createStore = () => createPostsStore();

const PostsStoreProvider = ({ children }: Children) => {
  return (
    <Context.Provider createStore={createStore}>{children}</Context.Provider>
  );
};

export const usePostsStore = Context.useStore;
export default PostsStoreProvider;
