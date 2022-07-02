import { useState } from 'react';
import { ReactComponent as Logo } from './logo.svg';
import logo from './logo.svg';
import logo2 from './assets/images/logo.svg';
// @ts-expect-error Ignore ts error for importing .ico file
import staticReact from './assets/images/favicon.ico';

import styles from './style.module.css';

import './App.css';
import './assets/css/App.css';
import './assets/_scss/style.scss';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="svg-component" />
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <img src={logo2} className="logo2" alt="logo2" />
          <img src={staticReact} alt="static react" />
        </div>
        <p>Create React App example</p>
        <p className={styles.textOrange}>Styled by CSS Modules</p>
        <p className="global-configured-sass">
          This text is styled by global configured SASS
        </p>
        <p className="imported-sass">This text is styled by imported SASS</p>
        <p className="load-path-sass">
          This text is styled by SASS from load paths
        </p>
        <div className="animated fadeIn">
          <p>An animated element style using @import ~</p>
          <p>Watch me fade in!</p>
        </div>
        <button
          data-testid="increase"
          type="button"
          onClick={() => setCount((count) => count + 1)}
        >
          count is: <div data-testid="count">{count}</div>
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
