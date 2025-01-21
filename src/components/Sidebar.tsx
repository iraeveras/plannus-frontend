"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHome, FaBuilding, FaClipboardList } from "react-icons/fa";
import { FaDownLeftAndUpRightToCenter } from "react-icons/fa6";
import { FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";
import { FaChevronCircleRight } from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Persistencia de estado no LocalStorage
  useEffect(() => {
    const saveState = localStorage.getItem("sidebar-collapsed");
    if (saveState) {
      setIsCollapsed(JSON.parse(saveState));
    }
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(!isCollapsed));
  };

  const toggleMenu = (menu: string) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Cadastros",
      icon: <FaClipboardList />,
      submenus: [
        { name: "Premissas", path: "/premises/new" },
        { name: "Empresas", path: "/companies" },
        { name: "Funcionários", path: "/employees" },
      ],
    },
    {
      name: "Relatórios",
      icon: <FaBuilding />,
      submenus: [
        { name: "Premissas", path: "/premises" },
        { name: "Realtório 2", path: "reports/2" },
      ],
    },
    // Adicione mais itens conforme necessário
  ];

  return (
    <aside className={`${isCollapsed ? "w-16" : "w-64"
      } bg-gray-800 text-white h-screen transition-all duration-300 flex flex-col`}
    >
      {/* Logo e botão de colapso */}
      <div className="relative flex items-center bg-gray-900 border-b border-gray-700 px-4 py-4">
        {isCollapsed ? (
          <img
            src="/logo.png"
            alt="Plannus Logo"
            className="h-9 w-h-9 rounded-full"
          />
        ) : (
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-1">
              <img
                src="/logo.png"
                alt="Plannus Logo"
                className="h-10 w-10 rounded-full"
              />
            </div>
            <span className="text-xl font-bold text-white">Plannus</span>
          </div>
        )}

        {/* Botão de colapso */}
        <button
          onClick={toggleCollapse}
          className={`${isCollapsed
            ? "absolute left-12 top-1/2 transform -translate-y-1/2 text-white p-2 bg-gray-900 rounded-full"
            : "absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 hover:bg-gray-700 rounded"}`}
        >
          {isCollapsed ? <FaChevronCircleRight /> : <FaDownLeftAndUpRightToCenter />}
        </button>
      </div>

      {/* Menus */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name} className="group">
              <div
                onClick={() => toggleMenu(item.name)}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700 rounded"
              >
                <span className="text-xl">{item.icon}</span>
                {!isCollapsed && (
                  <span className="ml-4 group-hover:underline">{item.name}</span>
                )}
              </div>
              {/* Submenus */}
              {item.submenus && activeMenu === item.name && (
                <ul className={`${isCollapsed ? "hidden" : "pl-8"} space-y-2`}>
                  {item.submenus.map((submenu) => (
                    <li key={submenu.name}>
                      <Link
                        href={submenu.path}
                        className="block px-4 py-2 hover:bg-gray-600 rounded"
                      >
                        {submenu.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
