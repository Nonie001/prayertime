import { MetadataRoute } from 'next';
import provinces from '@/data/provinces.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://prayertime.in.th'; // เปลี่ยนเป็น domain จริง

  // หน้าหลัก
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/prayertime`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calculator/zakat`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/calculator/inheritance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/qibla`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // หน้าจังหวัด (77 จังหวัด)
  const provincePages: MetadataRoute.Sitemap = provinces.map((province) => ({
    url: `${baseUrl}/prayertime/${province.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...provincePages];
}
