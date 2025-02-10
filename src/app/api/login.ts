import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { username, password } = req.body;

    // Chame seu serviço de autenticação aqui
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!data.ok) {
        return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    const result = await data.json();

    // Configure o cookie com HttpOnly
    res.setHeader('Set-Cookie', `token=${result.token}; Path=/; HttpOnly; Secure; SameSite=Strict`);

    return res.status(200).json({ user: result.user });
}