import { motion, AnimatePresence } from 'framer-motion'

const makes = ['All', 'BMW', 'Mercedes-Benz', 'Porsche', 'Audi', 'Lexus', 'Toyota', 'Honda', 'Ford', 'Tesla', 'Chevrolet', 'Nissan', 'Mazda']
const fuelTypes = ['All', 'Petrol', 'Electric']
const transmissions = ['All', 'Automatic', 'Manual']
const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'year-desc', label: 'Year: Newest First' },
  { value: 'year-asc', label: 'Year: Oldest First' },
  { value: 'mileage-asc', label: 'Mileage: Low to High' },
  { value: 'mileage-desc', label: 'Mileage: High to Low' },
]

export default function FilterPanel({ filters, setFilters, sort, setSort, isOpen, onClose }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      make: 'All',
      fuelType: 'All',
      transmission: 'All',
      minYear: '',
      maxYear: '',
      minPrice: '',
      maxPrice: '',
      minMileage: '',
      maxMileage: '',
    })
    setSort('price-asc')
  }

  const panelContent = (
    <div className="h-full overflow-y-auto">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <div className="flex gap-2">
            <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
              Clear all
            </button>
            <button onClick={onClose} className="sm:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select-field"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Make */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
          <div className="flex flex-wrap gap-2">
            {makes.map((m) => (
              <button
                key={m}
                onClick={() => handleChange('make', m)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filters.make === m
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
          <div className="flex gap-2">
            {fuelTypes.map((f) => (
              <button
                key={f}
                onClick={() => handleChange('fuelType', f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filters.fuelType === f
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
          <div className="flex gap-2">
            {transmissions.map((t) => (
              <button
                key={t}
                onClick={() => handleChange('transmission', t)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filters.transmission === t
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Year Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Year Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minYear}
              onChange={(e) => handleChange('minYear', e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxYear}
              onChange={(e) => handleChange('maxYear', e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min $"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Max $"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        {/* Mileage Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min mi"
              value={filters.minMileage}
              onChange={(e) => handleChange('minMileage', e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              placeholder="Max mi"
              value={filters.maxMileage}
              onChange={(e) => handleChange('maxMileage', e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <button onClick={onClose} className="btn-primary w-full sm:hidden">
          Show Results
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden sm:block w-72 shrink-0">
        <div className="sticky top-20 bg-white rounded-xl shadow-md border border-gray-200 max-h-[calc(100vh-6rem)]">
          {panelContent}
        </div>
      </div>

      {/* Mobile slide-in */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl sm:hidden"
            >
              {panelContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
