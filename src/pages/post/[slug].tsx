import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ReactElement } from 'react';
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineClockCircle,
} from 'react-icons/ai';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({
  post: {
    first_publication_date,
    data: {
      title,
      banner: { url },
      author,
      content,
    },
  },
}: PostProps): ReactElement {
  const router = useRouter();
  if (router.isFallback) return <div>Carregando...</div>;

  const readingTime = (): number => {
    return content.reduce((acc, { heading, body }) => {
      const wordsInHeading = heading.split(' ').length;
      const wordsInBody = RichText.asText(body).split(' ').length;
      return Math.ceil((acc * 200 + wordsInHeading + wordsInBody) / 200);
    }, 0);
  };

  return (
    <>
      <Head>
        <title>{title} | spacetraveling</title>
      </Head>

      <main className={commonStyles.container}>
        <article className={styles.post}>
          <img src={url} alt="banner" />
          <h1>{title}</h1>
          <div className={commonStyles.subContainer}>
            <div className={commonStyles.item}>
              <AiOutlineCalendar />
              <time>
                {format(new Date(first_publication_date), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </time>
            </div>
            <div className={commonStyles.item}>
              <AiOutlineUser />
              <span>{author}</span>
            </div>
            <div className={commonStyles.item}>
              <AiOutlineClockCircle />
              <span>{`${readingTime()} min`}</span>
            </div>
          </div>
          {content.map(({ heading, body }) => (
            <>
              <h2>{heading}</h2>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: RichText.asHtml(body) }}
              />
            </>
          ))}
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const { results: posts } = await prismic.query(
    Prismic.predicates.at('document.type', 'post'),
    {
      fetch: [],
    }
  );
  const paths = posts.map(post => ({ params: { slug: post.uid } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: {
      post,
    },
  };
};
