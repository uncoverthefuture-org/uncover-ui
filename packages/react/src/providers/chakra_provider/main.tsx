import { ChakraProvider, ChakraProviderProps } from "@chakra-ui/react";
import React from "react";
import { ChakraTheme } from "../../themes";

export interface ChakraProviderLoaderProps extends ChakraProviderProps {

}
export const ChakraProviderLoader: React.FC<ChakraProviderLoaderProps> = ({ 
  children,
  ...rest 
}) => {
  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          position: "bottom",
          isClosable: true,
          containerStyle: {
            width: "100%",
            maxWidth: "100%",
            bottom: "0",
            marginBottom: "0",
            textAlign: "center",
            borderRadius: "0",
          },
        },
      }}
      theme={ChakraTheme}
      {...rest}
    >
      {children}
    </ChakraProvider>
  );
};
