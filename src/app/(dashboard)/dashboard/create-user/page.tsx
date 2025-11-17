"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteModal } from "@/components/shared/DeleteModal";
import { getAllUsers } from "@/api/users/api.user";
import { IUser } from "@/types/users.type";
import { UserCreateModal } from "@/components/modules/Users/UserCreateModal";

// ------------------ MAIN PAGE ------------------
export default function CreateUserPage() {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogOpenDelete, setDialogOpenDelete] = React.useState(false);
  const [currentUser, setCurrentuser] = React.useState<IUser | null>(null);
  const [deleteBlogData, setDeleteBlogData] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    const loadBlogs = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };
    loadBlogs();
  }, []);

  const refreshBlogs = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  // ------------------ TABLE COLUMNS ------------------
  const columns: ColumnDef<IUser>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "User Id",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: () => <div>Email</div>,
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: () => <div>Role</div>,
      cell: ({ row }) => <div>{row.getValue("role")}</div>,
    },
    {
      accessorKey: "phone",
      header: () => <div>Phone</div>,
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: () => <div>Date</div>,
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as number;
        return <div className="capitalize">{moment(date).format("ll")}</div>;
      },
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const rowData = row.original;
        const id = row.original.id;
        const isSelectedEdit = currentUser === rowData;
        const isSelectedDelete = selectedId === id;
        return (
          <div className="text-right capitalize">
            <Button
              className="mr-2"
              variant="outline"
              onClick={() => {
                setCurrentuser(rowData);
                setDialogOpen(true);
              }}
              style={{
                borderColor: isSelectedEdit ? "blue" : "",
                color: isSelectedEdit ? "blue" : "",
              }}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedId(id);
                setDeleteBlogData(row.original);
                setDialogOpenDelete(true);
              }}
              style={{
                borderColor: isSelectedDelete ? "red" : "",
                color: isSelectedDelete ? "red" : "",
              }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-9/12 mx-auto py-12">
      <div>
        <h2 className="text-2xl font-bold">Manage Users</h2>
      </div>
      {/* Search + Filter */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter by email..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("title")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />

        <div>
          <Button
            variant={"outline"}
            onClick={() => {
              setCurrentuser(null);
              setDialogOpen(true);
            }}
            className="mr-2"
          >
            Add User
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    className="capitalize"
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <UserCreateModal
        user={currentUser}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={async () => {
          setDialogOpen(false);
          setCurrentuser(null);
          await refreshBlogs();
        }}
      />
      <DeleteModal  
        blog={deleteBlogData as IUser}
        open={dialogOpenDelete}
        onOpenChange={setDialogOpenDelete}
        type="user"
        onSuccess={async () => {
          setDialogOpen(false);
          setCurrentuser(null);
          await refreshBlogs();
        }}/>
        
    </div>
  );
}
