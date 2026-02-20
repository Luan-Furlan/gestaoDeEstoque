import React from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [productsCount, setProductsCount] = React.useState(0)
  const [movementsCount, setMovementsCount] = React.useState(0)

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get('http://localhost:4000/api/products', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setProductsCount(r.data.length))
      .catch(() => {})

    axios.get('http://localhost:4000/api/movements', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setMovementsCount(r.data.length))
      .catch(() => {})
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="text-sm text-gray-500">Produtos</div>
          <div className="text-3xl font-bold">{productsCount}</div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="text-sm text-gray-500">Movimentações</div>
          <div className="text-3xl font-bold">{movementsCount}</div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
          <div className="text-sm text-gray-500">Relatório</div>
          <div className="text-3xl font-bold">—</div>
        </div>
      </div>

      <section className="bg-white dark:bg-gray-800 rounded shadow p-4">
        <h2 className="font-semibold mb-2">Visão rápida</h2>
        <p className="text-sm text-gray-500">Painel simples com contagem de recursos. Integre gráficos facilmente com Chart.js ou Recharts.</p>
      </section>
    </div>
  )
}
