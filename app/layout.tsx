import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "rxcorp — Hébergement Haute Performance",
    template: "%s | rxcorp",
  },
  description:
    "Hébergement de serveurs de jeux, serveurs dédiés et hébergement web ultra-performants. Protection Anti-DDoS incluse. Déploiement en moins de 60 secondes.",
  keywords: [
    "hébergement serveur",
    "serveur Minecraft",
    "serveur de jeux",
    "serveur dédié",
    "hébergement web",
    "anti-DDoS",
    "rxcorp",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://rxcorp.fr",
    siteName: "rxcorp",
    title: "rxcorp — Hébergement Haute Performance",
    description:
      "Hébergement premium avec Anti-DDoS, NVMe SSD, et déploiement instantané.",
  },
  twitter: {
    card: "summary_large_image",
    title: "rxcorp — Hébergement Haute Performance",
    description: "Hébergement premium avec Anti-DDoS, NVMe SSD, et déploiement instantané.",
  },
  robots: { index: true, follow: true },
  themeColor: "#E8002D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "rxcorp",
    url: "https://rxcorp.fr",
    logo: "https://rxcorp.fr/logo.png",
    description: "Hébergeur de serveurs de jeux, dédiés et web haute performance.",
    sameAs: [
      "https://twitter.com/rxcorp",
      "https://discord.gg/rxcorp",
      "https://github.com/rxcorp"
    ]
  };

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
