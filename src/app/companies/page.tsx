// File: src/app/companies/page.tsx
import Link from 'next/link';

export default function Companies() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-primary">Empresas</h1>
      <Link href="/companies/new" className="text-white bg-primary px-4 py-2 rounded mt-4 inline-block">
        + Nova Empresa
      </Link>
      <table className="mt-6 w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left px-4 py-2">Razão Social</th>
            <th className="text-left px-4 py-2">CNPJ</th>
            <th className="text-left px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">Empresa Teste LTDA</td>
            <td className="px-4 py-2">12.345.678/0001-00</td>
            <td className="px-4 py-2 text-green-600">Ativa</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}