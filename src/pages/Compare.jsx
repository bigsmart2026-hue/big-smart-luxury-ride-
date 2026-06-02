import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const formatPrice = (p) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p)

const formatMileage = (m) =>
  new Intl.NumberFormat('en-US').format(m) + ' mi'

export default function Compare() {
  const [vehicles, setVehicles] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    fetch('/vehicles.json')
      .then((r) => r.json())
      .then(setVehicles)
      .catch(() => {})
  }, [])

  const toggleVehicle = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }

  const compareVehicles = vehicles.filter((v) => selected.includes(v.id))

  const specRows = [
    { label: 'Year', key: 'year' },
    { label: 'Price', key: 'price', format: formatPrice },
    { label: 'Mileage', key: 'mileage', format: formatMileage },
    { label: 'Engine', key: 'engine' },
    { label: 'Horsepower', key: 'horsepower', format: (v) => `${v} hp` },
    { label: 'Transmission', key: 'transmission' },
    { label: 'Fuel Type', key: 'fuelType' },
    { label: 'Color', key: 'color' },
    { label: 'Trim', key: 'trim' },
  ]

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Vehicles</h1>
          <p className="text-gray-500 mb-6">Select up to 3 vehicles to compare side by side.</p>
        </motion.div>

        {/* Vehicle selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {vehicles.map((v) => {
              const isSelected = selected.includes(v.id)
              const isDisabled = selected.length >= 3 && !isSelected
              return (
                <button
                  key={v.id}
                  onClick={() => toggleVehicle(v.id)}
                  disabled={isDisabled}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-primary-600 text-white shadow-md'
                      : isDisabled
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {v.year} {v.make} {v.model}
                </button>
              )
            })}
          </div>
          <p className="text-xs text-gray-400 mt-2">{selected.length}/3 vehicles selected</p>
        </div>

        {compareVehicles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Select vehicles to compare</h3>
            <p className="text-gray-500 text-sm">Choose from the options above</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left text-sm font-medium text-gray-500 w-40">Specification</th>
                  {compareVehicles.map((v) => (
                    <th key={v.id} className="p-4 text-center min-w-[200px]">
                      <img
                        src={v.images[0]}
                        alt={`${v.year} ${v.make} ${v.model}`}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                        loading="lazy"
                      />
                      <Link to={`/inventory/${v.id}`} className="text-sm font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                        {v.year} {v.make} {v.model}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => (
                  <tr key={row.key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-4 text-sm font-medium text-gray-700">{row.label}</td>
                    {compareVehicles.map((v) => (
                      <td key={v.id} className="p-4 text-sm text-gray-600 text-center">
                        {row.format ? row.format(v[row.key]) : v[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
