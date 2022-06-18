import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Fragment } from 'react';
import { Post } from '../types';
import { default as PostComponent } from '../components/Post';

type PostListProps = {
  posts: Post[];
};

const PostList = ({ posts }: PostListProps) => {
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
        },
      )}
    </List>
  );
};

export default PostList;
