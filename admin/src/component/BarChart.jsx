import React from 'react'
import { Bar } from 'react-chartjs-2'
// eslint-disable-next-line no-unused-vars
import {Chart as ChartJS} from 'chart.js/auto'

function BarChart({chartData}) {
  return (
    <Bar data={chartData} />
  )
}

export default BarChart
