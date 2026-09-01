import { useState, useMemo } from "react";
import { analyzePassword } from "../utils/passwordStrength";

const strengthColors = ["#dc2626", "#ea580c", "#eab308", "#22c55e", "#16a34a"];

export default function PasswordAnalyzer() {
    const [password, setPassword] = useState("");
    const result = useMemo(() => analyzePassword(password), [password]);

    return (
        <div style={{ maxWidth: 480, margin: "40px auto", padding: 32, background: "#1e293b", borderRadius: 16 }}>
            <h2 style={{ marginTop: 0 }}>Password Strength Analyzer</h2>
            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type a password..."
                style={{ width: "100%", padding: 12, fontSize: 15 }}
            />
            <div style={{ marginTop: 16 }}>
                <div style={{ height: 8, background: "#334155", borderRadius: 4, overflow: "hidden" }}>
                    <div
                        style={{
                            width: `${(result.score / 4) * 100}%`,
                            height: "100%",
                            background: strengthColors[result.score],
                            transition: "width 0.2s, background 0.2s",
                        }}
                    />
                </div>
                <p style={{ fontWeight: 600, color: strengthColors[result.score], marginBottom: 4 }}>{result.label}</p>
                <ul style={{ color: "#94a3b8", fontSize: 14, paddingLeft: 18, margin: 0 }}>
                    {result.feedback.map((f, i) => (
                        <li key={i}>{f}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}