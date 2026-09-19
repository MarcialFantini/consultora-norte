import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
// `experimental_AstroContainer` is the server-side renderer exposed by Astro
// (`astro/container`). We use it here to render each post's <Content /> to a
// raw HTML string at build time so the feed can embed the full body inside
// <content:encoded>. The API is still flagged experimental in Astro 7.x —
// if it graduates or moves, swap the import for the stable path.
// Docs: https://docs.astro.build/en/reference/container-reference/
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import site from '../data/site.json';

/**
 * RSS 2.0 feed for Consultora Norte.
 *
 * Compared to the previous version, this one:
 *  - Ships the full HTML body of each post inside <content:encoded>
 *    via Astro's `Container` API (server-rendered to a string at build
 *    time, no client runtime).
 *  - Emits proper <author> envelopes — name when no email is available,
 *    `email (name)` when one is. @astrojs/rss 4.x requires `author` to be
 *    a string, so the envelope is serialised into the RSS 2.0 convention
 *    rather than a JSON object.
 *  - Lists categories from `data.category` AND `data.tags` so feed
 *    readers can route maildrops into folders.
 *  - Sets <lastBuildDate> from the most recently updated entry.
 *  - Declares <language>es-AR</language> in the channel customData.
 *
 * Note: We do not strip script tags from the rendered HTML here, because
 * the entry rendering happens through the editorial pipeline. The site
 * already runs `prose-editorial` with no inline scripts inside the body,
 * so the RSS body inherits that style and remains clean.
 */

const AUTHOR_EMAILS = {
  'Lucía Fernández': 'lucia@consultoranorte.example',
  'Martín Oviedo': 'martin@consultoranorte.example',
  'Soledad Rivas': 'soledad@consultoranorte.example',
};

export async function GET(context) {
  const allPosts = await getCollection('blog');
  const posts = allPosts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const container = await AstroContainer.create();

  // Render every entry body in parallel — Astro's Container API gives us
  // the same HTML that the public site sees, including relative URLs.
  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const content = await container.renderToString(Content);
      return { post, content };
    })
  );

  const lastBuildDate = items.reduce((acc, { post }) => {
    const stamp = post.data.updatedDate ?? post.data.pubDate;
    if (!acc) return stamp;
    return stamp > acc ? stamp : acc;
  }, null);

  return rss({
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    site: context.site ?? site.url,
    customData:
      `<language>${site.locale}</language>` +
      `<lastBuildDate>${(lastBuildDate ?? new Date()).toUTCString()}</lastBuildDate>` +
      `<managingEditor>noreply@consultoranorte.example (${site.name})</managingEditor>` +
      `<webMaster>noreply@consultoranorte.example (${site.name})</webMaster>` +
      `<docs>https://www.rssboard.org/rss-specification</docs>` +
      `<atom:link xmlns:atom="http://www.w3.org/2005/Atom" rel="self" type="application/rss+xml" href="${(context.site ?? site.url).toString().replace(/\/$/, '')}/rss.xml" />`,
    items: items.map(({ post, content }) => {
      const email = AUTHOR_EMAILS[post.data.author];
      // @astrojs/rss 4.x schema requires `author` to be a string.
      // Use the RSS 2.0 convention: "email (name)" when an email is known.
      const authorString = email
        ? `${email} (${post.data.author})`
        : post.data.author;
      return {
        title: post.data.title,
        link: `/blog/${post.id}/`,
        pubDate: post.data.pubDate,
        description: post.data.description,
        content,
        author: authorString,
        categories: [post.data.category, ...(post.data.tags ?? [])],
      };
    }),
    stylesheet: '/rss/styles.xsl',
  });
}
