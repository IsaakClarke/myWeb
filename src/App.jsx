import React, { useState } from 'react'
import AddCheckForm from './components/AddCheckForm'
import StatsChart from './components/StatsChart'
import EditCheckForm from './components/EditCheckForm'
import CategoryPieChart from './components/CategoryPieChart'

function App() {
  const [checks, setChecks] = useState(() => {
    const savedChecks = localStorage.getItem('checks')
    return savedChecks ? JSON.parse(savedChecks) : []
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [editIndex, setEditIndex] = useState(null)
  const [editData, setEditData] = useState(null)
  const [sortBy, setSortBy] = useState('dateDesc')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')

  const handleEdit = (index) => {
  setEditIndex(index)
  setEditData(checks[index])
  }

  const handleSave = (updatedCheck) => {
  setChecks(prev => {
    const newChecks = [...prev]
    newChecks[editIndex] = updatedCheck
    return newChecks
  })
  setEditIndex(null)
  setEditData(null)
  }

  const handleCancelEdit = () => {
  setEditIndex(null)
  setEditData(null)
  }


  const handleAddCheck = (check) => {
    setChecks(prev => [...prev, check])
  }

  const handleDelete = (indexToDelete) => {
    setChecks(prevChecks => prevChecks.filter((_, index) => index !== indexToDelete))
  }

  const filteredAndSortedChecks = checks
  .filter(check => {
    const checkDate = check.date
    if (filterDateFrom && checkDate < filterDateFrom) return false
    if (filterDateTo && checkDate > filterDateTo) return false
    if (!check.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })
  .sort((a, b) => {
    switch (sortBy) {
      case 'dateDesc':
        return b.date.localeCompare(a.date)
      case 'dateAsc':
        return a.date.localeCompare(b.date)
      case 'amountDesc':
        return b.amount - a.amount
      case 'amountAsc':
        return a.amount - b.amount
      case 'categoryAsc':
        return a.category.localeCompare(b.category)
      case 'categoryDesc':
        return b.category.localeCompare(a.category)
      default:
        return 0
    }
  })

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Учёт расходов</h1>
    
      {/* Поле поиска */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Поиск по названию"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', maxWidth: '400px' }}
        />
      </div>
      
      {/* Эдитор чеков */}
      {editIndex !== null && (
        <EditCheckForm
          initialData={editData}
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Форма добавления */}
      <div style={{ marginBottom: '2rem' }}>
        <AddCheckForm onAdd={handleAddCheck} />
      </div>

      {/* Селектор для сортировки */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Сортировка: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="dateDesc">Дата (новые сверху)</option>
          <option value="dateAsc">Дата (старые сверху)</option>
          <option value="amountDesc">Сумма (по убыванию)</option>
          <option value="amountAsc">Сумма (по возрастанию)</option>
          <option value="categoryAsc">Категория (А-Я)</option>
          <option value="categoryDesc">Категория (Я-А)</option>
        </select>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label>Период с: </label>
        <input 
          type="date" 
          value={filterDateFrom} 
          onChange={(e) => setFilterDateFrom(e.target.value)} 
        />
        <label style={{ marginLeft: '1rem' }}>по: </label>
        <input 
          type="date" 
          value={filterDateTo} 
          onChange={(e) => setFilterDateTo(e.target.value)} 
        />
      </div>

      {/* Список чеков + с кнопкой удаления + сортировкой */}
      <h2>Список чеков</h2>
      <ul>
        {filteredAndSortedChecks.map((check, index) => (
          <li key={index} style={{ marginBottom: '0.5rem' }}>
            {check.date} — {check.name} — {check.amount}₽ — {check.category}
            <button 
              style={{ marginLeft: '1rem' }} 
              onClick={() => handleDelete(index)}
            >
              Удалить
            </button>
            <button 
              style={{ marginLeft: '1rem' }} 
              onClick={() => handleEdit(index)}
            >
              Редактировать
            </button>
          </li>
        ))}
      </ul>

      { /* График столбчатый*/ }
      <StatsChart checks={checks} />
      
      { /* Круговая диаграмма */ }
      <CategoryPieChart checks={checks} />
    </div>
  )
}

export default App