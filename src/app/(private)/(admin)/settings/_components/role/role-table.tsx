// File: src/components/data-display/role-table.tsx
"use client";

import React from "react";
import DataTable from "@/components/data-display/data-table"; // Supondo que você já tenha esse componente genérico
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash2 } from "lucide-react";

export interface Role {
    id: string;
    name: string;
    description?: string;
    }

    interface Column<T> {
        key: keyof T;
        label: string;
        sortable: boolean;
        filterable: boolean;
    }

    interface RoleTableProps {
    roles: Role[];
    onEdit?: (role: Role) => void;
    onDelete?: (role: Role) => void;
    }

    const columns: Column<Role>[] = [
    { key: "name", label: "Nome", sortable: true, filterable: true },
    { key: "description", label: "Descrição", sortable: false, filterable: false },
    ];

    const RoleTable: React.FC<RoleTableProps> = ({ roles, onEdit, onDelete }) => {
    return (
        <DataTable<Role>
        data={roles}
        columns={columns}
        actions={(role) => (
            <div className="flex space-x-2">
                {onEdit && (
                    <FilePenLine className="cursor-pointer text-teal-400 hover:text-teal-500" onClick={() => onEdit(role)}/>
                )}
                {onDelete && (
                    <Trash2 className="cursor-pointer text-red-400 hover:text-red-500" onClick={() => onDelete(role)}/>
                )}
            </div>
        )}
        />
    );
};

export default RoleTable;