// File: src/components/data-display/role-table.tsx
"use client";

import React from "react";
import DataTable from "@/components/data-display/data-table"; // Supondo que você já tenha esse componente genérico
import { Button } from "@/components/ui/button";

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
                <Button variant="outline" size="sm" onClick={() => onEdit(role)}>
                Editar
                </Button>
            )}
            {onDelete && (
                <Button variant="destructive" size="sm" onClick={() => onDelete(role)}>
                Excluir
                </Button>
            )}
            </div>
        )}
        />
    );
};

export default RoleTable;