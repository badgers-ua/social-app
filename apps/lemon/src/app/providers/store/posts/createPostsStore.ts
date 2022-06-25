import { API_LOAD_STATUS } from '../../../types';
import create, { SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import { environment } from '../../../../environments/environment';
import { Post } from '@sapp/types';

export type PostsState = {
  posts: Post[];
  loadStatus: API_LOAD_STATUS;
  setPosts: (posts: Post[]) => void;
  setLoadStatus: (loadStatus: API_LOAD_STATUS) => void;
};

const state = (set: SetState<PostsState>): PostsState => {
  return {
    posts: [],
    loadStatus: API_LOAD_STATUS.INIT,
    setPosts: (posts: Post[]) => set({ posts }),
    setLoadStatus: (loadStatus: API_LOAD_STATUS) => set({ loadStatus }),
  };
};

const devToolsState: any = devtools(state);

const createPostsStore = () =>
  create<PostsState>(!environment.production ? devToolsState : state);

export default createPostsStore;
