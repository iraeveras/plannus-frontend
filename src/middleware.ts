// File: src/middleware.ts
import { authMiddleware } from "./middleware/AuthMiddleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    return authMiddleware(req);
}

// Configuração para aplicar o middleware apenas em rotas específicas
export const config = {
  matcher: ["/dashboard/:path*", "/login"], // Aplica o middleware apenas nessas rotas
};