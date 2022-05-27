import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

export const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Welcome to app!</title>
    </Head>
    <main className="app">
      <Component {...pageProps} />
    </main>
  </>
);

export default App;
