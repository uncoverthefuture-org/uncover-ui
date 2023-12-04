import { Button, ButtonProps } from "@chakra-ui/react";
import React from 'react';


export interface PrimaryButtonProps extends ButtonProps {
    value?: string;
}
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    value ,
    children,
    ...rest
}) => {
    return (
      <Button
        isLoading={rest.isLoading}
        loadingText="Submitting"
        className="primary-btn py-3 h-auto fw-normal"
        {...rest}
      >
        {value}
        {children}
      </Button>
    );
}

