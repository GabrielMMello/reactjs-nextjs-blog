import { GetStaticProps } from 'next';
import Head from 'next/head';
import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai'

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(props: HomeProps) {
  // TODO
  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a>
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div className={styles.subContainer}>
              <div className={styles.item}>
                <AiOutlineCalendar />
                <time>12 de maio</time>
              </div>
              <div className={styles.item}>
                <AiOutlineUser />
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </a>
          <a>
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div className={styles.subContainer}>
              <div className={styles.item}>
                <AiOutlineCalendar />
                <time>12 de maio</time>
              </div>
              <div className={styles.item}>
                <AiOutlineUser />
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </a>
          <a>
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div className={styles.subContainer}>
              <div className={styles.item}>
                <AiOutlineCalendar />
                <time>12 de maio</time>
              </div>
              <div className={styles.item}>
                <AiOutlineUser />
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </a>
          <button type="button">Carregar mais posts</button>
        </div>
      </main>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
