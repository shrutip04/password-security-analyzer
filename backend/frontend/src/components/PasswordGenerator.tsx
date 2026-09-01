import { useState } from "react";
import { generateRandomPassword, generatePassphrase, generatePersonalizedPassword } from "../utils/passwordGenerator";
import type { PersonalizedResult } from "../utils/passwordGenerator";

const riskColors = { high: "#dc2626", medium: "#eab308", low: "#22c55e" };

export default function PasswordGenerator() {
    const [mode, setMode] = useState<"random" | "passphrase" | "personalized">("random");
    const [length, setLength] = useState(16);
    const [useUpper, setUseUpper] = useState(true);
    const [useDigits, setUseDigits] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const [result, setResult] = useState("");
    const [personalizedResult, setPersonalizedResult] = useState<PersonalizedResult | null>(null);
    const [copied, setCopied] = useState(false);

    const [inputWords, setInputWords] = useState(["", "", ""]);

    const handleGenerate = () => {
        setPersonalizedResult(null);
        if (mode === "random") {
            setResult(generateRandomPassword({ length, useUpper, useDigits, useSymbols }));
        } else if (mode === "passphrase") {
            setResult(generatePassphrase(4));
        } else {
            const res = generatePersonalizedPassword(inputWords);
            setPersonalizedResult(res);
            setResult(res.password);
        }
        setCopied(false);
    };

    const handleCopy = async () => {
        if (!result) return;
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div style={{ maxWidth: 480, margin: "40px auto", padding: 32, background: "#1e293b", borderRadius: 16 }}>
            <h2 style={{ marginTop: 0 }}>Password Generator</h2>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {(["random", "passphrase", "personalized"] as const).map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        style={{ flex: 1, padding: 8, fontSize: 13, background: mode === m ? "#6366f1" : "#334155" }}
                    >
                        {m === "random" ? "Random" : m === "passphrase" ? "Passphrase" : "Personalized"}
                    </button>
                ))}
            </div>

            {mode === "random" && (
                <div style={{ marginBottom: 16, fontSize: 14 }}>
                    <label style={{ display: "block", marginBottom: 8 }}>
                        Length: {length}
                        <input type="range" min={8} max={32} value={length} onChange={(e) => setLength(Number(e.target.value))} style={{ width: "100%" }} />
                    </label>
                    <label style={{ display: "block", marginBottom: 4 }}>
                        <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} /> Uppercase
                    </label>
                    <label style={{ display: "block", marginBottom: 4 }}>
                        <input type="checkbox" checked={useDigits} onChange={(e) => setUseDigits(e.target.checked)} /> Numbers
                    </label>
                    <label style={{ display: "block", marginBottom: 4 }}>
                        <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} /> Symbols
                    </label>
                </div>
            )}

            {mode === "personalized" && (
                <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 0 }}>
                        Enter words meaningful to you (nickname, hobby, favorite place — avoid real birthdates or legal names).
                    </p>
                    {inputWords.map((w, i) => (
                        <input
                            key={i}
                            value={w}
                            onChange={(e) => {
                                const next = [...inputWords];
                                next[i] = e.target.value;
                                setInputWords(next);
                            }}
                            placeholder={`Word ${i + 1}`}
                            style={{ width: "100%", padding: 10, marginBottom: 8, fontSize: 14 }}
                        />
                    ))}
                </div>
            )}

            <button onClick={handleGenerate} style={{ width: "100%", padding: 12, marginBottom: 12 }}>
                Generate
            </button>

            {result && (
                <div
                    onClick={handleCopy}
                    style={{ padding: 12, background: "#0f172a", borderRadius: 8, fontFamily: "monospace", fontSize: 15, wordBreak: "break-all", cursor: "pointer", border: "1px solid #334155" }}
                >
                    {result}
                    <div style={{ fontSize: 12, color: "#818cf8", marginTop: 6 }}>{copied ? "Copied!" : "Click to copy"}</div>
                </div>
            )}

            {personalizedResult && (
                <div style={{ marginTop: 12, padding: 12, background: "#0f172a", borderRadius: 8, borderLeft: `3px solid ${riskColors[personalizedResult.riskLevel]}` }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: riskColors[personalizedResult.riskLevel], textTransform: "uppercase" }}>
                        {personalizedResult.riskLevel} risk
                    </p>
                    {personalizedResult.warnings.map((w, i) => (
                        <p key={i} style={{ fontSize: 13, color: "#94a3b8", margin: "6px 0 0" }}>{w}</p>
                    ))}
                </div>
            )}
        </div>
    );
}