// File: src/lib/api-client.ts
export async function signIn(username: string, password: string) {
    try {
        const res = await fetch("http://localhost:5000/users/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
    
        if (!res.ok) {
            throw new Error("Usuário ou senha inválidos")
        }

        const data = await res.json()
        localStorage.setItem("token", data.token) // Salva o token JWT
        return { success: true, user: data.user }
    } catch (error: any) {
        return { success: false, message: error.message }
    }
}  