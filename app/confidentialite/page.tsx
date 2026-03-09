import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Politique de Confidentialité | rxcorp",
    description: "Comment rxcorp protège et gère vos données personnelles.",
};

export default function ConfidentialitePage() {
    return (
        <section className="section" style={{ minHeight: "100vh", paddingTop: "140px", background: "var(--bg-dark)" }}>
            <div className="container-md">
                <div style={{ textAlign: "center", marginBottom: "60px" }}>
                    <h1 className="heading-lg" style={{ fontSize: "3rem" }}>
                        Politique de <span className="gradient-text">Confidentialité</span>
                    </h1>
                </div>

                <div className="glass" style={{ padding: "40px", borderRadius: "16px", color: "var(--text-primary)", lineHeight: 1.7 }}>
                    <h2>1. Collecte des données personnelles</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                        Dans le cadre de l'utilisation de nos services (création de compte, commande), rxcorp est amené à collecter et traiter des données à caractère personnel vous concernant (nom, prénom, adresse e-mail, adresse IP).
                    </p>

                    <h2>2. Utilisation de vos données</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                        Vos données sont exclusivement utilisées pour :
                        <ul className="list-styled">
                            <li>La fourniture et la gestion de vos services (serveurs).</li>
                            <li>La facturation et le suivi comptable.</li>
                            <li>Le support technique et la résolution de problèmes.</li>
                            <li>L'envoi d'e-mails de service critiques (expirations, pannes).</li>
                        </ul>
                    </p>

                    <h2>3. Cookies</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                        Notre site (ainsi que notre panel client Paymenter) utilise des cookies techniques strictement nécessaires au fonctionnement du site (maintien de session, sécurité anti-CSRF). Nous utilisons également des cookies analytiques anonymisés pour mesurer notre audience et améliorer nos services.
                    </p>

                    <h2>4. Protection et conservation</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                        rxcorp met en œuvre toutes les mesures techniques pour garantir la sécurité de vos données. Celles-ci sont conservées pendant la durée de votre relation contractuelle et jusqu'à 3 ans après la fin de celle-ci, conformément à la loi.
                    </p>

                    <h2>5. Vos droits (RGPD)</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "24px" }}>
                        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données. Pour exercer ce droit, vous pouvez ouvrir un ticket depuis votre panel client ou nous contacter à contact@rxcorp.fr.
                    </p>
                </div>
            </div>
        </section>
    );
}
