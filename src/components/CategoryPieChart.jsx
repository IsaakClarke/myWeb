import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6666', '#66CC99']

const groupByCategory = (checks) => {
  const map = {}

  checks.forEach(({ category, amount }) => {
    map[category] = (map[category] || 0) + parseFloat(amount)
  })

  return Object.entries(map).map(([category, amount]) => ({ category, amount }))
}

const CategoryPieChart = ({ checks }) => {
  const data = groupByCategory(checks)

  return (
    <div style={{ width: '100%', height: 300, marginTop: '2rem' }}>
      <h2>Расходы по категориям</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CategoryPieChart
