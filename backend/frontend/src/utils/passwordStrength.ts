export interface StrengthResult {
    score: number; // 0-4
    label: "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong";
    feedback: string[];
}

export function analyzePassword(password: string): StrengthResult {
    const feedback: string[] = [];
    let score = 0;

    if (password.length === 0) {
        return { score: 0, label: "Very Weak", feedback: ["Enter a password"] };
    }

    // Length
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    else feedback.push("Use at least 8 characters (12+ recommended)");

    // Character variety
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    const variety = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;
    score += variety - 1;
    if (!hasUpper) feedback.push("Add an uppercase letter");
    if (!hasDigit) feedback.push("Add a number");
    if (!hasSymbol) feedback.push("Add a special character");

    // Common patterns
    const commonPatterns = [/^123/, /password/i, /qwerty/i, /^abc/i, /(.)\1{2,}/];
    if (commonPatterns.some((p) => p.test(password))) {
        score -= 2;
        feedback.push("Avoid common patterns or repeated characters");
    }

    // Sequential characters
    if (/(?:abc|bcd|cde|123|234|345|456|567|678|789)/i.test(password)) {
        score -= 1;
        feedback.push("Avoid sequential characters");
    }

    score = Math.max(0, Math.min(4, score));

    const labels: StrengthResult["label"][] = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    return { score, label: labels[score], feedback: feedback.length ? feedback : ["Good password!"] };
}