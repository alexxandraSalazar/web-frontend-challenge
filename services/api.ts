const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Generic HTTP client for the Mobile Frontend Challenge Mock API.
 *
 * Responsibilities:
 * - Prefix all requests with the configured BASE_URL
 * - Apply JSON headers
 * - Normalize error handling
 *
 * @template T Expected response type
 * @param endpoint Relative API endpoint (e.g. "/users/1")
 * @param options Fetch configuration
 * @returns Parsed JSON response of type T
 * @throws ProblemDetails when the response status is not successful
 */
export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    if (!BASE_URL) {
        throw new Error("API base URL is not defined.");
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
        ...options,
    });

    if (!response.ok) {
        const error = await response.json();
        throw error;
    }

    return response.json();
}
