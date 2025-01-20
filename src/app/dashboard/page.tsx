// File: src/app/dashboard/page.tsx
export default function Dashboard() {
    return (
      <main className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold text-secondary">Resumo Financeiro</h2>
            <p className="mt-2 text-gray-700">Total de Orçamento: R$ 1.000.000,00</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold text-secondary">Funcionários</h2>
            <p className="mt-2 text-gray-700">Total: 120</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold text-secondary">Empresas</h2>
            <p className="mt-2 text-gray-700">Total: 10</p>
          </div>
        </div>
      </main>
    );
  }  