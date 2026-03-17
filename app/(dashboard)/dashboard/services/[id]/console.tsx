"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type ConsoleProps = {
  serviceId: string;
};

type WsTokenResponse = {
  data?: {
    wingsUuid: string;
    wsUrl: string;
    token: string;
  };
  error?: string;
};

export default function ServerConsole({ serviceId }: ConsoleProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [command, setCommand] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const wsRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const appendLine = useCallback((line: string) => {
    setLines((prev) => [...prev.slice(-500), line]);
  }, []);

  useEffect(() => {
    let ws: WebSocket | null = null;

    async function connect() {
      try {
        const res = await fetch(`/api/dashboard/services/${serviceId}/ws-token`);
        const json = (await res.json()) as WsTokenResponse;

        if (!res.ok || !json.data) {
          setError(json.error ?? "Impossible d'obtenir le token WebSocket");
          return;
        }

        const { wsUrl, token } = json.data;
        const fullUrl = `${wsUrl}?token=${encodeURIComponent(token)}`;

        ws = new WebSocket(fullUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          setConnected(true);
          setError("");
          appendLine("[ Console connectée ]");
        };

        ws.onmessage = (ev) => {
          try {
            const msg = JSON.parse(ev.data as string) as {
              event?: string;
              args?: string[];
            };
            if (msg.event === "console output" && msg.args) {
              for (const line of msg.args) {
                appendLine(line);
              }
            } else if (msg.event === "status") {
              appendLine(`[ Statut: ${msg.args?.[0] ?? "inconnu"} ]`);
            }
          } catch {
            if (typeof ev.data === "string") appendLine(ev.data);
          }
        };

        ws.onclose = () => {
          setConnected(false);
          appendLine("[ Console déconnectée ]");
        };

        ws.onerror = () => {
          setConnected(false);
          setError("Erreur de connexion WebSocket");
        };
      } catch {
        setError("Erreur lors de la connexion à la console");
      }
    }

    void connect();

    return () => {
      if (ws) ws.close();
    };
  }, [serviceId, appendLine]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function sendCommand() {
    const cmd = command.trim();
    if (!cmd || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(
      JSON.stringify({ event: "send command", args: [cmd] })
    );
    appendLine(`> ${cmd}`);
    setCommand("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") sendCommand();
  }

  return (
    <div
      className="terminal"
      style={{ borderRadius: "12px", overflow: "hidden" }}
    >
      {/* Terminal header */}
      <div className="terminal-header" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div className="terminal-dot" style={{ background: "#FF5F57" }} />
          <div className="terminal-dot" style={{ background: "#FFBD2E" }} />
          <div className="terminal-dot" style={{ background: "#28CA40" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: connected ? "#00E676" : "#FF1744",
              boxShadow: connected ? "0 0 6px #00E676" : "0 0 6px #FF1744",
            }}
          />
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {connected ? "Connecté" : "Déconnecté"}
          </span>
        </div>
      </div>

      {/* Output */}
      <div
        style={{
          height: "320px",
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {error && (
          <div style={{ color: "var(--red-bright)", fontSize: "0.8rem", marginBottom: "8px" }}>
            {error}
          </div>
        )}
        {lines.length === 0 && !error && (
          <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            En attente de connexion...
          </div>
        )}
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: "0.8rem",
              color: line.startsWith(">")
                ? "var(--red-bright)"
                : line.startsWith("[")
                ? "#FFD700"
                : "var(--text-secondary)",
              lineHeight: "1.5",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "10px 16px",
          display: "flex",
          gap: "8px",
          background: "var(--bg-card)",
        }}
      >
        <span style={{ color: "var(--red-bright)", fontSize: "0.85rem", fontFamily: "monospace" }}>
          &gt;
        </span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={connected ? "Entrer une commande..." : "Console déconnectée"}
          disabled={!connected}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-primary)",
            fontSize: "0.85rem",
            fontFamily: "monospace",
          }}
        />
        <button
          onClick={sendCommand}
          disabled={!connected || !command.trim()}
          style={{
            padding: "4px 12px",
            borderRadius: "6px",
            background: "var(--red-primary)",
            border: "none",
            color: "#fff",
            fontSize: "0.78rem",
            fontWeight: 600,
            cursor: !connected || !command.trim() ? "not-allowed" : "pointer",
            opacity: !connected || !command.trim() ? 0.4 : 1,
            transition: "opacity 0.15s",
          }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
