import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions Légales | rxcorp",
    description: "Mentions légales et informations juridiques concernant rxcorp.",
};

export default function MentionsLegalesPage() {
    return (
        <section className="section" style={{ minHeight: "100vh", paddingTop: "140px", background: "var(--bg-dark)" }}>
            <div className="container-md">
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                    <h1 className="heading-lg" style={{ fontSize: "3rem" }}>
                        Mentions <span className="gradient-text">Légales</span>
                    </h1>
                </div>

                <div className="glass" style={{ padding: "40px", borderRadius: "16px", color: "var(--text-primary)", lineHeight: 1.7 }}>
                    <h2>Éditeur du site</h2>
                    <ul style={{ color: "var(--text-secondary)", marginBottom: "30px", listStyle: "none", padding: 0 }}>
                        <li><strong>Dénomination :</strong> rxcorp</li>
                        <li><strong>Forme juridique :</strong> [À remplir - ex: Auto-entreprise / SAS / Association]</li>
                        <li><strong>Siret :</strong> [À remplir]</li>
                        <li><strong>Siège social :</strong> [À remplir]</li>
                        <li><strong>Email :</strong> contact@rxcorp.fr</li>
                    </ul>

                    <h2>Directeur de la publication</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>
                        [Nom du responsable ou de l'entreprise]
                    </p>

                    <h2>Hébergement du site</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>
                        L'infrastructure principale de rxcorp est auto-hébergée.
                        <br />
                        Certains services d'infrastructure frontend peuvent être opérés via Vercel Inc.
                    </p>

                    <h2>Propriété Intellectuelle</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>
                        La structure générale du site `rxcorp.fr`, ainsi que les textes, graphiques, images, sons et vidéos la composant, sont la propriété de l'éditeur ou de ses partenaires. Toute représentation et/ou reproduction et/ou exploitation partielle ou totale des contenus et services proposés par le site `rxcorp.fr`, par quelque procédé que ce soit, sans l'autorisation préalable et par écrit de rxcorp et/ou de ses partenaires est strictement interdite.
                    </p>
                </div>
            </div>
        </section>
    );
}
