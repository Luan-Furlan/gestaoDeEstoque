import React from 'react'
import axios from 'axios'
import Modal from '../components/Modal'

function ProductRow({ p, onEdit }) {
  return (
    <tr className="border-b">
      <td className="px-4 py-2 flex items-center gap-3">
        {p.image ? (
          <img src={p.image.startsWith('http') ? p.image : `http://localhost:4000${p.image}`} alt={p.name} className="w-10 h-10 object-cover rounded" />
        ) : (
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500">—</div>
        )}
        <div className="max-w-xs truncate">{p.name}</div>
      </td>
      <td className="px-4 py-2">{p.quantity}</td>
      <td className="px-4 py-2">R$ {Number(p.price).toFixed(2)}</td>
      <td className="px-4 py-2">{p.category}</td>
      <td className="px-4 py-2 text-right">
        <div className="inline-flex gap-2">
          <button onClick={() => onEdit(p)} className="px-2 py-1 bg-yellow-400 text-black rounded">Editar</button>
        </div>
      </td>
    </tr>
  )
}

export default function Products() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [editing, setEditing] = React.useState(null)
  const [form, setForm] = React.useState({ name: '', quantity: 0, price: 0, category: '', imageFile: null, imagePreview: '' })
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')

  React.useEffect(() => { fetchList() }, [])

  function fetchList() {
    setLoading(true)
    const token = localStorage.getItem('token')
    axios.get('http://localhost:4000/api/products', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setItems(r.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }

  function openCreate() {
    setEditing(null)
    setForm({ name: '', quantity: 0, price: 0, category: '', imageFile: null, imagePreview: '' })
    setError('')
    setModalOpen(true)
  }

  function openEdit(p) {
    setEditing(p)
    setForm({ name: p.name || '', quantity: p.quantity || 0, price: p.price || 0, category: p.category || '', imageFile: null, imagePreview: p.image ? (p.image.startsWith('http') ? p.image : `http://localhost:4000${p.image}`) : '' })
    setError('')
    setModalOpen(true)
  }

  function onFileChange(e) {
    const f = e.target.files[0]
    if (!f) return setForm(s => ({ ...s, imageFile: null, imagePreview: '' }))
    setForm(s => ({ ...s, imageFile: f, imagePreview: URL.createObjectURL(f) }))
  }

  function validate() {
    if (!form.name.trim()) return 'Nome é obrigatório.'
    if (Number(form.quantity) < 0) return 'Quantidade não pode ser negativa.'
    if (Number(form.price) < 0) return 'Preço não pode ser negativo.'
    return null
  }

  async function submitForm(e) {
    e.preventDefault()
    const v = validate()
    if (v) return setError(v)
    setError('')
    const token = localStorage.getItem('token')

    try {
      const headers = { Authorization: `Bearer ${token}` }
      let payload
      let config = { headers }

      if (form.imageFile) {
        payload = new FormData()
        payload.append('name', form.name)
        payload.append('quantity', String(form.quantity))
        payload.append('price', String(form.price))
        payload.append('category', form.category)
        payload.append('image', form.imageFile)
        config.headers['Content-Type'] = 'multipart/form-data'
      } else {
        payload = { name: form.name, quantity: Number(form.quantity), price: Number(form.price), category: form.category, image: editing && editing.image ? editing.image : '' }
      }

      if (editing) {
        if (form.imageFile) {
          await axios.put(`http://localhost:4000/api/products/${editing.id}`, payload, config)
        } else {
          await axios.put(`http://localhost:4000/api/products/${editing.id}`, payload, { headers })
        }
        setSuccess('Produto atualizado com sucesso.')
      } else {
        if (form.imageFile) {
          await axios.post('http://localhost:4000/api/products', payload, config)
        } else {
          await axios.post('http://localhost:4000/api/products', payload, { headers })
        }
        setSuccess('Produto criado com sucesso.')
      }

      setModalOpen(false)
      fetchList()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err?.response?.data?.message || 'Erro ao salvar')
    }
  }


  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Produtos</h2>
        <div className="space-x-2">
          <button onClick={openCreate} className="px-3 py-1 bg-green-500 text-white rounded">Adicionar</button>
        </div>
      </div>

      {success && <div className="mb-3 text-sm text-green-600">{success}</div>}
      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Quantidade</th>
              <th className="px-4 py-2">Preço</th>
              <th className="px-4 py-2">Categoria</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-6 text-center text-sm text-gray-500">Carregando...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center text-sm text-gray-500">Nenhum produto encontrado.</td></tr>
            ) : (
              items.map(p => <ProductRow key={p.id} p={p} onEdit={openEdit} />)
            )}
          </tbody>
        </table>
      </div>

      {/* mobile cards */}
      <div className="sm:hidden space-y-3 mt-3">
        {loading ? (
          <div className="p-4 text-center text-sm text-gray-500">Carregando...</div>
        ) : items.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">Nenhum produto encontrado.</div>
        ) : (
          items.map(p => (
            <div key={p.id} className="p-3 bg-white dark:bg-gray-800 rounded shadow flex items-start gap-3">
              {p.image ? (
                <img src={p.image.startsWith('http') ? p.image : `http://localhost:4000${p.image}`} alt={p.name} className="w-16 h-12 object-cover rounded" />
              ) : (
                <div className="w-16 h-12 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500">—</div>
              )}
              <div className="flex-1">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-500">{p.category} • Qty: {p.quantity}</div>
                <div className="text-sm mt-2">R$ {Number(p.price).toFixed(2)}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => openEdit(p)} className="px-3 py-1 bg-yellow-400 text-black rounded text-sm">Editar</button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal open={modalOpen} title={editing ? 'Editar produto' : 'Novo produto'} onClose={() => setModalOpen(false)}>
        <form onSubmit={submitForm} className="space-y-3">
          <div>
            <label className="text-sm">Nome</label>
            <input className="w-full mt-1 px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Quantidade</label>
              <input type="number" className="w-full mt-1 px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm">Preço</label>
              <input type="number" step="0.01" className="w-full mt-1 px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
            </div>
          </div>
          <div>
            <label className="text-sm">Categoria</label>
            <input className="w-full mt-1 px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} />
          </div>

          <div>
            <label className="text-sm">Imagem (opcional)</label>
            <input type="file" accept="image/*" onChange={onFileChange} className="mt-2" />
            {form.imagePreview && <div className="mt-2"><img src={form.imagePreview} alt="preview" className="w-32 h-20 object-cover rounded" /></div>}
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Cancelar</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">Salvar</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
