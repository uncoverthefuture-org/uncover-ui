import React, { ComponentProps, useState } from 'react';
import { useTheme } from '@emotion/react';
import { ImageAvatar, ImageAvatarProps } from './image_avatar';
import { AvatarContainer } from './styled';
import { TextAvatar, TextAvatarProps } from './text_avatar';
import { AvatarContainerProps } from './types';

export interface AvatarProps  extends AvatarContainerProps{
  size?: number;
  uri?: string;
  source?: ImageAvatarProps['source'];
  text?: TextAvatarProps['text'];
  color?: TextAvatarProps['color'],
  fontSize?: number;
  imageProps?: ImageAvatarProps;
  textProps?: TextAvatarProps;
}

export const Avatar: React.FC<AvatarProps> = ({
  text,
  uri,
  source,
  size = 70,
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
      {...rest}
    >
      {(!imageLoaded) ? (
        <TextAvatar
          text={text}
          fontSize={rest?.fontSize}
          color={rest?.color}
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