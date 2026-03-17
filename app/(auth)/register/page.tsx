"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await res.json() as { data?: unknown; error?: string };

      if (!res.ok) {
        setError(json.error ?? "Erreur lors de l'inscription");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Erreur réseau, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-void)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
      }}
    >
      <div className="grid-bg" />
      <div className="orb orb-red" style={{ width: 500, height: 500, top: -100, right: -100, opacity: 0.4 }} />

      <div
        className="glass"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          padding: "48px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                background: "var(--red-primary)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "1rem",
                color: "#fff",
              }}
            >
              RX
            </div>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.4rem",
                letterSpacing: "-0.02em",
              }}
            >
              rxcorp
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "var(--text-primary)",
              marginBottom: "8px",
            }}
          >
            Créer un compte
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
            Rejoignez rxcorp et gérez vos serveurs
          </p>
        </div>

        {error && (
          <div
            className="glass-red"
            style={{
              borderRadius: "10px",
              padding: "12px 16px",
              marginBottom: "24px",
              fontSize: "0.875rem",
              color: "var(--red-bright)",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              htmlFor="name"
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Nom complet
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jean Dupont"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--text-primary)",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--red-primary)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.fr"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--text-primary)",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--red-primary)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8 caractères minimum"
              required
              minLength={8}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--bg-subtle)",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                color: "var(--text-primary)",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--red-primary)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: "8px",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Création en cours..." : "Créer mon compte"}
          </button>
        </form>

        <div
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            textAlign: "center",
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
          }}
        >
          Déjà un compte ?{" "}
          <Link
            href="/login"
            style={{ color: "var(--red-bright)", fontWeight: 600, textDecoration: "none" }}
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
