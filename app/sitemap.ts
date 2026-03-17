import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://rxcorp.fr';

    // Routes statiques
    const routes = [
        '',
        '/serveurs-jeux',
        '/hebergement',
        '/dedies',
        '/statut',
        '/contact',
        '/a-propos',
        '/mentions-legales',
        '/cgv',
        '/confidentialite',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: (route === '' || route === '/statut') ? 'daily' : 'weekly' as any,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
