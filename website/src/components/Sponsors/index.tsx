import React from 'react';
import styles from './styles.module.css';

export default function Sponsors() {
  return (
    <div className={styles.wrapper}>
      <div className="row">
        <div className="col">
          <h2 className={styles.sponsorsHeading}>Sponsors</h2>
        </div>
      </div>
      <div className={styles.description}>
        Support on{' '}
        <a
          href="https://opencollective.com/jest-preview"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Collective
        </a>
        , starting from <b>$1</b>.
      </div>
      <div className="row">
        <div className="col">
          <h3 className={styles.bronzeHeading}>Bronze Sponsor 🥉</h3>
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
        Want your logo here? Learn more at{' '}
        <a
          href="https://github.com/nvh95/jest-preview#sponsors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sponsors
        </a>
        .
      </div>
    </div>
  );
}
