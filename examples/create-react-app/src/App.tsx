import { useState } from 'react';
import { ReactComponent as Logo } from './logo.svg';
import logo from './logo.svg';
import logo2 from './assets/images/logo.svg';
import styles from './style.module.css';

import './App.css';
import './assets/css/App.css';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="svg-component" />
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo2} className="logo2" alt="logo2" />
        <p>Create React App example</p>
        <p className={styles.textOrange}>Styled by CSS Modules</p>
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
