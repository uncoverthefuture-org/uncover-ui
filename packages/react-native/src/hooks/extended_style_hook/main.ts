import { UncoverStyleProps } from "@components/interface";
import { useThemeMode } from "@providers/hooks";
import { useMemo } from "react"

export const useExtendedStyle = (props: UncoverStyleProps = {}) => {
    const { styledProps } = useThemeMode();
    const styled: UncoverStyleProps = styledProps ?? {};

    Object.keys(props).map((key) => {
        const prop = key as keyof UncoverStyleProps;
        if (props[prop] && styled[prop]) {
            styled[prop] = { ...styled[prop] as any, ...props[prop] as any };
        } else {
            styled[prop] = props[prop] as any;
        }
    })

    return useMemo(() => ({
        ...styled
    }), [
        props, 
        styled, 
        styledProps
    ]);
}