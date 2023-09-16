import { AnimationBlock } from '../../animationBlock/AnimationBlock';
import styles from './AboutUsContent.module.scss';

// eslint-disable-next-line max-lines-per-function
export function AboutUsContent(): React.ReactElement {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h2 className={styles.page_title}>About Us</h2>
        </div>
        <div className={styles.text_block}>
          <p className={styles.text}>
            Hello everyone! We are the team of awesome frontend developers
            &#34;AAA&#34; and this page is about us. In July 2023, our beloved
            RS School brought us together and for the past two months, we have
            been working hard on creating this e-commerce application. Our team
            effectively collaborated by utilizing our individual strengths and
            skills to achieve a successful outcome. We communicated regularly
            and openly, sharing our progress and any challenges we faced.
            Together, our team worked efficiently and effectively, leveraging
            each other&apos;s strengths to create a triple-A product. We were
            able to meet all project requirements and deliver e-commerce
            application that exceeded expectations.
          </p>
          <h4 className={styles.page_subtitle}>
            &#34;A huge thank you for the opportunity to write these lines here,
            <a href="https://rs.school/js/">
              <span className={styles.rs_logo} />
            </a>
            .&#34;
          </h4>
          <AnimationBlock />
        </div>
      </div>
      <div className={styles.cards_block}>
        <div className={styles.card}>
          <div className={styles.image} />
          <div className={styles.info_container}>
            <p className={styles.text}>
              <span className={styles.text_bold}>Name:</span>Alyona
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>GitHub:</span>
              <a className={styles.link} href="https://github.com/Alyona8891">
                Alyona8891
              </a>
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>Job title:</span>Frontend
              developer
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>Short bio:</span>Alyona has an
              economics education. In her previous life, she worked her way up
              to become a chief accountant but became disillusioned with the
              profession. She has been studying frontend development for a year
              now, hoping to become a specialist in this field before reaching
              retirement age.
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>
                Contribution to the project:
              </span>
              Alyona has made an active contribution to the project,
              specifically working on the login page, registration page, profile
              page, cart page and this page. At RS School, she has gained a
              reputation as a tough reviewer. So she conducted extensive testing
              and debugging to ensure that the app is bug-free and works
              flawlessly.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.image} />
          <div className={styles.info_container}>
            <p className={styles.text}>
              <span className={styles.text_bold}>Name:</span>Alyona
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>GitHub:</span>
              <a className={styles.link} href="https://github.com/Alyona8891">
                Alyona8891
              </a>
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>Job title:</span>Frontend
              developer
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>Short bio:</span>Alyona has an
              economics education. In her previous life, she worked her way up
              to become a chief accountant but became disillusioned with the
              profession. She has been studying frontend development for a year
              now, hoping to become a specialist in this field before reaching
              retirement age.
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>
                Contribution to the project:
              </span>
              Alyona has made an active contribution to the project,
              specifically working on the login page, registration page, profile
              page, cart page and this page. At RS School, she has gained a
              reputation as a tough reviewer. So she conducted extensive testing
              and debugging to ensure that the app is bug-free and works
              flawlessly.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.image} />
          <div className={styles.info_container}>
            <p className={styles.text}>
              <span className={styles.text_bold}>Name:</span>Alyona
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>GitHub:</span>
              <a className={styles.link} href="https://github.com/Alyona8891">
                Alyona8891
              </a>
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>Job title:</span>Frontend
              developer
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>Short bio:</span>Alyona has an
              economics education. In her previous life, she worked her way up
              to become a chief accountant but became disillusioned with the
              profession. She has been studying frontend development for a year
              now, hoping to become a specialist in this field before reaching
              retirement age.
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>
                Contribution to the project:
              </span>
              Alyona has made an active contribution to the project,
              specifically working on the login page, registration page, profile
              page, cart page and this page. At RS School, she has gained a
              reputation as a tough reviewer. So she conducted extensive testing
              and debugging to ensure that the app is bug-free and works
              flawlessly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
