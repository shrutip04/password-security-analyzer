import { useState } from "react";
import AuthForm from "./components/AuthForm";
import PasswordAnalyzer from "./components/PasswordAnalyzer";

export default function App() {
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    if (!token) {
        return <AuthForm onAuth={(t, e) => { setToken(t); setEmail(e); }} />;
    }

    return (
        <div>
            <div style={{ textAlign: "right", padding: 16, color: "#94a3b8", fontSize: 14 }}>
                Logged in as <strong style={{ color: "#e2e8f0" }}>{email}</strong>{" "}
                <button onClick={() => setToken(null)} style={{ marginLeft: 8, padding: "6px 12px", fontSize: 13 }}>
                    Logout
                </button>
            </div>
            <PasswordAnalyzer />
        </div>
    );
}