import { AvatarImage } from "./styled";
import { FastImageProps } from "react-native-fast-image";
import { AvatarImageStyleProps } from "./interface";
import { ComponentProps } from "react";


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