import React from 'react'
import axios from 'axios'

export default function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')

  async function submit(e) {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', { username, password })
      localStorage.setItem('token', res.data.token)
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err?.response?.data?.message || 'Erro')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Entrar</h2>
      {error && <div className="text-sm text-red-500 mb-3">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700" />
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Entrar</button>
        </div>
      </form>
      <div className="mt-4 text-sm text-gray-500">Use <strong>admin/admin123</strong> (seed) para testar.</div>
    </div>
  )
}
