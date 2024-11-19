import { formatName } from "@utilities/formatting";
import React, { ComponentProps } from "react"
import { AvatarText } from "./styled";
import { AvatarTextProps } from "./types";


export interface TextAvatarProps extends AvatarTextProps {
    text?: string
}

export const TextAvatar: React.FC<TextAvatarProps> = ({
    ...rest
}) => {
    const nameInitial = (name: string | undefined) => {
        // const nameArr = name?.replace("  ", ' ').trim().split(' ');
        const nameArr = formatName(name ?? '').normal.trim().split(' ');
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