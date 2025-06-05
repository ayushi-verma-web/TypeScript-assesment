import { useQuery } from '@tanstack/react-query';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { fetchCharacters } from '../api/character';
import type { ApiResponse, Character } from '../api/types';
import { Link } from '@tanstack/react-router';
import { Route } from '../routes';

export const CharacterTable = () => {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const page =Number(search.page) || 1;

  const {
    data: charactersData,
    isLoading,
    isError,
    refetch,
  } = useQuery<ApiResponse, Error>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page)
  });

  const columns: ColumnDef<Character>[] = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
      cell: ({ row }) => (
        <Link
        to="/character/$id"
        params={{ id: row.original.id.toString() }}
          className="text-blue-600 hover:underline"
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      header: 'Species',
      accessorKey: 'species',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded ${row.original.status === 'Alive'
              ? 'bg-green-100 text-green-800'
              : row.original.status === 'Dead'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
            }`}
        >
          {row.original.status}
        </span>
      ),
    },
  ];

  const table = useReactTable({
    data: charactersData?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: charactersData?.results.length || 0,
  });

  const handlePageChange = (newPage: number) => {
    navigate({ search: { page: newPage } });
  };

  if (isLoading) return <div className="p-4 text-center">Loading characters...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Error loading characters</div>;

  return (
    <div className="list-page">
      <div className="header-section">
        <h2 className="text-xl font-bold">Rick and Morty Characters</h2>
        <button
          onClick={() => refetch()}
          className="refresh-btn"
        >
          Refresh List
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-3">
                    {header.column.columnDef.header as string}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row, i) => (
              <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-2 py-2 whitespace-nowrap text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-section">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className={`px-4 py-2 rounded ${page <= 1
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          ← Prev
        </button>

        <div className="text-sm flex gap-2 items-center">
          Page{' '}
          <input
            type="number"
            value={page}
            min={1}
            max={charactersData?.info.pages || 1}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="w-16 border border-gray-300 px-2 py-1 rounded text-center"
          />
          of {charactersData?.info.pages}
        </div>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!charactersData?.info.next}
          className={`px-4 py-2 rounded ${!charactersData?.info.next
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
        >
          Next →
        </button>
      </div>

    </div>
  );
};