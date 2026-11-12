import type { Key, ReactNode } from "react";

export type DataTableColumn<Row> = {
  align?: "center" | "left" | "right";
  cell: (row: Row) => ReactNode;
  header: string;
  id: string;
};

type DataTableProps<Row> = {
  caption?: string;
  columns: DataTableColumn<Row>[];
  emptyContent?: ReactNode;
  getRowKey: (row: Row) => Key;
  rows: Row[];
};

const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};

export function DataTable<Row>({
  caption,
  columns,
  emptyContent,
  getRowKey,
  rows
}: DataTableProps<Row>) {
  return (
    <div className="overflow-hidden rounded-3xl border border-movenet-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead className="border-b border-movenet-border bg-movenet-cloud text-xs font-bold tracking-[0.1em] text-movenet-muted uppercase">
            <tr>
              {columns.map((column) => (
                <th
                  className={`px-5 py-4 ${alignmentClasses[column.align ?? "left"]}`}
                  key={column.id}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr
                  className="border-b border-movenet-border last:border-b-0"
                  key={getRowKey(row)}
                >
                  {columns.map((column) => (
                    <td
                      className={`px-5 py-4 text-movenet-text ${alignmentClasses[column.align ?? "left"]}`}
                      key={column.id}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-5 py-10 text-center text-movenet-muted"
                  colSpan={columns.length}
                >
                  {emptyContent ?? "No data is available yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
