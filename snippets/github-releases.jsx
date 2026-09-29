export const GitHubReleases = () => {
  const [releases, setReleases] = useState([]);
  const [page, setPage] = useState(1);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 15000);

    const load = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `https://api.github.com/repos/Commit-Plus/commit-plus/releases?per_page=5&page=${page}`,
          {
            headers: { Accept: 'application/vnd.github.html+json' },
            signal: controller.signal,
          },
        );
        if (!response.ok) throw new Error('Unable to load releases');
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid release list');

        // Keep release Markdown as content, never executable MDX. Strip all
        // attributes except a small set needed for links, images, and tables.
        const allowed = new Set(['P', 'BR', 'HR', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'STRONG', 'EM', 'DEL', 'S', 'BLOCKQUOTE', 'PRE', 'CODE', 'A', 'IMG', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD', 'DETAILS', 'SUMMARY', 'DIV', 'SPAN']);
        const sanitize = (html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          for (const element of Array.from(doc.body.querySelectorAll('*'))) {
            if (!allowed.has(element.tagName)) {
              element.remove();
              continue;
            }
            for (const attribute of Array.from(element.attributes)) {
              const name = attribute.name;
              const isLink = element.tagName === 'A' && name === 'href';
              const isImage = element.tagName === 'IMG' && name === 'src';
              if (isLink || isImage) {
                try {
                  const url = new URL(attribute.value, 'https://github.com/Commit-Plus/commit-plus/');
                  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Unsafe URL');
                  element.setAttribute(name, url.href);
                } catch {
                  element.removeAttribute(name);
                }
              } else if (!['alt', 'title', 'colspan', 'rowspan'].includes(name)) {
                element.removeAttribute(name);
              }
            }
            if (element.tagName === 'IMG') element.setAttribute('loading', 'lazy');
          }
          return doc.body.innerHTML;
        };
        const next = data.filter((release) => !release.draft && !release.prerelease).map((release) => ({
          id: release.id,
          tag: release.tag_name,
          name: release.name || release.tag_name,
          date: release.published_at,
          html: sanitize(release.body_html || '<p>No release notes provided.</p>'),
        }));
        if (!active) return;
        setReleases((previous) => {
          const merged = new Map(previous.map((release) => [release.id, release]));
          next.forEach((release) => merged.set(release.id, release));
          return Array.from(merged.values());
        });
        setHasMore((response.headers.get('link') || '').includes('rel="next"'));
      } catch {
        if (active) setError(true);
      } finally {
        clearTimeout(timeout);
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [page, attempt]);

  return (
    <div>
      {releases.map((release) => (
        <article key={release.id} id={`release-${release.tag}`} className="mb-12 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <h2>{release.name}</h2>
          <p className="text-sm text-zinc-500">
            {release.date ? <time dateTime={release.date}>{new Date(release.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</time> : null}
            {' · '}
            <a href={`https://github.com/Commit-Plus/commit-plus/releases/tag/${encodeURIComponent(release.tag)}`}>View on GitHub</a>
          </p>
          <div dangerouslySetInnerHTML={{ __html: release.html }} />
        </article>
      ))}
      <div role="status" aria-live="polite">
        {loading ? <p>Loading release notes…</p> : null}
        {error ? <p>Release notes could not be loaded. Please try again or <a href="https://github.com/Commit-Plus/commit-plus/releases">view releases on GitHub</a>.</p> : null}
        {!loading && !error && releases.length === 0 && !hasMore ? <p>No releases published yet.</p> : null}
      </div>
      {!loading && (error || hasMore) ? (
        <button type="button" className="rounded-lg border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-700" onClick={() => error ? setAttempt((value) => value + 1) : setPage((value) => value + 1)}>
          {error ? 'Try again' : 'Load older releases'}
        </button>
      ) : null}
    </div>
  );
};
