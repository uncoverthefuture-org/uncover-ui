declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module 'react-native-fade-loading';
declare namespace NodeJS {
    interface Global {
        expo: string; // Declare your global variable here
    }
}

// Extend the globalThis object
declare var expo: string;