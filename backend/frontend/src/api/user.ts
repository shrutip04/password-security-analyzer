const BASE_URL = "http://localhost:8080/api/users";

export interface UserProfile {
    email: string;
    memberSince: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

export async function fetchProfile(token: string): Promise<UserProfile> {
    const res = await fetch(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const json: ApiResponse<UserProfile> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
}