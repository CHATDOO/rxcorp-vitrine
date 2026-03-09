import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Conditions Générales de Vente | rxcorp",
    description: "Conditions Generales de Vente des services d'hébergement rxcorp.",
};

export default function CGVPage() {
    return (
        <section className="section" style={{ minHeight: "100vh", paddingTop: "140px", background: "var(--bg-dark)" }}>
            <div className="container-md">
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                    <h1 className="heading-lg" style={{ fontSize: "3rem" }}>
                        Conditions Générales <span className="gradient-text">de Vente</span>
                    </h1>
                    <p style={{ color: "var(--text-secondary)", marginTop: "16px" }}>
                        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                    </p>
                </div>

                <div className="glass" style={{ padding: "40px", borderRadius: "16px", color: "var(--text-primary)", lineHeight: 1.7 }}>
                    <h2>1. Objet</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                        Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des relations entre rxcorp et ses clients pour la souscription aux services d'hébergement.
                    </p>

                    <h2>2. Services Proposés</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                        rxcorp propose des prestations d'hébergement de serveurs de jeux, d'hébergement web et de serveurs dédiés. Les caractéristiques de chaque offre sont détaillées sur notre site.
                    </p>

                    <h2>3. Tarifs et Paiement</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                        Nos tarifs sont exprimés en euros TTC. Le paiement s'effectue comptant lors de la commande. Les services sont facturés par abonnement récurrent sauf mention contraire.
                    </p>

                    <h2>4. Rétractation et Remboursement</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                        Conformément à la législation en vigueur relative aux biens immatériels et services d'hébergement dont l'exécution a commencé avec l'accord du consommateur, le droit de rétractation ne s'applique pas une fois le serveur livré.
                    </p>

                    <h2>5. Responsabilité du Client</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                        Le client est le seul responsable des données hébergées sur ses serveurs et de l'utilisation qu'il fait des services rxcorp. Toute utilisation frauduleuse (DDoS, SPAM, Phishing) entraînera la suspension immédiate du service sans remboursement.
                    </p>

                    <div style={{ marginTop: "40px", paddingTop: "30px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                            Pour toute question concernant nos CGV, veuillez nous contacter via la section <a href="/contact" style={{ color: "var(--red-bright)", textDecoration: "none" }}>Contact</a>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
