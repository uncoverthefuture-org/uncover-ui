import { useModal } from "@uncover-ui/rn-modal-provider";
import { PreviewMedia, PreviewMediaProps } from "../main";
import { useMemo } from "react";

export const usePreviewMedia = () => {
    const { showModal } = useModal();

    let previewMedia = (props?: PreviewMediaProps) => {
        return showModal(PreviewMedia, props)
    }

    return useMemo(() => ({
        previewMedia
    }), [
        previewMedia,
    ]);
};
