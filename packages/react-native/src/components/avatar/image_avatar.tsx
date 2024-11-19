import { AvatarImage } from "./styled";
import { ComponentProps } from "react";
import React from 'react';


export interface ImageAvatarProps extends ComponentProps<typeof AvatarImage> {
    size?: number;
}
export const ImageAvatar: React.FC<ImageAvatarProps> = ({
    ...rest
}) => {
    return (
        <AvatarImage
            borderRadius={500}
            {...rest}
        />
    )
}