import { useEffect, useState } from "react";
import { fetchTopics } from "../api/topics";
import type { SecurityTopic } from "../api/topics";

interface Props {
    token: string;
}

export default function SecurityEducation({ token }: Props) {
    const [topics, setTopics] = useState<SecurityTopic[]>([]);
    const [expanded, setExpanded] = useState<number | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTopics(token)
            .then(setTopics)
            .catch((e) => setError(e.message));
    }, [token]);

    return (
        <div style={{ maxWidth: 640, margin: "40px auto", padding: "0 16px" }}>
            <h2>Security Education</h2>
            {error && <p style={{ color: "#f87171" }}>{error}</p>}
            {topics.map((t) => (
                <div
                    key={t.id}
                    onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                    style={{
                        background: "#1e293b",
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 12,
                        cursor: "pointer",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <strong>{t.title}</strong>
                        <span style={{ fontSize: 12, color: "#818cf8", background: "#334155", padding: "2px 8px", borderRadius: 999 }}>
              {t.category}
            </span>
                    </div>
                    <p style={{ color: "#94a3b8", fontSize: 14, margin: "8px 0 0" }}>{t.summary}</p>
                    {expanded === t.id && (
                        <p style={{ fontSize: 14, marginTop: 12, borderTop: "1px solid #334155", paddingTop: 12 }}>
                            {t.content}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}