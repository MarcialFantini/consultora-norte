/**
 * Shared helpers for the blog content collection.
 *
 * Keep this lean — only utilities that have to live in TS rather than
 * an inline expression in every page.
 */

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface TagEntry {
  tag: string;
  slug: string;
  count: number;
}

export function collectTags(
  posts: Array<{ data: { tags?: string[] } }>
): TagEntry[] {
  const map = new Map<string, TagEntry>();
  posts.forEach((post) => {
    (post.data.tags ?? []).forEach((tag) => {
      const slug = tagSlug(tag);
      const existing = map.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(slug, { tag, slug, count: 1 });
      }
    });
  });
  return Array.from(map.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.tag.localeCompare(b.tag, 'es-AR');
  });
}
