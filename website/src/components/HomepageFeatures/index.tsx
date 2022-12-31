import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate, { translate } from '@docusaurus/Translate';

type FeatureItem = {
  title: string;
  Svg: string;
  description: JSX.Element;
};

// FIXME The SVG here (or all static files) cannot be loaded in i18n dev mode
const FeatureList: FeatureItem[] = [
  {
    title: translate({
      id: 'home.featureList.dx-driven.title',
      message: 'DX-Driven',
    }),
    Svg: '/img/dx.svg',
    description: (
      <Translate
        id="home.featureList.dx-driven.description"
        values={{
          dx: (
            <strong>
              <Translate id="home.featureList.dx-driven.description.dx">
                Developer Experience
              </Translate>
            </strong>
          ),
        }}
      >
        {
          "Jest Preview has a mission: To make front end developers' life easier. It's built with the mindset of {dx} first in mind."
        }
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'home.featureList.fast.title',
      message: 'Fast',
    }),
    Svg: '/img/fast.svg',
    description: (
      <Translate
        id="home.featureList.fast.description"
        values={{
          ms: (
            <strong>
              <Translate
                id="home.featureList.fast.description.ms"
                description="a few milliseconds"
              >
                a few milliseconds
              </Translate>
            </strong>
          ),
        }}
      >
        {'Write tests in Jest and see the changes reflects in browser in {ms}'}
      </Translate>
    ),
  },

  {
    title: translate({
      id: 'home.featureList.framework-agnostic.title',
      message: 'Framework-Agnostic',
    }),
    Svg: '/img/agnostic.svg',
    description: (
      <Translate
        id="home.featureList.framework-agnostic.description"
        values={{
          tl: (
            <strong>
              <Translate
                id="home.featureList.framework-agnostic.description.tl"
                description="any testing libraries"
              >
                any testing libraries
              </Translate>
            </strong>
          ),
          ff: (
            <strong>
              <Translate
                id="home.featureList.framework-agnostic.description.ff"
                description="frontend frameworks"
              >
                frontend frameworks
              </Translate>
            </strong>
          ),
        }}
      >
        {'You can use Jest Preview with {tl} and {ff}.'}
      </Translate>
    ),
  },
  {
    title: translate({
      id: 'home.featureList.productivity.title',
      message: 'Productivity',
    }),
    Svg: '/img/productivity.svg',
    description: (
      <>
        <Translate
          id="home.featureList.productivity.description"
          values={{
            visualize: (
              <strong>
                <Translate id="home.featureList.productivity.description.visualize">
                  visualize
                </Translate>
              </strong>
            ),
          }}
        >
          {
            "Don't waste time guessing what is your UI looks like. Let's Jest Preview {visualize} it in a browser for you!"
          }
        </Translate>
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center">
        <img className={styles.featureSvg} src={Svg} alt="" />
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
