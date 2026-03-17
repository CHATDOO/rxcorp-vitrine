import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getProducts, getCategories, type Product, type Category } from "@/lib/paymenter";
import { GamesJeuxInteractive } from "@/components/ServeurJeuxInteractive";

export const metadata: Metadata = {
    title: "Serveurs de Jeux | Minecraft, Rust, ARK et plus | rxcorp",
    description:
        "Serveurs de jeux haute performance : Minecraft, Rust, ARK, CS2, Valheim... Anti-DDoS, déploiement < 60s, panel Pterodactyl.",
};

const FALLBACK_GAMES: Product[] = [
    { id: 20, name: "Game Nano", price: 2.99, currency: "EUR", category_id: 1, description: "2 vCPU, 2 Go RAM — petits serveurs", billing_cycle: "monthly" },
    { id: 21, name: "Game Starter", price: 4.99, currency: "EUR", category_id: 1, description: "4 vCPU, 4 Go RAM — jusqu'à 20 joueurs", billing_cycle: "monthly" },
    { id: 22, name: "Game Pro", price: 9.99, currency: "EUR", category_id: 1, description: "6 vCPU, 8 Go RAM — jusqu'à 50 joueurs", billing_cycle: "monthly", is_featured: true },
    { id: 23, name: "Game Elite", price: 19.99, currency: "EUR", category_id: 1, description: "8 vCPU, 16 Go RAM — serveurs exigeants", billing_cycle: "monthly" },
];

const FALLBACK_CATEGORIES: Category[] = [
    { id: 1, name: "Minecraft", slug: "minecraft", description: "Serveurs Minecraft" },
    { id: 2, name: "Rust", slug: "rust", description: "Serveurs Rust" },
    { id: 3, name: "ARK", slug: "ark", description: "Serveurs ARK" },
    { id: 4, name: "Palworld", slug: "palworld", description: "Serveurs Palworld" },
];

export default async function ServeursJeuxPage() {
    const products = await getProducts().catch(() => FALLBACK_GAMES);
    const fetchedCategories = await getCategories().catch(() => FALLBACK_CATEGORIES);

    const gameProducts = products.filter(p => true); // S'il crée des produits, on veut les voir même si ce n'est pas category_id=1
    const displayProducts = gameProducts.length > 0 ? gameProducts : FALLBACK_GAMES;
    const displayCategories = fetchedCategories.length > 0 ? fetchedCategories : FALLBACK_CATEGORIES;

    return (
        <>
            {/* Hero — aucun event handler ici */}
            <section style={{
                background: "var(--bg-void)", paddingTop: "140px", paddingBottom: "80px",
                position: "relative", overflow: "hidden",
            }}>
                <div className="grid-bg" />
                <div className="orb orb-red" style={{ width: "800px", height: "800px", top: "-300px", left: "-300px", opacity: 0.25 }} />
                <div className="container-xl" style={{ position: "relative", zIndex: 1 }}>
                    <div className="badge badge-gold" style={{ marginBottom: "16px" }}>🎮 Serveurs de Jeux</div>
                    <h1 className="heading-xl" style={{ maxWidth: "700px", marginBottom: "16px" }}>
                        Vos jeux, à la{" "}
                        <span className="gradient-text">vitesse de la lumière</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "520px", lineHeight: 1.7, marginBottom: "36px" }}>
                        Panel Pterodactyl inclus, installation en 1 clic, Anti-DDoS intégré.
                        Jouez sans lag, sans stress.
                    </p>
                    <a href="https://clients.rxcorp.fr/store" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "16px 36px" }}>
                        Déployer mon serveur <ArrowRight size={18} />
                    </a>
                </div>
            </section>

            {/* Jeux interactifs + pricing — Client Component */}
            <GamesJeuxInteractive products={displayProducts} categories={displayCategories} />
        </>
    );
}
