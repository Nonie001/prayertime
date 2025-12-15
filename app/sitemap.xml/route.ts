import provinces from '@/data/provinces.json';

export async function GET() {
  const baseUrl = 'https://prayertime.in.th';

  const staticUrls = [
    { loc: baseUrl, changefreq: 'daily', priority: '1' },
    { loc: `${baseUrl}/prayertime`, changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/qibla`, changefreq: 'monthly', priority: '0.8' },
    { loc: `${baseUrl}/calculator/zakat`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/calculator/inheritance`, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/about`, changefreq: 'monthly', priority: '0.5' },
    { loc: `${baseUrl}/privacy-policy`, changefreq: 'monthly', priority: '0.3' },
  ];

  const provinceUrls = provinces.map(p => ({
    loc: `${baseUrl}/prayertime/${p.id}`,
    changefreq: 'daily',
    priority: '0.8',
  }));

  const allUrls = [...staticUrls, ...provinceUrls];

  const urls = allUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
