import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useUserApi from '../hooks/api/useUserApi';
import CenteredNoDataMessage from '../components/CenteredNoDataMessage';
import { Box } from '@mui/material';
import ProfileBlock from '../components/ProfileBlock';
import { useUser } from 'reactfire';
import useWhoAmIFollowingApi from '../hooks/api/useWhoAmIFollowingApi';
import Button from '@mui/material/Button';
import useFollowApi from '../hooks/api/useFollowApi';
import useUnFollowApi from '../hooks/api/useUnFollowApi';
import useSetLoadingStatus from '../hooks/useSetLoadingStatus';
import { useTranslation } from 'react-i18next';

const checkIsFollowing = (followers: string[], userId: string) =>
  followers.includes(userId);

const ProfilePage = () => {
  const { id } = useParams<string>();
  const { t } = useTranslation();

  const {
    load: loadUserProfile,
    data: userProfile,
    isLoading: isLoadingUserProfile,
  } = useUserApi();

  const {
    load: loadWhoAmIFollowing,
    data: followingUsers = [],
    isLoading: isLoadingFollowing,
  } = useWhoAmIFollowingApi();

  const { load: loadFollow, isLoading: isLoadingFollow } = useFollowApi();

  const { load: loadUnFollow, isLoading: isLoadingUnFollow } = useUnFollowApi();

  const navigate = useNavigate();
  const { data: user } = useUser();

  const isFollowing: boolean = checkIsFollowing(
    followingUsers.map(({ uid }) => uid),
    id ?? ''
  );
  const isMe: boolean = user?.uid === id;
  const isLoading: boolean =
    isLoadingFollow ||
    isLoadingUnFollow ||
    isLoadingUserProfile ||
    isLoadingFollowing;

  useSetLoadingStatus({
    isLoading,
  });

  useEffect(() => {
    if (!id) {
      return;
    }
    loadUserProfile(id);
    loadWhoAmIFollowing();
  }, [id]);

  if (!id) {
    navigate('/home');
    return <></>;
  }

  if (isLoadingUserProfile) {
    return <></>;
  }

  if (!userProfile) {
    return <CenteredNoDataMessage />;
  }

  const { displayName = '', photoURL = '', email = '' } = userProfile;

  const toggleFollow = async () => {
    isFollowing ? await loadUnFollow(id) : await loadFollow(id);
    loadWhoAmIFollowing();
  };

  return (
    <Box>
      <ProfileBlock avatar={photoURL} displayName={displayName} email={email}>
        {!isMe && (
          <Button
            disabled={isLoading}
            sx={{ marginTop: 2, maxWidth: '200px' }}
            variant="outlined"
            onClick={toggleFollow}
          >
            {isFollowing ? t('unfollow') : t('follow')}
          </Button>
        )}
      </ProfileBlock>
    </Box>
  );
};

export default ProfilePage;
