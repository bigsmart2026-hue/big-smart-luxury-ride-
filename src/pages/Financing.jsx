import { useState } from 'react'
import { motion } from 'framer-motion'

const formatPrice = (p) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(p)

export default function Financing() {
  const [form, setForm] = useState({
    price: '80000',
    downPayment: '10000',
    interestRate: '6.5',
    loanTerm: '60',
  })

  const price = Number(form.price) || 0
  const downPayment = Number(form.downPayment) || 0
  const interestRate = Number(form.interestRate) || 0
  const loanTerm = Number(form.loanTerm) || 1

  const loanAmount = price - downPayment

  const monthlyRate = interestRate / 100 / 12
  let monthlyPayment = 0

  if (monthlyRate > 0 && loanAmount > 0) {
    monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1)
  } else if (loanAmount > 0) {
    monthlyPayment = loanAmount / loanTerm
  }

  const totalPayment = monthlyPayment * loanTerm
  const totalInterest = totalPayment - loanAmount

  const handleChange = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Calculator</h1>
          <p className="text-gray-500 mb-8">Estimate your monthly car payment.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Price</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment</label>
              <input
                type="number"
                value={form.downPayment}
                onChange={(e) => handleChange('downPayment', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={form.interestRate}
                onChange={(e) => handleChange('interestRate', e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (months)</label>
              <select
                value={form.loanTerm}
                onChange={(e) => handleChange('loanTerm', e.target.value)}
                className="select-field"
              >
                <option value="36">36 months</option>
                <option value="48">48 months</option>
                <option value="60">60 months</option>
                <option value="72">72 months</option>
                <option value="84">84 months</option>
              </select>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-6 text-white space-y-6">
              <div className="text-center pb-4 border-b border-white/20">
                <p className="text-primary-200 text-sm mb-1">Monthly Payment</p>
                <p className="text-4xl font-bold">{formatPrice(monthlyPayment)}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-primary-200">Vehicle Price</span>
                  <span className="font-semibold">{formatPrice(price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-200">Down Payment</span>
                  <span className="font-semibold">{formatPrice(downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-200">Loan Amount</span>
                  <span className="font-semibold">{formatPrice(loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary-200">Total Interest</span>
                  <span className="font-semibold">{formatPrice(totalInterest)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/20">
                  <span className="text-primary-200">Total Payment</span>
                  <span className="font-bold">{formatPrice(totalPayment)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
              <strong>Disclaimer:</strong> This is an estimate only. Actual rates and terms depend on credit approval.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
