// src/types/User.ts

export type UserRole = "admin" | "managerGeafi" | "managerGerop" | "managerGemkt" | "supervisor" | "user";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}