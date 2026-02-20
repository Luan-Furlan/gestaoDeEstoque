import React from 'react'
import axios from 'axios'

export default function Movements() {
  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('http://localhost:4000/api/movements', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setRows(r.data))
      .catch(() => setRows([]))
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Movimentações</h2>
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Produto</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Quantidade</th>
              <th className="px-4 py-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-b">
                <td className="px-4 py-2">{r.id}</td>
                <td className="px-4 py-2">{r.productId}</td>
                <td className="px-4 py-2">{r.type}</td>
                <td className="px-4 py-2">{r.amount}</td>
                <td className="px-4 py-2">{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={5} className="p-4 text-center text-sm text-gray-500">Nenhuma movimentação registrada.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* mobile list */}
      <div className="sm:hidden space-y-3 mt-3">
        {rows.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">Nenhuma movimentação registrada.</div>
        ) : (
          rows.map(r => (
            <div key={r.id} className="p-3 bg-white dark:bg-gray-800 rounded shadow flex items-start justify-between">
              <div>
                <div className="font-semibold">Produto: {r.productId}</div>
                <div className="text-sm text-gray-500">{r.type} • {r.amount} unidades</div>
              </div>
              <div className="text-sm text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
