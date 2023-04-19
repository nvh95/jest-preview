import Translate, { translate } from '@docusaurus/Translate';
import React from 'react';
import styles from './styles.module.css';

export default function Sponsors() {
  return (
    <div className={styles.wrapper}>
      <div className="row">
        <div className="col">
          <h2 className={styles.sponsorsHeading}>
            {translate({ id: 'home.sponsors.heading', message: 'Sponsors' })}
          </h2>
        </div>
      </div>
      <div className={styles.description}>
        <Translate
          id="home.sponsors.description"
          values={{
            openCollectiveLink: (
              <a
                href="https://opencollective.com/jest-preview"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Collective
              </a>
            ),
            oneDollar: <strong>$1</strong>,
          }}
        >
          {'Support on {openCollectiveLink}, starting from {oneDollar}'}
        </Translate>
      </div>
      <div className="row">
        <div className="col">
          <h3 className={styles.bronzeHeading}>Bronze Sponsors 🥉</h3>
        </div>
      </div>
      <div className={styles.sponsorWrapper}>
        <a
          className={styles.bronzeSponsor}
          href="https://www.deploysentinel.com/"
        >
          <img
            src="https://github.com/DeploySentinel.png"
            width="94"
            height="94"
          />
        </a>
        <a className={styles.bronzeSponsor} href="https://react-hook-form.com/">
          <img
            src="https://github.com/react-hook-form.png"
            width="94"
            height="94"
          />
        </a>
      </div>
      <div className="row">
        <div className="col">
          <h3 className={styles.pastSponsorHeading}>Past Sponsors</h3>
        </div>
      </div>
      <div className={styles.sponsorWrapper}>
        <a className={styles.bronzeSponsor} href="https://webuild.community/">
          <img
            src="https://user-images.githubusercontent.com/8603085/170883918-8b9f111d-f3c6-4647-9cc1-de56dd98ea60.png"
            width="94"
            height="94"
          />
        </a>
      </div>
      <div className={styles.wantLogo}>
        <Translate
          id="home.sponsors.want"
          values={{
            sponsorsLink: (
              <a
                href="https://github.com/nvh95/jest-preview#sponsors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Translate id="home.sponsors.want.sponsors-link">
                  Sponsors
                </Translate>
              </a>
            ),
          }}
        >
          {'Want your company logo appear here? Read more at {sponsorsLink}.'}
        </Translate>
      </div>
    </div>
  );
}
