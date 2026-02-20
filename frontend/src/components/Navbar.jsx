import React from 'react'

export default function Navbar() {
  const [dark, setDark] = React.useState(localStorage.getItem('theme') === 'dark')
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-indigo-600 text-white flex items-center justify-center font-bold">GE</div>
          <div className="hidden sm:block">
            <div className="font-semibold">Gestão de Estoque</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Painel administrativo</div>
          </div>

          <nav className="ml-4 hidden md:flex items-center gap-3 text-sm">
            <a href="/dashboard" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</a>
            <a href="/products" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Produtos</a>
            <a href="/movements" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Movimentações</a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(d => !d)}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded"
            aria-label="Alternar tema"
          >
            {dark ? '🌙' : '☀️'}
          </button>

          <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded hidden sm:inline">Logout</button>

          {/* mobile menu button */}
          <button
            className="md:hidden px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Abrir menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-2 text-sm bg-white dark:bg-gray-800 rounded shadow p-3">
            <a href="/dashboard" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</a>
            <a href="/products" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Produtos</a>
            <a href="/movements" className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Movimentações</a>
            <div className="flex items-center gap-2 mt-2">
              <button onClick={() => setDark(d => !d)} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded">{dark ? '🌙' : '☀️'}</button>
              <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
