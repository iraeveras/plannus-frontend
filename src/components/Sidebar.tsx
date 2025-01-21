import Link from "next/link";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Premissas", path: "/premises" },
    { name: "Empresas", path: "/companies" },
    // Adicione mais itens conforme necessário
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Plannus</h1>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path} className="block px-4 py-2 rounded hover:bg-gray-700">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
