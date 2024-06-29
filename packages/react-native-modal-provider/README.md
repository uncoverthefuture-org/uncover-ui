# @uncover-ui/rn-modal-provider

## Introduction

`@uncover-ui/rn-modal-provider` is a React Native component library designed to simplify the implementation of modals in your React Native applications. This guide provides detailed instructions for integrating and using this package in your project, ensuring even beginners can follow along effortlessly.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 12.x)
- Yarn or npm
- React Native CLI or Expo CLI

## Installation

To install the `@uncover-ui/rn-modal-provider` package, you can use either Yarn or npm.

```bash
# Using Yarn
yarn add @uncover-ui/rn-modal-provider

# Using npm
npm install @uncover-ui/rn-modal-provider


# Using Yarn
yarn add react react-native react-native-gesture-handler react-native-responsive-screen

# Using npm
npm install react react-native react-native-gesture-handler react-native-responsive-screen


### Usage

Step 1: Import the Provider

Import and wrap your application's root component with the ModalProvider.

```tsx
// App.tsx
import React from 'react';
import { ModalProvider } from '@uncover-ui/rn-modal-provider';
import Main from './src/main';

const App = () => {
  return (
    <ModalProvider>
      <Main />
    </ModalProvider>
  );
};

export default App;

```

Step 2: Using the Modal

To display a modal, use the `showModal` function provided by the `ModalProviderContext`. Here's an example of how to use it:

```tsx
// src/main.tsx
import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';
import { ModalProviderContext } from '@uncover-ui/rn-modal-provider';

const SampleModal = ({ message, onClose }) => (
  <View>
    <Text>{message}</Text>
    <Button title="Close" onPress={onClose} />
  </View>
);

const Main = () => {
  const { showModal } = useContext(ModalProviderContext);

  const handleShowModal = () => {
    const { close } = showModal(SampleModal, { message: "Hello, Modal!" });

    // Close the modal after 5 seconds
    setTimeout(() => close(), 5000);
  };

  return (
    <View>
      <Button title="Show Modal" onPress={handleShowModal} />
    </View>
  );
};

export default Main;
```
