"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((json: { data?: { user?: User } }) => {
        setUser(json.data?.user ?? null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="skeleton" style={{ height: "40px", width: "200px", borderRadius: "8px" }} />
        <div className="skeleton" style={{ height: "200px", borderRadius: "16px" }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <h1
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
          letterSpacing: "-0.025em",
          color: "var(--text-primary)",
          marginBottom: "32px",
        }}
      >
        Mon profil
      </h1>

      <div className="glass" style={{ borderRadius: "16px", padding: "32px" }}>
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "var(--red-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            fontWeight: 900,
            color: "#fff",
            marginBottom: "24px",
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase() ?? "?"}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {[
            { label: "Nom", value: user?.name },
            { label: "Email", value: user?.email },
            { label: "Rôle", value: user?.role === "ADMIN" ? "Administrateur" : "Client" },
            { label: "ID", value: user?.id, mono: true },
          ].map(({ label, value, mono }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                paddingBottom: "20px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: mono ? "0.8rem" : "0.95rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  fontFamily: mono ? "monospace" : "inherit",
                  wordBreak: "break-all",
                }}
              >
                {value ?? "—"}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "24px",
            padding: "14px 16px",
            borderRadius: "10px",
            background: "var(--bg-subtle)",
            border: "1px solid var(--border)",
            fontSize: "0.825rem",
            color: "var(--text-muted)",
          }}
        >
          Pour modifier vos informations ou votre mot de passe, contactez le support RXCORP.
        </div>
      </div>
    </div>
  );
}
