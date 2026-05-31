import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { CATEGORIES } from '../lib/blog';

export async function GET(context: { site?: URL }) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  return rss({
    title: 'Cristal Studios — Blog',
    description:
      'Estratégia, bastidores e o que aprendemos em 40 anos produzindo podcast, vídeo e áudio.',
    site: context.site ?? new URL('https://cristalstudios.com'),
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}`,
      author: `relacionamento@cristalstudios.com (${post.data.author})`,
      categories: [CATEGORIES[post.data.category].name, ...post.data.tags],
    })),
    customData: `
      <language>pt-BR</language>
      <copyright>© ${new Date().getFullYear()} Cristal Studios Produções</copyright>
      <managingEditor>relacionamento@cristalstudios.com (Cristal Studios)</managingEditor>
    `.trim(),
    stylesheet: '/rss-styles.xsl',
  });
}
