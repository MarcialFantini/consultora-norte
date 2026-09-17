import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import site from '../data/site.json';

export async function GET(context) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    site: context.site ?? site.url,
    locale: site.locale,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      author: post.data.author,
      categories: [post.data.category],
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>es-AR</language>',
    stylesheet: '/rss/styles.xsl',
  });
}
