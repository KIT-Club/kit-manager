import { HTMLProps } from "react";
import { useReducer, useState, useMemo, useRef, useEffect } from "react";

import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  Table,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "@/repositories/User.repository";
import Loading from "./Loading";
import ErrorAlert from "./alert/Error";
import MessageAlert from "./alert/Message";
import TanstackTablePagination from "@/components/TanstackTablePagination";

function App({ rowSelection, setRowSelection }: any) {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  //   const rerender = useReducer(() => ({}), {})[1];
  const [globalFilter, setGlobalFilter] = useState("");

  const fetchDataOptions = {
    pageIndex,
    pageSize,
    globalFilter,
  };

  const { data, isLoading, error } = useQuery(
    ["users", fetchDataOptions],
    () =>
      getAllUsers({
        includes: "roles,committees",
        page: fetchDataOptions.pageIndex,
        limit: fetchDataOptions.pageSize,
        search: fetchDataOptions.globalFilter,
      }),
    {
      keepPreviousData: true,
    }
  );

  // useEffect(() => {
  //   console.log(rowSelection);
  // }, [rowSelection]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            className="checkbox"
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            className="checkbox"
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        accessorKey: "name",
        header: () => "Họ và tên",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "username",
        header: () => "MSSV",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "roles",
        header: () => "Role",
        cell: (info) => {
          const roles = info.getValue() as any[];
          return roles?.length
            ? roles.map((item: any) => item.name).join(", ")
            : "_";
        },
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "committees",
        header: () => "Ban",
        cell: (info) => {
          const committees = info.getValue() as any[];
          return committees?.length
            ? committees.map((item: any) => item.name).join(", ")
            : "_";
        },
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const table = useReactTable({
    columns,
    getRowId: (row, relativeIndex) => {
      return row.id;
    },
    data: data?.data ?? [],
    pageCount: data?.last_page ?? 0,
    state: {
      rowSelection,
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    enableRowSelection: true, //enable row selection for all rows
    manualPagination: true,
    manualFiltering: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    <ErrorAlert
      msg={(error as any).response?.data?.error ?? "Có lỗi xảy ra"}
    />;
  }

  if (!data?.data?.length) {
    return <MessageAlert className="mt-4" msg={"Không có dữ liệu"} />;
  }

  return (
    <div>
      {/* <input
        type="text"
        value={globalFilter ?? ""}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="input input-bordered"
        placeholder="Tìm tài khoản"
      /> */}
      <table className="table w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TanstackTablePagination table={table} />
    </div>
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest?.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  );
}

export default App;
