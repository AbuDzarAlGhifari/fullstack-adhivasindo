import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, RefreshCw } from 'lucide-react';

/**
 * DataTable with:
 * - client-side pagination
 * - optional search (global filter)
 * - optional ordering (sorting)
 * - optional refresh button (fires onRefresh or resets table state)
 * - headerClassName / bodyClassName to style those areas
 *
 * Props:
 * - columns, data, loading, initialPageSize, pageSizeOptions, showPagination, className (kept)
 * - search (bool) -> show search input
 * - order (bool) -> enable sorting
 * - refresh (bool) -> show refresh button
 * - onRefresh (fn) -> optional callback when refresh clicked
 * - headerClassName, bodyClassName -> pass to TableHeader / TableBody
 */
export function DataTable({
    columns,
    data = [],
    loading = false,
    initialPageSize = 10,
    pageSizeOptions = [5, 10, 25, 50],
    showPagination = true,
    className,
    search = false,
    order = false,
    refresh = false,
    onRefresh = null,
    headerClassName,
    bodyClassName,
}) {
    const [globalFilter, setGlobalFilter] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: order ? getSortedRowModel() : undefined,
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: { pageIndex: 0, pageSize: initialPageSize },
        },
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        enableSorting: order,
    });

    useEffect(() => {
        const t = setTimeout(() => setGlobalFilter(searchInput ?? ''), 180);
        return () => clearTimeout(t);
    }, [searchInput]);

    const pageCount = table.getPageCount();
    const { pageIndex, pageSize } = table.getState().pagination;

    const handleRefresh = () => {
        if (typeof onRefresh === 'function') {
            onRefresh();
        } else {
            table.resetGlobalFilter();
            table.setSorting([]);
            table.setPageIndex(0);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {(search || refresh) && (
                <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-md shadow gap-2">
                        {refresh && (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={handleRefresh}
                                aria-label="Refresh table"
                                title="Refresh table"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {search && (
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="Search..."
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(e.target.value)
                                    }
                                    className="w-64"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader className={headerClassName}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const canSort =
                                        order && header.column.getCanSort?.();
                                    const toggleSort =
                                        canSort &&
                                        header.column.getToggleSortingHandler?.();

                                    const colHeaderClass =
                                        header.column.columnDef
                                            .headerClassName ||
                                        header.column.columnDef.meta
                                            ?.headerClassName ||
                                        '';

                                    const sortState =
                                        header.column.getIsSorted?.() ?? false;

                                    return (
                                        <TableHead
                                            className={`${
                                                className ?? ''
                                            } ${colHeaderClass}`.trim()}
                                            key={header.id}
                                        >
                                            {header.isPlaceholder ? null : canSort ? (
                                                <button
                                                    type="button"
                                                    onClick={toggleSort}
                                                    className="flex items-center gap-2"
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext()
                                                    )}
                                                    <ArrowUpDown className="w-4 h-4" />
                                                    {sortState === 'asc' ? (
                                                        <span className="sr-only">
                                                            sorted ascending
                                                        </span>
                                                    ) : sortState === 'desc' ? (
                                                        <span className="sr-only">
                                                            sorted descending
                                                        </span>
                                                    ) : null}
                                                </button>
                                            ) : (
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody className={bodyClassName}>
                        {loading ? (
                            Array.from({ length: pageSize }).map((_, rIdx) => (
                                <TableRow key={`skeleton-${rIdx}`}>
                                    {columns.map((col, cIdx) => (
                                        <TableCell key={cIdx}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const colBodyClass =
                                            cell.column.columnDef
                                                .bodyClassName ||
                                            cell.column.columnDef.meta
                                                ?.bodyClassName ||
                                            '';
                                        const cellClassName =
                                            colBodyClass.trim();

                                        return (
                                            <TableCell
                                                key={cell.id}
                                                className={cellClassName}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        );
                                    })}
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

            {showPagination && (
                <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Rows</span>
                            <select
                                className="rounded-md border px-2 py-1 text-sm"
                                value={pageSize}
                                onChange={(e) =>
                                    table.setPageSize(Number(e.target.value))
                                }
                            >
                                {pageSizeOptions.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2 ml-2">
                            <span className="text-sm text-gray-600">Go to</span>
                            <Input
                                type="number"
                                min={1}
                                max={pageCount || 1}
                                value={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value
                                        ? Number(e.target.value) - 1
                                        : 0;
                                    table.setPageIndex(
                                        Math.max(
                                            0,
                                            Math.min(pageCount - 1, page)
                                        )
                                    );
                                }}
                                className="w-20"
                            />
                            <span className="text-sm text-gray-600">
                                / {pageCount || 1}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            « First
                        </Button>

                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            ‹ Prev
                        </Button>

                        <span className="px-3 text-sm">
                            Page <strong>{pageIndex + 1}</strong> of{' '}
                            <strong>{pageCount || 1}</strong>
                        </span>

                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next ›
                        </Button>

                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => table.setPageIndex(pageCount - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            Last »
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
