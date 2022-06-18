import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CreatePost from '../containers/CreatePost';
import PostList from '../containers/PostList';
import useSetLoadingStatus from '../hooks/useSetLoadingStatus';
import usePosts from '../hooks/api/usePosts';
import { Post } from '@sapp/types';

const HomePage = () => {
  const { load, data = [], isLoading } = usePosts();
  const [posts, setPosts] = useState<Post[]>([]);

  useSetLoadingStatus({ isLoading: isLoading });

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setPosts(data);
  }, [data.length]);

  if (isLoading) {
    return <></>;
  }

  if (!posts.length) {
    return <></>;
  }

  const handlePostCreation = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        People Suggestions
      </Grid>
      <Grid item xs={12} md={6}>
        <CreatePost onPostCreated={handlePostCreation} />
        <PostList posts={posts} />
      </Grid>
    </Grid>
  );
};

export default HomePage;
