import { formatName } from "@utilities/formatting";
import { ComponentProps } from "react"
import { AvatarText } from "./styled";


export interface TextAvatarProps extends ComponentProps<typeof AvatarText> {
    text?: string
}

export const TextAvatar: React.FC<TextAvatarProps> = ({
    ...rest
}) => {
    const nameInitial = (name: string | undefined) => {
        // const nameArr = name?.replace("  ", ' ').trim().split(' ');
        const nameArr = formatName(name ?? '').normal.split(' ');
        if (nameArr) {
            return nameArr.length > 1
                ? `${nameArr[0][0]}${nameArr[1][0]}`
                : `${nameArr[0][0]}`;
        } else {
            return ``;
        }
    };

    return (
        <AvatarText
            {...rest}
        >
            {nameInitial(rest?.text)}
        </AvatarText>
    )
}