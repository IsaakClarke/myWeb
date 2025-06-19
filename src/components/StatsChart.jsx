import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

const groupByMonth = (checks) => {
  const result = Array(12).fill(0)

  checks.forEach(check => {
    const date = new Date(check.date)
    const month = date.getMonth()
    result[month] += parseFloat(check.amount)
  })

  return result.map((sum, index) => ({
    month: new Date(0, index).toLocaleString('ru-RU', { month: 'short' }),
    amount: sum,
  }))
}

const StatsChart = ({ checks }) => {
  const data = groupByMonth(checks)

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Расходы по месяцам</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatsChart