// src/types/User.ts

export type UserRole = "admin" | "managerGeafi" | "managerGerop" | "managerGemkt" | "supervisor" | "user";

export interface User {
    id: string;
    name: string;
    username: string;        // Adicionado
    email: string;
    status: "active" | "inactive";  // Adicionado
    role: UserRole;
    avatarURL?: string;      // Adicionado, opcional
}