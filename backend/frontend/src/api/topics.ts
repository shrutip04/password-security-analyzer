const BASE_URL = "http://localhost:8080/api/topics";

export interface SecurityTopic {
    id: number;
    title: string;
    summary: string;
    content: string;
    category: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

export async function fetchTopics(token: string): Promise<SecurityTopic[]> {
    const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const json: ApiResponse<SecurityTopic[]> = await res.json();
    if (!json.success) throw new Error(json.message);
    return json.data;
}