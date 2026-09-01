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