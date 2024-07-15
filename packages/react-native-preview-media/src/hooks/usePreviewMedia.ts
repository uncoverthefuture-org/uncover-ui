import { useModal } from "@uncover-ui/rn-modal-provider";
import { PreviewMedia, PreviewMediaProps } from "../main";
import { useMemo } from "react";

const usePreviewMedia = (onRequestClose: () => void) => {
    const { showModal } = useModal();

    const previewMedia = (props?: PreviewMediaProps) => {
        return showModal(PreviewMedia, props)
    }

    return useMemo(() => {
        previewMedia
    }, [
        previewMedia,
    ]);
};

export default usePreviewMedia
