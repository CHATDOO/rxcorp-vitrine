"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Tableau de bord", icon: "⊞" },
  { href: "/dashboard/services", label: "Mes services", icon: "⚙" },
  { href: "/dashboard/profile", label: "Mon profil", icon: "◯" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((json: { data?: { user?: { name?: string } } }) => {
        if (json.data?.user?.name) setUserName(json.data.user.name);
      })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  }

  const sidebar = (
    <nav
      style={{
        width: "260px",
        minWidth: "260px",
        height: "100vh",
        background: "var(--bg-card)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        position: "sticky",
        top: 0,
        overflowY: "auto",
      }}
    >
      {/* Logo */}
      <Link
        href="/dashboard"
        style={{ textDecoration: "none", marginBottom: "40px", display: "block" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
              flexShrink: 0,
            }}
          >
            RX
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.1rem",
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              rxcorp
            </div>
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "-2px" }}>
              Panel Client
            </div>
          </div>
        </div>
      </Link>

      {/* Nav items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{ textDecoration: "none" }}
            onClick={() => setSidebarOpen(false)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: isActive(item.href) ? 600 : 500,
                color: isActive(item.href) ? "var(--red-bright)" : "var(--text-secondary)",
                background: isActive(item.href) ? "rgba(232, 0, 45, 0.1)" : "transparent",
                border: isActive(item.href)
                  ? "1px solid rgba(232, 0, 45, 0.25)"
                  : "1px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: "1.1rem", width: "20px", textAlign: "center" }}>
                {item.icon}
              </span>
              {item.label}
            </div>
          </Link>
        ))}
      </div>

      {/* User + logout */}
      <div
        style={{
          paddingTop: "16px",
          borderTop: "1px solid var(--border)",
          marginTop: "16px",
        }}
      >
        {userName && (
          <div
            style={{
              padding: "10px 14px",
              marginBottom: "8px",
              borderRadius: "10px",
              background: "var(--bg-subtle)",
            }}
          >
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "2px" }}>
              Connecté en tant que
            </div>
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {userName}
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 14px",
            borderRadius: "10px",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "var(--text-secondary)",
            background: "transparent",
            border: "1px solid transparent",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--red-bright)";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(232, 0, 45, 0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          <span style={{ fontSize: "1.1rem", width: "20px", textAlign: "center" }}>↩</span>
          Déconnexion
        </button>
      </div>
    </nav>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-void)" }}>
      {/* Desktop sidebar */}
      <div className="dashboard-sidebar-desktop">{sidebar}</div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 40,
          }}
        />
      )}

      {/* Mobile sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : "-280px",
          width: "260px",
          height: "100vh",
          zIndex: 50,
          transition: "left 0.25s ease",
          display: "none",
        }}
        className="dashboard-sidebar-mobile"
      >
        {sidebar}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Mobile header */}
        <header
          className="dashboard-mobile-header"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-card)",
          }}
        >
          <Link
            href="/dashboard"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                background: "var(--red-primary)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "0.75rem",
                color: "#fff",
              }}
            >
              RX
            </div>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                color: "var(--text-primary)",
              }}
            >
              rxcorp
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-primary)",
              padding: "8px 10px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            ☰
          </button>
        </header>

        <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-sidebar-desktop { display: none !important; }
          .dashboard-sidebar-mobile { display: block !important; }
          .dashboard-mobile-header { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
