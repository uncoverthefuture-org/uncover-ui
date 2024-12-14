/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { UncoverProvider } from '@uncover-ui/react-native';
import { SheetsProvider } from '@uncover-ui/rn-sheet-provider';
import React from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TestSheetScreen } from './src/screens/test_sheet';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <UncoverProvider>
      <SheetsProvider>
        <TestSheetScreen />
      </SheetsProvider>
    </UncoverProvider>
  );
}


export default App;
