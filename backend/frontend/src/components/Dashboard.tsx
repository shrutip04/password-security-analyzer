import { useEffect, useState } from "react";
import { fetchProfile } from "../api/user";
import type { UserProfile } from "../api/user";

interface Props {
    token: string;
    onNavigate: (tab: "analyzer" | "generator" | "education") => void;
}

export default function Dashboard({ token, onNavigate }: Props) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile(token)
            .then(setProfile)
            .catch((e) => setError(e.message));
    }, [token]);

    const cards = [
        { key: "analyzer" as const, title: "Analyze a password", desc: "Check strength in real time, entirely in your browser." },
        { key: "generator" as const, title: "Generate a password", desc: "Create a strong random password or memorable passphrase." },
        { key: "education" as const, title: "Learn security basics", desc: "Short, practical tips on passwords, 2FA, and phishing." },
    ];

    return (
        <div style={{ maxWidth: 640, margin: "40px auto", padding: "0 16px" }}>
            <h2>Dashboard</h2>
            {error && <p style={{ color: "#f87171" }}>{error}</p>}
            {profile && (
                <div style={{ background: "#1e293b", borderRadius: 12, padding: 20, marginBottom: 24 }}>
                    <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>Signed in as</p>
                    <p style={{ margin: "4px 0 0", fontSize: 18, fontWeight: 600 }}>{profile.email}</p>
                    <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: 13 }}>
                        Member since {new Date(profile.memberSince).toLocaleDateString()}
                    </p>
                </div>
            )}
            <div style={{ display: "grid", gap: 12 }}>
                {cards.map((c) => (
                    <div
                        key={c.key}
                        onClick={() => onNavigate(c.key)}
                        style={{ background: "#1e293b", borderRadius: 12, padding: 16, cursor: "pointer" }}
                    >
                        <strong>{c.title}</strong>
                        <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: 14 }}>{c.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}