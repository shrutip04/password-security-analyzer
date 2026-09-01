const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const WORDS = [
    "correct", "horse", "battery", "staple", "planet", "river", "cloud", "forest",
    "amber", "quartz", "harbor", "meadow", "falcon", "cedar", "ember", "granite",
    "lantern", "willow", "canyon", "comet", "drift", "ember", "frost", "glacier",
    "harmony", "island", "jasper", "kernel", "lumen", "marble", "nectar", "opal",
];

export interface GeneratorOptions {
    length: number;
    useUpper: boolean;
    useDigits: boolean;
    useSymbols: boolean;
}

function secureRandomInt(max: number): number {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
}

export function generateRandomPassword(options: GeneratorOptions): string {
    let pool = LOWER;
    if (options.useUpper) pool += UPPER;
    if (options.useDigits) pool += DIGITS;
    if (options.useSymbols) pool += SYMBOLS;

    let result = "";
    for (let i = 0; i < options.length; i++) {
        result += pool[secureRandomInt(pool.length)];
    }
    return result;
}

export function generatePassphrase(wordCount: number = 4): string {
    const words: string[] = [];
    for (let i = 0; i < wordCount; i++) {
        words.push(WORDS[secureRandomInt(WORDS.length)]);
    }
    const num = secureRandomInt(90) + 10; // 10-99
    return words.map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w)).join("-") + "-" + num;
}

const LEET_MAP: Record<string, string> = { a: "@", e: "3", i: "1", o: "0", s: "$" };

function leetify(word: string, intensity: number): string {
    return word
        .split("")
        .map((ch) => {
            const lower = ch.toLowerCase();
            if (LEET_MAP[lower] && secureRandomInt(10) < intensity) {
                return LEET_MAP[lower];
            }
            return secureRandomInt(10) < 3 ? ch.toUpperCase() : ch.toLowerCase();
        })
        .join("");
}

export interface PersonalizedResult {
    password: string;
    riskLevel: "high" | "medium" | "low";
    warnings: string[];
}

export function generatePersonalizedPassword(inputs: string[]): PersonalizedResult {
    const cleaned = inputs.map((s) => s.trim()).filter(Boolean);
    const warnings: string[] = [];

    if (cleaned.length === 0) {
        return { password: "", riskLevel: "high", warnings: ["Enter at least one word to personalize from"] };
    }

    // Shuffle input order so it's not predictably "name-then-date"
    const shuffled = [...cleaned].sort(() => secureRandomInt(2) - 0.5);

    const transformed = shuffled.map((w) => leetify(w, 6));
    const separator = SYMBOLS[secureRandomInt(SYMBOLS.length)];
    const randomSuffix = String(secureRandomInt(900) + 100); // 3-digit
    const randomChar = LOWER[secureRandomInt(LOWER.length)] + UPPER[secureRandomInt(UPPER.length)];

    const password = transformed.join(separator) + separator + randomSuffix + randomChar;

    // Risk assessment — is any raw input still recognizable?
    const passwordLower = password.toLowerCase();
    const exposedInputs = cleaned.filter((w) => w.length >= 4 && passwordLower.includes(w.toLowerCase()));

    let riskLevel: "high" | "medium" | "low" = "low";
    if (exposedInputs.length > 0) {
        riskLevel = "high";
        warnings.push(
            `This still contains a recognizable, unmodified word or number from your input (${exposedInputs.join(", ")}). Anyone who knows details about you — birthdate, pet name, hometown — could guess passwords built this way.`
        );
    } else {
        riskLevel = "medium";
    }

    warnings.push(
        "Personalized passwords are inherently weaker than fully random ones, since attackers with your public info (social media, breached data) can build a targeted guess list. Use this only where a memorable password matters more than maximum security — for maximum security, use Random or Passphrase mode instead."
    );

    return { password, riskLevel, warnings };
}