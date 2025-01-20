export default function Login() {
    return (
      <main className="flex items-center justify-center h-screen bg-background">
        <div className="p-8 bg-white shadow-md rounded-md w-96">
          <h1 className="text-2xl font-bold text-center text-primary">Login</h1>
          <form className="mt-6">
            <label className="block text-sm text-text mb-2">E-mail:</label>
            <input
              type="email"
              className="w-full p-2 border rounded-md focus:outline-primary"
              placeholder="Digite seu e-mail"
            />
            <label className="block text-sm text-text mt-4 mb-2">Senha:</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-primary"
              placeholder="Digite sua senha"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md mt-6 hover:bg-primary/90"
            >
              Entrar
            </button>
          </form>
        </div>
      </main>
    );
  }
  