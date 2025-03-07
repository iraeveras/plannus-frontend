// src/types/User.ts

export interface Role {
    id: string;
    name: string;
    description?: string;
}

export interface User {
    id: string;
    name: string;
    username: string;        // Adicionado
    email: string;
    status: "active" | "inactive";  // Adicionado
    role: Role;
    avatarURL?: string;      // Adicionado, opcional
    password?: string;
    mustChangePassword: boolean;
}