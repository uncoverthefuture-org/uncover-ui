import React, { ComponentProps, useState } from 'react';
import { useTheme } from '@emotion/react';
import { ImageAvatar, ImageAvatarProps } from './image_avatar';
import { AvatarContainer } from './styled';
import { TextAvatar, TextAvatarProps } from './text_avatar';

export interface AvatarProps {
  size?: number;
  uri?: string;
  source?: ImageAvatarProps['source'];
  text?: TextAvatarProps['text'];
  fontSize?: number;
  containerProps?: ComponentProps<typeof AvatarContainer>,
  imageProps?: ImageAvatarProps;
  textProps?: TextAvatarProps;
}

export const Avatar: React.FC<AvatarProps> = ({
  text,
  uri,
  source,
  size = 70,
  containerProps,
  imageProps,
  textProps,
  ...rest
}) => {
  const { colors } = useTheme();
  const [imageLoaded, setImageLoaded] = useState<{ width: number; height: number; }>()
  const imageSource = source ?? (uri ? { uri } : undefined);


  return (
    <AvatarContainer
      size={size}
      {...containerProps}
    >
      {(!imageLoaded) ? (
        <TextAvatar
          text={text}
          fontSize={rest?.fontSize}
          {...textProps}
        />
      ) : (
        <ImageAvatar
          size={size}
          source={imageSource}
          onLoad={({ nativeEvent }) => setImageLoaded(nativeEvent)}
          {...imageProps}
        />
      )}
    </AvatarContainer>
  );
};