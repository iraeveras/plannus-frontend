interface TableProps {
    headers: string[];
    data: any[];
    renderRow: (item: any) => React.ReactNode; // Função para renderizar cada lilnha
}

const Table: React.FC<TableProps> = ({ headers, data, renderRow}) => {
    return (
        <table className="table-auto w-full bg-white shadow-md rounded border">
            <thead className="bg-gray-100">
                <tr>
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className="text-left px-4 py-2 text-gray-700 font-semibold"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50">
                            {renderRow(item)}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={headers.length} className="text-center py-4">
                            Nenhum dado encontrado
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table;