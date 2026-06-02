import { useState } from 'react'
import { motion } from 'framer-motion'

const formatPrice = (p) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p)

// Static depreciation formula:
// Value = MSRP * (0.9 ^ years_old) - (mileage * 0.05)
// Roughly 10% depreciation per year + small mileage deduction
const estimateValue = (msrp, year, mileage) => {
  const currentYear = new Date().getFullYear()
  const age = Math.max(0, currentYear - year)
  const depreciationFactor = Math.pow(0.9, age)
  let value = msrp * depreciationFactor - mileage * 0.05
  return Math.max(0, Math.round(value))
}

const popularMakes = ['BMW', 'Mercedes-Benz', 'Porsche', 'Audi', 'Lexus', 'Toyota', 'Honda', 'Ford', 'Tesla', 'Chevrolet', 'Nissan', 'Mazda']

export default function TradeIn() {
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: 'good',
  })
  const [result, setResult] = useState(null)

  const handleChange = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setResult(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const msrp = Math.floor(Math.random() * 60000) + 20000 // estimate MSRP
    const estimatedValue = estimateValue(msrp, Number(form.year), Number(form.mileage))
    const conditionMultiplier =
      form.condition === 'excellent' ? 1.1 : form.condition === 'good' ? 1.0 : form.condition === 'fair' ? 0.85 : 0.7
    const finalValue = Math.round(estimatedValue * conditionMultiplier)

    setResult({
      estimatedValue: finalValue,
      msrp,
      condition: form.condition,
    })
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trade-In Valuation</h1>
          <p className="text-gray-500 mb-8">Get an instant estimate for your vehicle.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                <select
                  value={form.make}
                  onChange={(e) => handleChange('make', e.target.value)}
                  required
                  className="select-field"
                >
                  <option value="">Select make</option>
                  {popularMakes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input
                  type="text"
                  value={form.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                  required
                  className="input-field"
                  placeholder="e.g. 911 Carrera"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  value={form.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  required
                  min="2000"
                  max={new Date().getFullYear() + 1}
                  className="input-field"
                  placeholder="e.g. 2020"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
                <input
                  type="number"
                  value={form.mileage}
                  onChange={(e) => handleChange('mileage', e.target.value)}
                  required
                  className="input-field"
                  placeholder="e.g. 30000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  value={form.condition}
                  onChange={(e) => handleChange('condition', e.target.value)}
                  className="select-field"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full">
                Get Estimate
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {result ? (
              <div className="bg-gradient-to-br from-accent-600 to-accent-800 rounded-xl p-6 text-white space-y-4">
                <div className="text-center pb-4 border-b border-white/20">
                  <p className="text-accent-200 text-sm mb-1">Estimated Trade-In Value</p>
                  <p className="text-4xl font-bold">{formatPrice(result.estimatedValue)}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-accent-200">Estimated MSRP</span>
                    <span className="font-semibold">{formatPrice(result.msrp)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-accent-200">Condition</span>
                    <span className="font-semibold capitalize">{result.condition}</span>
                  </div>
                </div>
                <p className="text-accent-200 text-xs mt-4">
                  This is a static estimate based on a simplified depreciation formula.
                  Actual value depends on a full inspection.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <p>Fill in the form to get your estimate</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
