import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Children } from '../types';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import AvatarLocal from './AvatarLocal';

type ProfileBlockProps = {
  avatar: string;
  displayName: string;
  email: string;
} & Children;

// const bg =
//   'linear-gradient(90deg, rgba(44,51,93,1) 20%, rgba(107,115,145,1) 100%)';

const avatarSize = 150;

const ProfileBlock = ({
  avatar,
  displayName,
  email,
  children,
}: ProfileBlockProps) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card sx={{ marginTop: 3, paddingTop: 5, paddingBottom: 5 }}>
      <Grid container>
        <Grid item xs={12} md={3} mb={2} display="flex" justifyContent="center">
          <AvatarLocal src={avatar} size={avatarSize} />
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
          display="flex"
          justifyContent={isMdDown ? 'center' : 'flex-start'}
          alignItems={isMdDown ? 'center' : 'flex-start'}
          textAlign={isMdDown ? 'center' : 'start'}
        >
          <Box>
            <Typography variant="h4" component="h1">
              {displayName}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h6" component="p">
                Email:
              </Typography>
              <Typography variant="body1" component="h6" ml={1}>
                {email}
              </Typography>
            </Box>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileBlock;
