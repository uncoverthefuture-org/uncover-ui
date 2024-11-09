import { PrimaryInputProp, PrimaryInput } from "../../components/inputs";
import React,{ useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export const PasswordInput = ({
    ...rest
}: PrimaryInputProp) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <PrimaryInput
            type={showPassword ? "text" : "password"}
            rightComponentProps={{ className: "touchable text-muted h-auto py-3 pe-3"}}
            rightComponent={
                <div onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <HiEyeSlash size={24}/> : <HiEye size={24}/>}
                </div>
            }
            {...rest}
        />
    )
}