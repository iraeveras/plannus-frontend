// File: src/middleware/AuthMiddleware.ts

import { NextResponse, NextRequest } from "next/server";

export function authMiddleware(req: NextRequest) {
    // 1. Obter o token do cookie
    const token = req.cookies.get("token")?.value;

    // 2. Redirecionar para o login se o token não existir e a rota for protegida
    if (!token && !req.nextUrl.pathname.startsWith("/login")) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl)
    }

    // 3. Redirecionar para o dashboard se o token existir e o usuário tentar acessar o login
    if (token && req.nextUrl.pathname.startsWith("/login")) {
        const dashboardUrl = new URL("/dashboard", req.url);
        return NextResponse.redirect(dashboardUrl);
    }

    // 4. Permitir o acesso à rota
    return NextResponse.next();
}