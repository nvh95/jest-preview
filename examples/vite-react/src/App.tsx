import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import '~animate.css/animate.css';

import logo2 from './assets/images/logo.svg';

import './App.css';
import './assets/css/App.css';

import './assets/_scss/style.scss';
import styles from './style.module.css';

const GlobalStyle = createGlobalStyle`
  .sc-global {
    color: yellow
  }
`;

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <header className="App-header">
          <img src="/logo.svg" className="App-logo" alt="logo" />
          <img src={logo2} className="logo2" alt="logo2" />
          <p>Vite Example</p>
          <StyledText>This text is styled by styled-components</StyledText>
          <p className="sc-global">Global Style Components (Yellow)</p>
          <p className={styles.green}>This text is styled by CSS Modules</p>
          <p className="global-configured-sass">
            This text is styled by global configured SASS
          </p>
          <p className="imported-sass">This text is styled by imported SASS</p>
          <p className="load-path-sass">
            This text is styled by SASS from load paths
          </p>
          <p className="text-xanh">TailwindCSS - Green</p>
          <p className="animate__animated animate__bounce">
            An animated element style using @use ~
          </p>
          <div className="animated fadeIn">
            <p>An animated element style using import ~</p>
            <p>Watch me fade in!</p>
          </div>
          <p>
            <button
              data-testid="increase"
              type="button"
              onClick={() => setCount((count) => count + 1)}
            >
              count is: <div data-testid="count">{count}</div>
            </button>
          </p>
          <p>
            Edit <code>App.tsx</code> and save to test HMR updates.
          </p>
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {' | '}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Docs
            </a>
          </p>
        </header>
      </div>
    </>
  );
}

const StyledText = styled.p`
  color: red;
`;

export default App;
