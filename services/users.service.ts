import { apiFetch } from "./api";
import { UserInfo } from "@/types";

/**
 * Retrieves user information by ID
 * from the Mobile Frontend Challenge Mock API.
 *
 * @param userId Existing user identifier
 * @returns User profile information and linked products
 */
export const getUserById = async (userId: number): Promise<UserInfo> => {
    return apiFetch<UserInfo>(`/users/${userId}`);
};
