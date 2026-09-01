const BASE_URL = "http://localhost:8080/api/auth";

export interface AuthResponse {
    token: string;
    email: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

async function authRequest(path: string, body: object): Promise<AuthResponse> {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    const json: ApiResponse<AuthResponse> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
}

export const register = (email: string, password: string) =>
    authRequest("/register", { email, password });

export const login = (email: string, password: string) =>
    authRequest("/login", { email, password });