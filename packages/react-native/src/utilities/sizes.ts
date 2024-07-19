import { viewSize, ViewSizeKeys } from "@components/view/sizes";

export const getViewSize = (size?: ViewSizeKeys | number | string, defaultSize: ViewSizeKeys | number | string = "auto"): (number | string) => {
    if (size) {
        return (typeof size === "string" && (size in (Object.keys(viewSize)))) ? viewSize[size as ViewSizeKeys] : size;
    }

    return (defaultSize && defaultSize !== "auto") ? viewSize[defaultSize as ViewSizeKeys] : defaultSize;
}