import React from 'react';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import AvatarLocal from './AvatarLocal';

type PostProps = {
  title: string;
  subTitle: string;
  avatar: string;
  content: string;
};

const Post = ({ title, avatar, content, subTitle }: PostProps) => {
  return (
    <ListItem alignItems="flex-start" disablePadding>
      <ListItemAvatar>
        <AvatarLocal src={avatar} size={52} />
      </ListItemAvatar>
      <ListItemText
        sx={{ marginLeft: 2 }}
        primary={
          <>
            <Typography
              sx={{ display: 'inline', fontWeight: 'bold' }}
              component="span"
              variant="body1"
              color="text.primary"
            >
              {title}
            </Typography>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.secondary"
            >
              {' - ' + subTitle}
            </Typography>
          </>
        }
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {content}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default Post;
