import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'DX-Driven',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Jest Preview has a mission: To make front end developers' life easier.
        It's built with the mindset of <strong>Developer Experience</strong>{' '}
        first in mind.
      </>
    ),
  },
  {
    title: 'Fast',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Write tests in Jest and see the changes reflects in browser in{' '}
        <strong>a few milliseconds</strong>.
      </>
    ),
  },

  {
    title: 'Framework-Agnostic',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        You can use Jest Preview with <strong>any testing libraries</strong> and{' '}
        <strong>frontend frameworks</strong>.
      </>
    ),
  },
  {
    title: 'Productivity',
    Svg: require('@site/static/img/undraw_docusaurus_productivity.svg').default,
    description: (
      <>
        Don't waste time guessing what is your UI looks like. Let's Jest Preview{' '}
        <strong>visualize</strong> it in a browser for you!
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
