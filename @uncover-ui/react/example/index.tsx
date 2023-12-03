import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UncoverUIProvider } from "../src/providers"
import Main from "./main"


const App = () => {
  return (
    <div>
      <UncoverUIProvider>
        <Main/>
      </UncoverUIProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
