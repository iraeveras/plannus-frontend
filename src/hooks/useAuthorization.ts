// src/hooks/useAuthorization.ts
import { useAuth } from "@/context/AuthContext";
import permissions from "@/config/permissions";

export function useAuthorization() {
    const { user } = useAuth();
    if (!user) return { canCreate: false, canEdit: false, canDelete: false };

    return permissions[user.role] || {};
}