import { ChakraProvider } from "@chakra-ui/react";
import { chakraCustomTheme } from "../themes";
import React from "react";

export const ChakraProviderLoader: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
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
      theme={chakraCustomTheme}
    >
      {children}
    </ChakraProvider>
  );
};
