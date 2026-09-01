import { useState } from "react";
import { login, register } from "../api/auth";

interface Props {
    onAuth: (token: string, email: string) => void;
}

export default function AuthForm({ onAuth }: Props) {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const fn = mode === "login" ? login : register;
            const { token, email: userEmail } = await fn(email, password);
            onAuth(token, userEmail);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        }
    };

    return (
        <div style={{ maxWidth: 380, margin: "80px auto", padding: 32, background: "#1e293b", borderRadius: 16 }}>
            <h2 style={{ marginTop: 0 }}>{mode === "login" ? "Welcome back" : "Create account"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: "100%", padding: 12, marginBottom: 10, fontSize: 14 }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: "100%", padding: 12, marginBottom: 10, fontSize: 14 }}
                />
                {error && <p style={{ color: "#f87171", fontSize: 13 }}>{error}</p>}
                <button type="submit" style={{ width: "100%", padding: 12, fontSize: 14, marginTop: 4 }}>
                    {mode === "login" ? "Log In" : "Register"}
                </button>
            </form>
            <p style={{ textAlign: "center", fontSize: 13, marginTop: 16, color: "#94a3b8" }}>
                {mode === "login" ? "New here?" : "Already have an account?"}{" "}
                <span
                    onClick={() => setMode(mode === "login" ? "register" : "login")}
                    style={{ color: "#818cf8", cursor: "pointer" }}
                >
          {mode === "login" ? "Register" : "Log in"}
        </span>
            </p>
        </div>
    );
}