import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ImageGallery from '../components/ImageGallery'
import ContactModal from '../components/ContactModal'

const formatPrice = (p) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p)

const formatMileage = (m) =>
  new Intl.NumberFormat('en-US').format(m) + ' mi'

export default function VehicleDetail() {
  const { id } = useParams()
  const [vehicle, setVehicle] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('/vehicles.json')
      .then((r) => r.json())
      .then((data) => {
        const v = data.find((d) => d.id === Number(id))
        setVehicle(v || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Not Found</h2>
          <Link to="/inventory" className="text-primary-600 hover:underline">Back to Inventory</Link>
        </div>
      </div>
    )
  }

  const specs = [
    { label: 'Year', value: vehicle.year },
    { label: 'Make', value: vehicle.make },
    { label: 'Model', value: vehicle.model },
    { label: 'Trim', value: vehicle.trim },
    { label: 'Price', value: formatPrice(vehicle.price) },
    { label: 'Mileage', value: formatMileage(vehicle.mileage) },
    { label: 'Fuel Type', value: vehicle.fuelType },
    { label: 'Transmission', value: vehicle.transmission },
    { label: 'Engine', value: vehicle.engine },
    { label: 'Horsepower', value: `${vehicle.horsepower} hp` },
    { label: 'Color', value: vehicle.color },
    { label: 'VIN', value: vehicle.vin },
  ]

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/inventory" className="hover:text-primary-600 transition-colors">Inventory</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ImageGallery images={vehicle.images} vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-lg text-gray-500">{vehicle.trim}</p>
            </div>

            <div className="text-4xl font-bold text-primary-600">{formatPrice(vehicle.price)}</div>

            <p className="text-gray-600 leading-relaxed">{vehicle.description}</p>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => setModalOpen(true)} className="btn-primary">
                Request Test Drive
              </button>
              <Link to="/financing" className="btn-secondary">
                Calculate Payment
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {specs.map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{s.label}</p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      />
    </div>
  )
}
