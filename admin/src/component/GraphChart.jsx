import React from 'react'
import { Line } from 'react-chartjs-2'
/* eslint-disable no-unused-vars */
import {Chart as ChartJS} from 'chart.js/auto'
function GraphChart({chartData}) {
  return (
    <Line data={chartData} />
  )
}

export default GraphChart
