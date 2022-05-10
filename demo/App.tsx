import { useState } from 'react';
import styled from 'styled-components';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import emotionStyled from '@emotion/styled';
import { styled as stichesStyled } from '@stitches/react';

import logo2 from './assets/images/logo.svg';
import './App.css';
import './assets/css/App.css';
import './assets/_scss/style.scss';
import { cssModule } from './style.module.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.svg" className="App-logo" alt="logo" />
        <img src={logo2} className="logo2" alt="logo2" />
        <p>Hello Vite + React!</p>
        <StyledText>This text is styled by styled-components</StyledText>
        <p className="global-css">
          This text is styled by global css which is not imported to App.tsx
        </p>
        <p className={cssModule}>This text is styled by CSS Modules</p>
        <p className="global-configured-sass">
          This text is styled by global configured SASS
        </p>
        <p className="imported-sass">This text is styled by imported SASS</p>
        <button
          css={css`
            padding: 32px;
            background-color: hotpink;
            font-size: 24px;
            border-radius: 4px;
            &:hover {
              color: white;
            }
          `}
        >
          Hover to change color.
        </button>
        <EmotionP>Styled by Emotion</EmotionP>
        {/* TODO: Not work with Stiches yet since output css does not present directly in the head, but in Constructable Stylesheet Objects */}
        {/* Reference: https://developer.chrome.com/blog/css-in-js/ */}
        {/* https://wicg.github.io/construct-stylesheets/ */}
        <StichesP>Styled by Stiches</StichesP>
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
  );
}

const StyledText = styled.p`
  color: red;
`;

const EmotionP = emotionStyled.p`
  color: orange;
`;

const StichesP = stichesStyled('p', {
  color: 'Purple',
});
export default App;
