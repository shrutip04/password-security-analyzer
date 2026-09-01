import { useState } from "react";
import { generateRandomPassword, generatePassphrase } from "../utils/passwordGenerator";

export default function PasswordGenerator() {
    const [mode, setMode] = useState<"random" | "passphrase">("random");
    const [length, setLength] = useState(16);
    const [useUpper, setUseUpper] = useState(true);
    const [useDigits, setUseDigits] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);
    const [result, setResult] = useState("");
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        const pw =
            mode === "random"
                ? generateRandomPassword({ length, useUpper, useDigits, useSymbols })
                : generatePassphrase(4);
        setResult(pw);
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
                <button
                    onClick={() => setMode("random")}
                    style={{ flex: 1, padding: 8, background: mode === "random" ? "#6366f1" : "#334155" }}
                >
                    Random
                </button>
                <button
                    onClick={() => setMode("passphrase")}
                    style={{ flex: 1, padding: 8, background: mode === "passphrase" ? "#6366f1" : "#334155" }}
                >
                    Passphrase
                </button>
            </div>

            {mode === "random" && (
                <div style={{ marginBottom: 16, fontSize: 14 }}>
                    <label style={{ display: "block", marginBottom: 8 }}>
                        Length: {length}
                        <input
                            type="range"
                            min={8}
                            max={32}
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            style={{ width: "100%" }}
                        />
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

            <button onClick={handleGenerate} style={{ width: "100%", padding: 12, marginBottom: 12 }}>
                Generate
            </button>

            {result && (
                <div
                    onClick={handleCopy}
                    style={{
                        padding: 12,
                        background: "#0f172a",
                        borderRadius: 8,
                        fontFamily: "monospace",
                        fontSize: 15,
                        wordBreak: "break-all",
                        cursor: "pointer",
                        border: "1px solid #334155",
                    }}
                >
                    {result}
                    <div style={{ fontSize: 12, color: "#818cf8", marginTop: 6 }}>
                        {copied ? "Copied!" : "Click to copy"}
                    </div>
                </div>
            )}
        </div>
    );
}