import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CreatePost from '../containers/CreatePost';
import PostList from '../containers/PostList';
import useSetLoadingStatus from '../hooks/useSetLoadingStatus';
import { User } from '@sapp/types';
import useGetWhomToFollowSuggestions from '../hooks/api/useGetWhotToFollowSuggestions';
import { API_LOAD_STATUS } from '../types';
import PostsStoreProvider from '../providers/store/posts/PostsStoreProvider';

const HomePage = () => {
  const {
    load: loadWhomToFollow,
    data: whomToFollow = [],
    status: whomToFollowLoadStatus,
  } = useGetWhomToFollowSuggestions();

  useSetLoadingStatus({
    isLoading: whomToFollowLoadStatus === API_LOAD_STATUS.LOADING,
  });

  useEffect(function loadData() {
    loadWhomToFollow();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        {whomToFollow.map((user: User) => {
          return <span key={user.uid}>{user.displayName}</span>;
        })}
      </Grid>
      <Grid item xs={12} md={6}>
        <PostsStoreProvider>
          <>
            <CreatePost />
            <PostList />
          </>
        </PostsStoreProvider>
      </Grid>
    </Grid>
  );
};

export default HomePage;
