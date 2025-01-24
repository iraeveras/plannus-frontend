// File: src/components/data-table.tsx
"use client"

import React, { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Column<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: (row: T) => React.ReactNode;
}

const DataTable = <T extends Record<string, any>>({
    data,
    columns,
    actions,
}: DataTableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);
    const [filters, setFilters] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    // Paginação
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Ordenação
    const sortedData = sortConfig
        ? [...data].sort((a, b) => {
            const valueA = a[sortConfig.key];
            const valueB = b[sortConfig.key];

            if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
            if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        })
        : data;

    // Filtragem
    const filteredData = sortedData.filter((row) =>
        Object.entries(filters).every(([key, value]) =>
            String(row[key as keyof T]).toLowerCase().includes(value.toLowerCase())
        )
    );

    // Seleção de linhas
    const toggleRowSelection = (id: string) => {
        const updatedSelection = new Set(selectedRows);
        if (updatedSelection.has(id)) {
            updatedSelection.delete(id);
        } else {
            updatedSelection.add(id);
        }
        setSelectedRows(updatedSelection);
    };

    const handleSort = (key: keyof T) => {
        setSortConfig((prev) =>
            prev?.key === key
                ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
                : { key, direction: "asc" }
        );
    };

    return (
        <div className="overflow-x-auto rounded-md border">

            {/* Filtros */}
            <div className="m-4 flex space-x-4">
                {columns
                    .filter((col) => col.filterable)
                    .map((col) => (
                        <Input
                            key={col.key as string}
                            placeholder={`Filtrar ${col.label}`}
                            value={filters[col.key as keyof T] || ""}
                            onChange={(e) =>
                                setFilters({ ...filters, [col.key]: e.target.value })
                            }
                        />
                    ))}
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-4 bg-primary-foreground">
                            <Input
                                type="checkbox"
                                onChange={(e) =>
                                    setSelectedRows(e.target.checked ? new Set(data.map((row) => row.id)) : new Set()
                                    )
                                }
                                checked={selectedRows.size === data.length}
                            />
                        </TableHead>
                        {columns.map((col) => (
                            <TableHead
                                key={String(col.key)}
                                className={`text-left bg-primary-foreground font-semibold ${col.sortable ? "cursor-pointer" : ""}`}
                                onClick={() => col.sortable && handleSort(col.key)}
                            >
                                {col.label}
                                {sortConfig?.key === col.key && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                            </TableHead>
                        ))}
                        {actions && <TableHead className="text-center bg-primary-foreground font-semibold">Ações</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell className="w-4">
                                    <Input
                                        type="checkbox"
                                        checked={selectedRows.has(row.id)}
                                        onChange={() => toggleRowSelection(row.id)}
                                    />
                                </TableCell>
                                {columns.map((col) => (
                                    <TableCell key={col.key as string}>
                                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                                    </TableCell>
                                ))}
                                {actions && (
                                    <TableCell>
                                        <div className="flex justify-center space-x-2">{actions(row)}</div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center py-4">Nenhum dado encontrado</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {/* Paginação */}
            <div className="flex justify-between items-center px-4 py-2 border-t">
                <div>
                    Exibindo {(currentPage - 1) * itemsPerPage + 1} -{" "}
                    {Math.min(currentPage * itemsPerPage, data.length)} de {data.length}
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Próximo
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;