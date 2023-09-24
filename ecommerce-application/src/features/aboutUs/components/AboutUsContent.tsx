import { AnimationBlock } from '../../animationBlock/AnimationBlock';
import styles from './AboutUsContent.module.scss';

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
          <div className={styles.image_alex} />
          <div className={styles.info_container}>
            <p className={styles.text}>
              <span className={styles.text_bold}>Name:</span>Alex
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>GitHub:</span>
              <a className={styles.link} href="https://github.com/Lev1ossa">
                Lev1ossa
              </a>
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>Job title:</span>Frontend
              developer
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>Short bio:</span>Alex has been
              1C developer for 4 years. About 2 years ago he realized, that he
              want to try to become web developer and he started his way to
              learn JavaScript. After 1 year of learning in free time, he took
              it seriosly, leaved his work and started to study full time. His
              aim now is to become a great specialist.
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>
                Contribution to the project:
              </span>
              Alex is Team Lead of project. His part was working with Task
              Requirements, tasks distribution, workflow control, task implement
              way, code quality control and each member helping. Also, he is
              developer too and his primary responsibility was all interaction
              with CommerceTools API and manage CommerceTools merchant center.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.image_alyona} />
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
          <div className={styles.image_anton} />
          <div className={styles.info_container}>
            <p className={styles.text}>
              <span className={styles.text_bold}>Name:</span>Anton
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>GitHub:</span>
              <a className={styles.link} href="https://github.com/antasth">
                antasth
              </a>
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>Job title:</span>Frontend
              developer
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>Short bio:</span>Anton has an
              technical education. Until last year he worked as a system
              administrator for 9 years and has experience in the field of
              maintenance and maintenance of the technical infrastructure of an
              enterprise with more than 100 jobs. He have been studying web
              development for about 1.5 years and now he is on his way to
              becoming a frontend developer.
            </p>
            <p className={styles.text}>
              <span className={styles.text_bold}>
                Contribution to the project:
              </span>
              Anton has made some important contributions to the project, he has
              working on the login page, registration page, 404 page, catalog
              page and product page, as well as preparing some images for the
              project, like logo, products images and others.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
