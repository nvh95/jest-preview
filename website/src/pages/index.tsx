import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Sponsors from '@site/src/components/Sponsors';
import Carbon from '../components/Carbon';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/intro"
          >
            Get Started
          </Link>
          <a
            href="https://stackblitz.com/edit/jest-preview?file=README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--info button--lg"
          >
            Try now
          </a>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Preview your Jest tests in the browser. Effortlessly."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <Sponsors />
      </main>
      <Carbon
        querySelector=".footer__links div:last-child"
        customStyle="min-height: 100px; margin: -20px 0;"
      />
    </Layout>
  );
}
