import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import FilterPanel from '../components/FilterPanel'
import VehicleCard from '../components/VehicleCard'

export default function Inventory() {
  const [vehicles, setVehicles] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
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
  const [sort, setSort] = useState('price-asc')

  useEffect(() => {
    fetch('/vehicles.json')
      .then((r) => r.json())
      .then(setVehicles)
      .catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    let result = [...vehicles]

    if (filters.make !== 'All') result = result.filter((v) => v.make === filters.make)
    if (filters.fuelType !== 'All') result = result.filter((v) => v.fuelType === filters.fuelType)
    if (filters.transmission !== 'All') result = result.filter((v) => v.transmission === filters.transmission)
    if (filters.minYear) result = result.filter((v) => v.year >= Number(filters.minYear))
    if (filters.maxYear) result = result.filter((v) => v.year <= Number(filters.maxYear))
    if (filters.minPrice) result = result.filter((v) => v.price >= Number(filters.minPrice))
    if (filters.maxPrice) result = result.filter((v) => v.price <= Number(filters.maxPrice))
    if (filters.minMileage) result = result.filter((v) => v.mileage >= Number(filters.minMileage))
    if (filters.maxMileage) result = result.filter((v) => v.mileage <= Number(filters.maxMileage))

    const [field, dir] = sort.split('-')
    result.sort((a, b) => {
      const mul = dir === 'asc' ? 1 : -1
      return (a[field] - b[field]) * mul
    })

    return result
  }, [vehicles, filters, sort])

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory</h1>
            <p className="text-gray-500 mt-1">{filtered.length} vehicles available</p>
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="sm:hidden btn-primary flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            sort={sort}
            setSort={setSort}
            isOpen={filterOpen}
            onClose={() => setFilterOpen(false)}
          />

          <div className="flex-1">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No vehicles found</h3>
                <p className="text-gray-500 text-sm">Try adjusting your filters</p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((v, i) => (
                  <VehicleCard key={v.id} vehicle={v} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
