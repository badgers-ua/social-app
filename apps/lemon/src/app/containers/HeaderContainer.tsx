import React, { useEffect, useState } from 'react';
import { useSigninCheck, useUser } from 'reactfire';
import Header from '../components/Header';
import useSignOut from '../hooks/useSignOut';
import Autocomplete from '@mui/material/Autocomplete';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import useUsersApi from '../hooks/api/useUsersApi';
import useDebounce from '../hooks/useDebounce';
import { UserRecord } from '../types';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import useSetLoadingStatus from '../hooks/useSetLoadingStatus';
import Hidden from '@mui/material/Hidden';

const HeaderContainer = () => {
  const handleLogout = useSignOut();
  const navigate = useNavigate();
  const { data: signInCheck } = useSigninCheck();
  const { data: user } = useUser();

  const handleProfileNavigate = () => {
    navigate(`/profile/${user?.uid ?? ''}`);
  };

  return (
    <>
      {signInCheck?.signedIn && (
        <Header
          onLogoutClick={handleLogout}
          onProfileClick={handleProfileNavigate}
          user={user!}
        >
          <Hidden smDown>
            <SearchBar />
          </Hidden>
        </Header>
      )}
    </>
  );
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const debounceSearchTerm = useDebounce<string | undefined>(searchTerm, 300);
  const { data = [], isLoading, load } = useUsersApi();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useSetLoadingStatus({ isLoading });

  useEffect(() => {
    if (debounceSearchTerm === undefined) {
      return;
    }
    load(debounceSearchTerm);
  }, [debounceSearchTerm]);

  const navigateToProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Autocomplete
      onChange={(e, value) => {
        if (!value) {
          return;
        }
        const { uid } = value;
        navigateToProfile(uid);
      }}
      forcePopupIcon={false}
      sx={{ width: 250, paddingLeft: 2 }}
      size="small"
      getOptionLabel={(option: UserRecord) => option.displayName ?? ''}
      options={debounceSearchTerm ? data : []}
      loading={isLoading}
      renderOption={(props, { displayName, uid, photoURL }) => (
        <Box
          {...props}
          key={uid}
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0, borderRadius: '50%' } }}
        >
          <img loading="lazy" width="20" src={photoURL} alt="Uer avatar" />
          {displayName}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('searchPeople')}
          onChange={({ target: { value } }) => {
            setSearchTerm(value);
          }}
          InputProps={{
            ...params.InputProps,
            autoComplete: 'new-password',
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default HeaderContainer;
