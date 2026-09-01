import { useState } from "react";
import AuthForm from "./components/AuthForm";
import PasswordAnalyzer from "./components/PasswordAnalyzer";
import PasswordGenerator from "./components/PasswordGenerator";
import SecurityEducation from "./components/SecurityEducation";

type Tab = "analyzer" | "generator" | "education";

export default function App() {
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [tab, setTab] = useState<Tab>("analyzer");

    if (!token) {
        return <AuthForm onAuth={(t, e) => { setToken(t); setEmail(e); }} />;
    }

    const tabs: { key: Tab; label: string }[] = [
        { key: "analyzer", label: "Analyzer" },
        { key: "generator", label: "Generator" },
        { key: "education", label: "Learn" },
    ];

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16 }}>
                <div style={{ display: "flex", gap: 8 }}>
                    {tabs.map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            style={{ padding: "8px 16px", background: tab === t.key ? "#6366f1" : "#334155" }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                <div style={{ color: "#94a3b8", fontSize: 14 }}>
                    Logged in as <strong style={{ color: "#e2e8f0" }}>{email}</strong>{" "}
                    <button onClick={() => setToken(null)} style={{ marginLeft: 8, padding: "6px 12px", fontSize: 13 }}>
                        Logout
                    </button>
                </div>
            </div>
            {tab === "analyzer" && <PasswordAnalyzer />}
            {tab === "generator" && <PasswordGenerator />}
            {tab === "education" && <SecurityEducation token={token} />}
        </div>
    );
}