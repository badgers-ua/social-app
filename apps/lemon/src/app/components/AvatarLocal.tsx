import Avatar, { AvatarProps } from '@mui/material/Avatar';
import React from 'react';
import { getAvatarUrl } from '../utils/factory.utils';

type AvatarLocalProps = {
  size?: number;
  src: string;
} & AvatarProps;

const AvatarLocal = ({ size = 96, src = '' }: AvatarLocalProps) => {
  return (
    <Avatar sx={{ height: size, width: size }} src={getAvatarUrl(src, size)} />
  );
};

export default AvatarLocal;
