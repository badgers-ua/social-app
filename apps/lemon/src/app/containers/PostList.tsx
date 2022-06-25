import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Fragment, useEffect } from 'react';
import { Post } from '@sapp/types';
import { default as PostComponent } from '../components/Post';
import usePosts from '../hooks/api/usePosts';
import { API_LOAD_STATUS } from '../types';
import { usePostsStore } from '../providers/store/posts/PostsStoreProvider';

const PostList = () => {
  const { posts, setPosts, setLoadStatus } = usePostsStore();

  const {
    load: loadPosts,
    data: loadedPosts = [],
    status: loadPostsStatus,
  } = usePosts();

  useEffect(function doLoadPosts() {
    loadPosts();
  }, []);

  useEffect(
    function onPostsLoaded() {
      setPosts(loadedPosts);
      setLoadStatus(API_LOAD_STATUS.LOADED);
    },
    [loadPostsStatus === API_LOAD_STATUS.LOADED]
  );

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {posts.map(
        ({
          text,
          createdAt,
          createdBy: { photoURL = '', displayName = '' },
          _id,
        }) => {
          return (
            <Fragment key={_id}>
              <PostComponent
                avatar={photoURL}
                content={text}
                title={displayName}
                subTitle={createdAt}
              />
              <Divider
                variant="inset"
                component="li"
                sx={{ marginBottom: 3 }}
              />
            </Fragment>
          );
        }
      )}
    </List>
  );
};

export default PostList;
