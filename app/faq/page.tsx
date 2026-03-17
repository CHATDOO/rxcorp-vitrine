import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes | rxcorp",
  description: "Réponses à toutes vos questions sur l'hébergement rxcorp : déploiement, Anti-DDoS, panel, tarifs, support.",
};

const FAQS = [
  {
    category: "Démarrage",
    items: [
      { q: "Quel est le délai de déploiement ?", a: "Votre serveur est actif en moins de 60 secondes après paiement. Le processus est entièrement automatique, 24h/24." },
      { q: "Y a-t-il une offre gratuite ?", a: "Oui ! Une semaine gratuite sur notre offre Game Starter, activable une fois par compte. Aucune carte bancaire requise." },
      { q: "Comment migrer depuis un autre hébergeur ?", a: "Notre équipe vous aide gratuitement à transférer votre serveur et vos données depuis OVH, Scaleway, Nitrado ou tout autre hébergeur." },
      { q: "Quel panel de gestion utilisez-vous ?", a: "Nous utilisons Pterodactyl, le panel de référence pour les serveurs de jeux. Il inclut console en temps réel, gestion de fichiers, backups et plus." },
    ]
  },
  {
    category: "Technique",
    items: [
      { q: "Y a-t-il une protection Anti-DDoS ?", a: "Oui, tous nos serveurs bénéficient d'une protection Anti-DDoS jusqu'à 1 Tbps incluse sans surcoût, hébergée dans notre datacenter Paris." },
      { q: "Quelle est la bande passante incluse ?", a: "Tous nos serveurs disposent d'un réseau 10 Gbps dédié depuis notre datacenter Paris. Aucune limitation de trafic." },
      { q: "Quel stockage est utilisé ?", a: "NVMe Gen4 avec des vitesses atteignant 7 000 MB/s. Vos données de jeu chargent quasi-instantanément." },
      { q: "Quelle est la localisation des serveurs ?", a: "Datacenter Paris, France. Latence < 10ms pour la majorité des joueurs européens." },
    ]
  },
  {
    category: "Facturation",
    items: [
      { q: "Puis-je annuler à tout moment ?", a: "Oui, sans engagement ni frais de résiliation. Votre abonnement s'arrête simplement à la fin de la période en cours." },
      { q: "Puis-je upgrader mon serveur ?", a: "Oui, l'upgrade est instantané depuis votre espace client. Vous ne payez que la différence au prorata pour la période restante." },
      { q: "Quels moyens de paiement acceptez-vous ?", a: "Carte bancaire (Visa, Mastercard), PayPal. Paiements sécurisés via Stripe." },
      { q: "Les backups sont-ils inclus ?", a: "Oui, 3 backups automatiques par semaine inclus sur toutes les offres Pro et supérieures. Restauration en 1 clic." },
    ]
  },
  {
    category: "Support",
    items: [
      { q: "Comment contacter le support ?", a: "Via ticket Discord 24/7. Notre temps de réponse moyen est inférieur à 30 minutes. Support prioritaire (< 15 min) pour les plans Elite+." },
      { q: "Êtes-vous disponible en dehors des heures de bureau ?", a: "Oui, notre support est disponible 24h/24, 7j/7, week-ends et jours fériés inclus." },
      { q: "Proposez-vous de l'aide à la configuration ?", a: "Oui, nous pouvons vous aider à configurer votre serveur, installer des plugins/mods et optimiser les performances." },
      { q: "Y a-t-il une communauté Discord ?", a: "Oui ! Rejoignez notre Discord pour accéder à la communauté, aux annonces et au support technique." },
    ]
  },
];

export default function FAQPage() {
  return (
    <div style={{ background: "var(--bg-void)", minHeight: "100vh", padding: "140px 20px 80px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{
            display: "inline-block",
            background: "rgba(232,0,45,0.1)",
            border: "1px solid rgba(232,0,45,0.25)",
            borderRadius: "99px",
            padding: "4px 16px",
            fontSize: "0.8rem",
            color: "var(--red-bright)",
            marginBottom: "16px",
          }}>FAQ</div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, marginBottom: "12px" }}>
            Questions{" "}
            <span style={{
              background: "linear-gradient(135deg, #E8002D, #FF1744)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>fréquentes</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "500px", margin: "0 auto" }}>
            Tout ce que vous devez savoir sur rxcorp. Une question non listée ?{" "}
            <a href="/contact" style={{ color: "var(--red-bright)", textDecoration: "none" }}>Contactez-nous</a>.
          </p>
        </div>

        {/* Categories */}
        {FAQS.map(({ category, items }) => (
          <div key={category} style={{ marginBottom: "48px" }}>
            <h2 style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--red-bright)",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <span style={{
                width: "20px", height: "1px",
                background: "var(--red-bright)",
                display: "inline-block",
              }} />
              {category}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {items.map(({ q, a }) => (
                <details
                  key={q}
                  style={{
                    background: "rgba(15,15,23,0.7)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px",
                    padding: "18px 22px",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                >
                  <summary style={{
                    fontWeight: 700,
                    fontSize: "0.97rem",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    userSelect: "none",
                  }}>
                    <span>{q}</span>
                    <span style={{
                      color: "var(--red-bright)",
                      fontSize: "1.4rem",
                      lineHeight: 1,
                      flexShrink: 0,
                      fontWeight: 300,
                    }}>+</span>
                  </summary>
                  <p style={{
                    color: "var(--text-secondary)",
                    marginTop: "12px",
                    lineHeight: 1.75,
                    fontSize: "0.92rem",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    paddingTop: "12px",
                  }}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={{
          textAlign: "center",
          marginTop: "64px",
          padding: "40px",
          background: "rgba(232,0,45,0.05)",
          border: "1px solid rgba(232,0,45,0.15)",
          borderRadius: "20px",
        }}>
          <h3 style={{ fontWeight: 800, marginBottom: "12px", fontSize: "1.2rem" }}>
            Vous n&apos;avez pas trouvé votre réponse ?
          </h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "24px", lineHeight: 1.7 }}>
            Notre équipe support est disponible 24/7 sur Discord.
          </p>
          <a
            href="/contact"
            className="btn-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            Contacter le support
          </a>
        </div>
      </div>
    </div>
  );
}
