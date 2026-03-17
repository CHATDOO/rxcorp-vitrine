"use client";
import Link from "next/link";
import { Gamepad2, CheckCircle2 } from "lucide-react";
import type { Product, Category } from "@/lib/paymenter";

const GAMES_LIST = [
    { name: "Minecraft", emoji: "⛏️" },
    { name: "Rust", emoji: "🏚️" },
    { name: "ARK", emoji: "🦖" },
    { name: "CS2", emoji: "🔫" },
    { name: "Valheim", emoji: "⚔️" },
    { name: "Terraria", emoji: "🌿" },
    { name: "Palworld", emoji: "🌟" },
    { name: "FiveM", emoji: "🚗" },
    { name: "GTA:MP", emoji: "🎮" },
    { name: "7 Days", emoji: "🧟" },
];

export function GamesJeuxInteractive({ products, categories }: { products: Product[], categories: Category[] }) {
    const getEmojiForCategory = (name: string) => {
        const found = GAMES_LIST.find(g => name.toLowerCase().includes(g.name.toLowerCase()));
        return found ? found.emoji : "🎮";
    };
    return (
        <>
            {/* Jeux grid — hover interactif */}
            <section className="section-sm" style={{ background: "var(--bg-dark)" }}>
                <div className="container-xl">
                    <h2 className="heading-md" style={{ textAlign: "center", marginBottom: "40px" }}>
                        Jeux <span className="gradient-text">supportés</span>
                    </h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="glass"
                                style={{
                                    display: "flex", alignItems: "center", gap: "10px",
                                    padding: "14px 20px", borderRadius: "12px",
                                    fontSize: "0.92rem", fontWeight: 600,
                                    transition: "border-color 0.2s, transform 0.2s",
                                    cursor: "default",
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.borderColor = "rgba(232,0,45,0.4)";
                                    el.style.transform = "translateY(-3px)";
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.borderColor = "var(--glass-border)";
                                    el.style.transform = "translateY(0)";
                                }}
                            >
                                <span style={{ fontSize: "1.4rem" }}>{getEmojiForCategory(cat.name)}</span> {cat.name}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section className="section" style={{ background: "var(--bg-void)" }}>
                <div className="container-xl">
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <h2 className="heading-md">Offres <span className="gradient-text">Serveurs de Jeux</span></h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                        {products.map(p => (
                            <div key={p.id} className={`pricing-card${p.is_featured ? " featured" : ""}`}>
                                {p.is_featured && <div className="badge badge-red" style={{ marginBottom: "12px" }}>⭐ Populaire</div>}
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                    <Gamepad2 size={18} color="var(--red-bright)" />
                                    <h3 style={{ fontFamily: "Outfit, sans-serif", fontWeight: 800, fontSize: "1.2rem" }}>{p.name}</h3>
                                </div>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "20px", minHeight: "40px" }}>
                                    {p.description}
                                </p>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "20px" }}>
                                    <span className="gradient-text-red" style={{ fontFamily: "Outfit, sans-serif", fontWeight: 900, fontSize: "2.2rem" }}>
                                        {p.price.toFixed(2).replace(".", ",")}€
                                    </span>
                                    <span style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>/mois</span>
                                </div>
                                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {["Anti-DDoS inclus", "Panel Pterodactyl", "Support 24/7"].map(f => (
                                        <li key={f} style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "0.84rem", color: "var(--text-secondary)" }}>
                                            <CheckCircle2 size={13} color="var(--red-bright)" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="https://clients.rxcorp.fr/store"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={p.is_featured ? "btn-primary" : "btn-ghost"}
                                    style={{ width: "100%", justifyContent: "center", display: "flex" }}
                                    id={`game-order-${p.id}`}
                                >
                                    Commander
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
