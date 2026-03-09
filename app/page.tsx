import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, ChevronRight,
} from "lucide-react";
import { getProducts, getOrders, type Product } from "@/lib/paymenter";
import {
  FeaturesGrid, ProductGrid, GamesGrid, Testimonials, ViewAllBtn
} from "@/components/HomeInteractive";

export const metadata: Metadata = {
  title: "rxcorp — Hébergement Haute Performance | Jeux, Web, Dédié",
  description:
    "Hébergement de serveurs de jeux ultra-performants avec offre gratuite d'une semaine. Anti-DDoS inclus, déploiement < 60 secondes. Depuis la France 🇫🇷",
};

// Fallback products shown if API unavailable
const FALLBACK_PRODUCTS: Product[] = [
  { id: 1, name: "Game Starter", description: "Parfait pour débuter sur Minecraft ou Rust.", price: 4.99, currency: "EUR", category_id: 1, billing_cycle: "monthly" },
  { id: 2, name: "Serveur Gratuit", description: "Serveur gratuit pendant 1 semaine. Activable 1 fois par client.", price: 0.00, currency: "EUR", category_id: 1, billing_cycle: "monthly", is_featured: true },
  { id: 3, name: "Game Pro", description: "Serveur haute perf pour 30+ joueurs simultanés.", price: 9.99, currency: "EUR", category_id: 1, billing_cycle: "monthly" },
];


function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-block">
      <div className="stat-number">{value}</div>
      <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "6px" }}>{label}</div>
    </div>
  );
}

export default async function HomePage() {
  const [products, orders] = await Promise.allSettled([
    getProducts(),
    getOrders(),
  ]);

  const allProducts = products.status === "fulfilled" ? products.value : FALLBACK_PRODUCTS;
  const totalOrders = orders.status === "fulfilled" ? orders.value.total : 1847;

  const featured = allProducts.filter(p => p.is_featured).slice(0, 3);
  const displayProducts = featured.length >= 3 ? featured : allProducts.slice(0, 6);

  return (
    <>
      {/* ===== HERO ===== */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--bg-void)",
      }}>
        <div className="grid-bg" />
        <div className="noise-bg" />

        <div className="orb orb-red animate-float" style={{
          width: "700px", height: "700px",
          top: "-200px", left: "-200px", opacity: 0.6,
        }} />
        <div className="orb orb-red animate-float" style={{
          width: "500px", height: "500px",
          bottom: "-100px", right: "-100px",
          opacity: 0.3,
          animationDelay: "-3s",
        }} />

        <div style={{
          position: "absolute", left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, transparent, rgba(232,0,45,0.4), transparent)",
          animation: "scan-line 8s linear infinite",
          pointerEvents: "none",
        }} />

        <div className="container-xl" style={{ position: "relative", zIndex: 1, paddingTop: "140px", paddingBottom: "100px" }}>
          <a
            href="https://clients.rxcorp.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "6px 16px 6px 8px",
              background: "rgba(232,0,45,0.08)",
              border: "1px solid rgba(232,0,45,0.25)",
              borderRadius: "99px",
              fontSize: "0.82rem",
              color: "var(--text-secondary)",
              textDecoration: "none",
              marginBottom: "32px",
            }}
          >
            <span className="badge badge-red" style={{ padding: "2px 8px" }}>Nouveau</span>
            Serveurs dédiés Ryzen 9000 disponibles
            <ChevronRight size={14} />
          </a>

          <h1 className="heading-xl" style={{ maxWidth: "800px", marginBottom: "24px" }}>
            L&apos;hébergement{" "}
            <span className="gradient-text">premium</span>
            <br />
            sans compromis. 🔥
          </h1>

          <p style={{
            color: "var(--text-secondary)",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.7,
            maxWidth: "560px",
            marginBottom: "40px",
          }}>
            Serveurs de jeux très haute performance.
            Démarrez avec une <span style={{ color: "var(--red-bright)", fontWeight: 600 }}>semaine gratuite</span>, puis scalez à l'infini.
            Anti-DDoS inclus, déploiement immédiat.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "64px" }}>
            <a
              href="https://clients.rxcorp.fr/store"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "1rem", padding: "16px 36px" }}
              id="hero-cta-primary"
            >
              Déployer mon serveur <ArrowRight size={18} />
            </a>
            <Link href="/serveurs-jeux" className="btn-ghost" style={{ fontSize: "1rem", padding: "16px 36px" }} id="hero-cta-jeux">
              Voir les serveurs jeux
            </Link>
          </div>

          {/* Terminal mockup — no event handlers */}
          <div className="terminal animate-float" style={{ maxWidth: "520px" }}>
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: "#FF5F57" }} />
              <div className="terminal-dot" style={{ background: "#FEBC2E" }} />
              <div className="terminal-dot" style={{ background: "#28C840" }} />
              <span style={{ marginLeft: "8px", color: "var(--text-muted)", fontSize: "0.78rem" }}>rxcorp-deploy</span>
            </div>
            <div style={{ padding: "20px" }}>
              <div style={{ color: "#00E676", marginBottom: "6px" }}>
                <span style={{ color: "var(--text-muted)" }}>$ </span>rxcorp deploy --type=minecraft --plan=pro
              </div>
              <div style={{ color: "var(--text-muted)", marginBottom: "4px" }}>⠿ Allocation des ressources...</div>
              <div style={{ color: "var(--text-muted)", marginBottom: "4px" }}>⠿ Installation de Minecraft 1.20.4...</div>
              <div style={{ color: "var(--text-muted)", marginBottom: "4px" }}>⠿ Configuration Anti-DDoS...</div>
              <div style={{ color: "#00E676", marginBottom: "4px" }}>✓ Serveur déployé en 47 secondes !</div>
              <div style={{ color: "var(--red-bright)" }}>
                → IP : 51.195.XXX.XXX:25565 <span className="animate-blink">_</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-red" />

      {/* ===== STATS ===== */}
      <section className="section-sm" style={{ background: "var(--bg-dark)" }}>
        <div className="container-xl">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <StatBlock value={`${totalOrders.toLocaleString("fr-FR")}+`} label="Serveurs déployés" />
            <StatBlock value="99.9%" label="Uptime garanti" />
            <StatBlock value="< 60s" label="Délai de déploiement" />
            <StatBlock value="24/7" label="Support disponible" />
          </div>
        </div>
      </section>

      <div className="divider-red" />

      {/* ===== FEATURES ===== */}
      <section className="section" style={{ background: "var(--bg-void)" }}>
        <div className="container-xl">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="badge badge-red" style={{ marginBottom: "16px" }}>Infrastructure</div>
            <h2 className="heading-lg" style={{ marginBottom: "16px" }}>
              Conçu pour les{" "}
              <span className="gradient-text">performances extrêmes</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7 }}>
              Chaque serveur rxcorp est optimisé de A à Z pour offrir les meilleures performances du marché.
            </p>
          </div>

          <FeaturesGrid />
        </div>
      </section>

      {/* ===== PRODUITS / PRICING ===== */}
      <section className="section" style={{ background: "var(--bg-dark)" }}>
        <div className="container-xl">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="badge badge-red" style={{ marginBottom: "16px" }}>Nos offres</div>
            <h2 className="heading-lg" style={{ marginBottom: "16px" }}>
              Des prix <span className="gradient-text">transparents</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto 48px", lineHeight: 1.7 }}>
              Synchronisés en temps réel depuis notre boutique. Pas de frais cachés.
            </p>
          </div>

          <ProductGrid products={displayProducts} />
          <ViewAllBtn />
        </div>
      </section>

      {/* ===== JEUX SUPPORTÉS ===== */}
      <section className="section-sm" style={{ background: "var(--bg-void)" }}>
        <div className="container-xl">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="badge badge-gold" style={{ marginBottom: "16px" }}>🎮 Serveurs de Jeux</div>
            <h2 className="heading-md">
              Vos jeux favoris, déployés{" "}
              <span className="gradient-text">instantanément</span>
            </h2>
          </div>
          <GamesGrid />
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" style={{ background: "var(--bg-dark)" }}>
        <div className="container-xl">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div className="badge badge-green" style={{ marginBottom: "16px" }}>Avis vérifiés</div>
            <h2 className="heading-lg">
              Ils nous font <span className="gradient-text">confiance</span>
            </h2>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section" style={{
        background: "linear-gradient(135deg, rgba(139,0,0,0.2), rgba(232,0,45,0.08))",
        borderTop: "1px solid rgba(232,0,45,0.15)",
        borderBottom: "1px solid rgba(232,0,45,0.15)",
        textAlign: "center",
      }}>
        <div className="container-xl" style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div className="badge badge-red" style={{ marginBottom: "20px" }}>
            🔥 Offre de lancement
          </div>
          <h2 className="heading-lg" style={{ marginBottom: "20px" }}>
            Premiere commande ?{" "}
            <span className="gradient-text">Profitez -20%</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "36px", fontSize: "1.05rem" }}>
            Utilisez le code{" "}
            <strong style={{ color: "var(--red-bright)", fontFamily: "monospace" }}>RXSTART20</strong>{" "}
            lors de votre inscription. Annulation possible à tout moment.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://clients.rxcorp.fr/register"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: "1rem", padding: "16px 40px" }}
              id="final-cta-btn"
            >
              Créer mon compte gratuitement <ArrowRight size={18} />
            </a>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: "16px" }}>
            Sans carte bancaire • Déploiement immédiat • Support 24/7
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .terminal { display: none; }
        }
      `}</style>
    </>
  );
}
