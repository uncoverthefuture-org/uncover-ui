import { FloatingButtonProps } from "./button/floatingButton";
import { PrimaryButtonProps } from "./button/main";
import { TouchableTextProps } from "./button/touchableText";
import { NavHeaderProps } from "./header/main";
import { PrimaryDateTimeInputProps } from "./input/date_input";
import { PrimaryInputProps } from "./input/main";
import { PrimaryPhoneInputProps } from "./input/phone_input";
import { InputPlaceholderProps } from "./input/placeholder";
import { PrimaryFlashMessageProps } from "./notify/flash";
import { PrimarySelectProps } from "./select/main";
import { BaseViewProps } from "./view/base_views";
import { LoadingViewProps } from "./view/loader_view/main";
import { LoadingModalProps } from "./modal/loading_modal";

export interface UncoverStyleProps {
    primaryButton?: PrimaryButtonProps;
    primaryInput?: PrimaryInputProps;
    primaryPhoneInput?: PrimaryPhoneInputProps;
    touchableText?: TouchableTextProps;
    floatingButton?: FloatingButtonProps;
    navHeader?: NavHeaderProps;
    primaryDateTimeInput?: PrimaryDateTimeInputProps;
    inputPlaceholder?: InputPlaceholderProps;
    primarySelect?: PrimarySelectProps;
    primaryFlashMessage?: PrimaryFlashMessageProps;
    loadingView?: LoadingViewProps;
    loadingModal?: LoadingModalProps;
    baseView?: BaseViewProps;

}