"use client";
import Link from "next/link";
import {
    CheckCircle2, Star, Gamepad2, ArrowRight, Server,
    Shield, Zap, Clock,
} from "lucide-react";
import type { Product } from "@/lib/paymenter";

/* 
  IMPORTANT: All icon references and interactive data are defined CLIENT-SIDE
  to avoid passing non-serializable objects as props from Server Components.
*/

// ─── Feature Grid ───────────────────────────────────────────────────────────
const FEATURES_DATA = [
    { icon: Shield, title: "Anti-DDoS Avancé", desc: "Protection jusqu'à 1 Tbps incluse, sans surcoût." },
    { icon: Zap, title: "NVMe Gen4 Ultra-Rapide", desc: "Vitesses de lecture atteignant 7 000 MB/s." },
    { icon: Clock, title: "Déploiement < 60s", desc: "Votre serveur est actif en moins d'une minute." },
    { icon: Server, title: "Réseau 10 Gbps", desc: "Bande passante dédiée, datacenter Paris." },
    { icon: CheckCircle2, title: "SLA 99.9% Uptime", desc: "Engagement contractuel sur la disponibilité." },
    { icon: Star, title: "Support 24/7", desc: "Ticket & Discord, réponse moyenne < 30 min." },
];

export function FeaturesGrid() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {FEATURES_DATA.map(({ icon: Icon, title, desc }) => (
                <div
                    key={title}
                    className="glass"
                    style={{
                        borderRadius: "16px", padding: "28px",
                        display: "flex", gap: "16px",
                        transition: "border-color 0.3s, transform 0.3s",
                    }}
                    onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(232,0,45,0.3)";
                        el.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(255,255,255,0.08)";
                        el.style.transform = "translateY(0)";
                    }}
                >
                    <div style={{
                        width: "48px", height: "48px",
                        background: "rgba(232,0,45,0.1)",
                        border: "1px solid rgba(232,0,45,0.2)",
                        borderRadius: "12px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                    }}>
                        <Icon size={22} color="var(--red-bright)" />
                    </div>
                    <div>
                        <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "6px" }}>{title}</h3>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6 }}>{desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Pricing Card ─────────────────────────────────────────────────────────────
export function PricingCard({ product, featured }: { product: Product; featured?: boolean }) {
    const price = product.price.toFixed(2).replace(".", ",");
    return (
        <div className={`pricing-card${featured ? " featured" : ""}`} style={{ position: "relative" }}>
            {featured && (
                <div style={{
                    position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                    background: "var(--red-primary)",
                    color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: "4px 16px",
                    borderRadius: "99px", whiteSpace: "nowrap",
                    boxShadow: "0 4px 20px rgba(232,0,45,0.5)",
                    textTransform: "uppercase", letterSpacing: "0.06em",
                }}>
                    ⭐ Populaire
                </div>
            )}
            <div style={{ marginBottom: "8px" }}>
                <span className="badge badge-gray">{product.billing_cycle === "monthly" ? "Mensuel" : "Annuel"}</span>
            </div>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.4rem", marginTop: "12px", marginBottom: "4px" }}>
                {product.name}
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", minHeight: "42px", lineHeight: 1.6 }}>
                {product.description}
            </p>
            <div style={{ margin: "24px 0", display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span className="gradient-text-red" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "2.8rem" }}>
                    {price}€
                </span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>/mois HT</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Anti-DDoS inclus", "NVMe SSD", "Support 24/7", "Panel Pterodactyl", "IPv4 dédié"].map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                        <CheckCircle2 size={14} color="var(--red-bright)" style={{ flexShrink: 0 }} /> {f}
                    </li>
                ))}
            </ul>
            <a
                href="https://clients.rxcorp.fr/store"
                target="_blank"
                rel="noopener noreferrer"
                className={featured ? "btn-primary" : "btn-ghost"}
                style={{ width: "100%", justifyContent: "center", display: "flex" }}
                id={`order-btn-${product.id}`}
            >
                Commander maintenant
            </a>
        </div>
    );
}

// ─── Product Grid ─────────────────────────────────────────────────────────────
export function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", alignItems: "start" }}>
            {products.map(product => (
                <PricingCard key={product.id} product={product} featured={!!product.is_featured} />
            ))}
        </div>
    );
}

// ─── Games Grid ───────────────────────────────────────────────────────────────
const GAMES_DATA = [
    { name: "Minecraft", emoji: "⛏️" },
    { name: "Rust", emoji: "🏚️" },
    { name: "ARK", emoji: "🦖" },
    { name: "CS2", emoji: "🔫" },
    { name: "Valheim", emoji: "⚔️" },
    { name: "Terraria", emoji: "🌿" },
    { name: "Palworld", emoji: "🌟" },
    { name: "FiveM", emoji: "🚗" },
];

export function GamesGrid() {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
            {GAMES_DATA.map(({ name, emoji }) => (
                <Link
                    key={name}
                    href="/serveurs-jeux"
                    style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "12px 20px",
                        background: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                        borderRadius: "12px",
                        textDecoration: "none",
                        color: "var(--text-primary)",
                        fontSize: "0.9rem", fontWeight: 600,
                        transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "rgba(232,0,45,0.4)";
                        el.style.background = "rgba(232,0,45,0.05)";
                        el.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.borderColor = "var(--glass-border)";
                        el.style.background = "var(--glass-bg)";
                        el.style.transform = "translateY(0)";
                    }}
                >
                    <span style={{ fontSize: "1.3rem" }}>{emoji}</span>
                    {name}
                </Link>
            ))}
        </div>
    );
}


// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
    { name: "Alexandre M.", role: "Owner MineRealm", stars: 5, text: "Serveur ultra fluide, jamais un lag. Le support est réactif en moins de 20 minutes. Je recommande sans hésiter." },
    { name: "Sarah K.", role: "Admin Serveur Palworld", stars: 5, text: "Mon serveur fonctionne à merveille sans aucun lag pour plus de 20 joueurs. C'est le jour et la nuit côté fluidité." },
    { name: "Théo B.", role: "Streamer FiveM", stars: 5, text: "Anti-DDoS efficace même sur les attaques massives. Mon serveur FiveM n'a jamais planté depuis 8 mois." },
];

export function Testimonials() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {TESTIMONIALS.map(({ name, role, stars, text }) => (
                <div key={name} className="glass" style={{ borderRadius: "20px", padding: "28px" }}>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                        {Array.from({ length: stars }).map((_, i) => (
                            <Star key={i} size={14} color="#FFD700" fill="#FFD700" />
                        ))}
                    </div>
                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px", fontSize: "0.92rem" }}>
                        &ldquo;{text}&rdquo;
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                            width: "40px", height: "40px",
                            background: "var(--red-primary)", borderRadius: "50%",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 800, fontSize: "1rem", color: "#fff",
                        }}>
                            {name[0]}
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{name}</div>
                            <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{role}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── View All Button ──────────────────────────────────────────────────────────
export function ViewAllBtn() {
    return (
        <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="https://clients.rxcorp.fr/store" target="_blank" rel="noopener noreferrer" className="btn-ghost" id="view-all-btn">
                Voir toutes nos offres <ArrowRight size={16} />
            </a>
        </div>
    );
}
