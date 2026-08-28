import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '@lib/og';
import { SITE, HOME, BLOG } from '@consts';

export async function getStaticPaths() {
  const posts = await getCollection('blog');

  const postPaths = posts.map((post) => ({
    params: { slug: `blog/${post.slug}` },
    props: {
      title: post.data.title,
      description: post.data.description,
    },
  }));

  return [
    {
      params: { slug: 'index' },
      props: {
        title: SITE.NAME,
        description: HOME.DESCRIPTION,
      },
    },
    {
      params: { slug: 'blog' },
      props: {
        title: BLOG.TITLE,
        description: BLOG.DESCRIPTION,
      },
    },
    ...postPaths,
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props as {
    title: string;
    description: string;
  };
  const image = await generateOgImage(title, description);

  return new Response(new Uint8Array(image), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
