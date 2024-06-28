import { UncoverStyleProps } from "@components/interface";
import { useUncover } from "@providers/hooks"
import { useMemo } from "react"

export const useExtendedStyle = (props: UncoverStyleProps = {}) => {
    const { extendedStyle } = useUncover();
    const styled: UncoverStyleProps = extendedStyle ?? {};

    Object.keys(props).map((key) => {
        const prop = key as keyof UncoverStyleProps;
        if (props[prop] && styled[prop]) {
            styled[prop] = { ...styled[prop] as any, ...props[prop] as any };
        } else {
            styled[prop] = props[prop] as any;
        }
    })


    return useMemo(() => ({
        // styled,
        ...styled
    }), [styled])
}