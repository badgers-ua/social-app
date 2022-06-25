import React, { useState } from 'react';
import { useUser } from 'reactfire';
import AvatarLocal from '../components/AvatarLocal';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import TextFieldLocal from '../components/TextFieldLocal';
import useCreatePost from '../hooks/api/useCreatePost';
import useSetLoadingStatus from '../hooks/useSetLoadingStatus';
import { Post } from '@sapp/types';
import { v4 as uuid } from 'uuid';
import { API_LOAD_STATUS } from '../types';
import { usePostsStore } from '../providers/store/posts/PostsStoreProvider';

const CreatePost = () => {
  const { posts, setPosts, loadStatus } = usePostsStore();
  const [newPostValue, setNewPostValue] = useState<string>('');

  const { data: user } = useUser();
  const { t } = useTranslation();

  const { load, status } = useCreatePost();

  const isLoading = status === API_LOAD_STATUS.LOADING;

  useSetLoadingStatus({ isLoading });

  const handlePostCreation = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handleSubmitNewPost = async (e: any) => {
    e.preventDefault();
    const val = newPostValue;
    setNewPostValue('');
    await load(val);
    handlePostCreation({
      text: val,
      _id: uuid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0,
      createdBy: user as any,
    });
  };

  return (
    <Grid item xs={12} sx={{ marginTop: 2 }}>
      <Box display="flex">
        <AvatarLocal src={user?.photoURL ?? ''} size={52} />
        <Box display="flex" flexDirection="column" flex={1} ml={2}>
          <form autoComplete="off" onSubmit={handleSubmitNewPost}>
            <TextFieldLocal
              value={newPostValue}
              onChange={(i) => {
                setNewPostValue(i.target.value);
              }}
              fullWidth
              multiline
              label={t('whatIsHappening')}
              variant="outlined"
              inputProps={{
                maxLength: 240,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      disabled={
                        !newPostValue.length ||
                        loadStatus === API_LOAD_STATUS.LOADING
                      }
                      edge="end"
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Box>
      </Box>
    </Grid>
  );
};

export default CreatePost;
