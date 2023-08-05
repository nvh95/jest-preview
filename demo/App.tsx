import { useState } from 'react';
import styled from 'styled-components';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import emotionStyled from '@emotion/styled';
import { styled as stichesStyled } from '@stitches/react';
import '~animate.css/animate.css';

import logo2 from './assets/images/logo.svg';
import { ReactComponent as SvgVite } from './assets/images/vite.svg';
import './App.css';
import './assets/css/App.css';
import './assets/_scss/style.scss';
import { cssModule } from './style.module.css';
import { scssModule } from './style.module.scss';
import './styles/less/style.less';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <LogoWrapper>
          <img src="/logo.svg" className="App-logo" alt="logo" height={100} />
          <SvgVite height={100} />
        </LogoWrapper>
        <img src={logo2} className="logo2" alt="logo2" />
        <p>Hello Vite + React!</p>
        <p className="less-p">Less: Blue + Dynamic size (break point 400px)</p>
        <p className="less-child-p">Less: Yellow</p>
        <p className={scssModule}>Styled by SCSS Modules</p>
        <StyledText>This text is styled by styled-components</StyledText>
        <p className="global-css">
          This text is styled by global css which is not imported to App.tsx
        </p>
        <p className={cssModule}>This text is styled by CSS Modules</p>
        <p className="global-configured-sass">
          This text is styled by global configured SASS
        </p>
        <p className="imported-sass">This text is styled by imported SASS</p>
        <p className="imported-sass-shared-var">This text is styled by imported SASS using a shared mixin and variable</p>
        <p className="bg-yellow-400 font-bold m-5 text-red-500">
          This text is styled by Tailwind CSS
        </p>
        <button
          css={css`
            padding: 32px;
            background-color: hotpink;
            font-size: 24px;
            border-radius: 4px;
            &:hover {
              color: blue;
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
        <p className="load-path-sass">
          This text is styled by SASS from load paths
        </p>
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
  );
}

const StyledText = styled.p`
  color: red;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
`;

const EmotionP = emotionStyled.p`
  color: orange;
`;

const StichesP = stichesStyled('p', {
  color: 'Purple',
});
export default App;
