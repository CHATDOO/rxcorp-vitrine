"use client";

import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
    return (
        <section className="section" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-void)" }}>
            <div className="container-md" style={{ textAlign: "center" }}>
                <div style={{
                    width: "100px", height: "100px",
                    background: "rgba(232,0,45,0.1)",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 30px",
                    boxShadow: "0 0 60px rgba(232,0,45,0.2)"
                }}>
                    <AlertTriangle size={48} color="var(--red-bright)" />
                </div>

                <h1 className="heading-lg" style={{ fontSize: "5rem", marginBottom: "10px", lineHeight: 1 }}>
                    <span className="gradient-text-red">404</span>
                </h1>

                <h2 className="heading-md" style={{ marginBottom: "20px" }}>
                    Service Introuvable
                </h2>

                <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto 40px" }}>
                    Oups ! La page ou le serveur que vous cherchez n'existe pas ou a été déplacé.
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
                    <button onClick={() => window.history.back()} className="btn-ghost">
                        Retour arrière
                    </button>
                    <Link href="/" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Home size={18} /> Retour à l'accueil
                    </Link>
                </div>
            </div>
        </section>
    );
}
