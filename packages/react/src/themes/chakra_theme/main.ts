import { extendTheme } from "@chakra-ui/react"

export const ChakraTheme = extendTheme({
    fonts: {
        heading: "PlusJakartaSans",
        body: "PlusJakartaSans",
    },
    colors: {
        brand: {
            primary: '#005E5E',
        }
    },
    components: {
        Button: {
            baseStyle: {
                fontFamily: 'PlusJakartaSans-Medium',
                fontWeight: 'bold', // Normally, it is "semibold"
                paddingTop: '1.25rem',
                paddingBottom: '1.25rem',
                
            },
            variants: {
                primary: {
                    textColor: 'white', // Or any desired color
                    backgroundColor: '#005E5E'
                },
                secondary: {
                    textColor: 'gray.700', // Or any desired color
                },
            },
            size: "lg"
        },
    },
})