interface TableProps {
    headers: string[];
    data: any[];
    renderRow: (item: any) => React.ReactNode; // Função para renderizar cada lilnha
}

const Table: React.FC<TableProps> = ({ headers, data, renderRow }) => {
    return (
        <table className="table-auto w-full font-sans shadow-md rounded border">
            <thead className="">
                <tr>
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className="text-left px-4 py-2 uppercase text-sm text-foreground font-bold"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={index} className="border-t text-sm text-foreground ">
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