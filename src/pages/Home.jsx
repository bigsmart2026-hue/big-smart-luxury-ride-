import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import VehicleCard from '../components/VehicleCard'

export default function Home() {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    fetch('/vehicles.json')
      .then((r) => r.json())
      .then(setVehicles)
      .catch(() => {})
  }, [])

  const featured = vehicles.filter((v) => v.featured).slice(0, 6)

  return (
    <>
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🚗', title: '150+ Vehicles', desc: 'Curated inventory' },
              { icon: '💰', title: 'Best Prices', desc: 'Price match guarantee' },
              { icon: '🔧', title: 'Certified', desc: 'Inspected & approved' },
              { icon: '📋', title: 'Financing', desc: 'Easy approval' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-3xl block mb-2">{item.icon}</span>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Inventory */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-2">Featured Collection</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Handpicked for You</h2>
            <p className="text-gray-500 mt-2 max-w-lg mx-auto">
              Each vehicle in our featured collection has been carefully selected for its exceptional quality, performance, and value.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/inventory" className="btn-primary inline-flex items-center gap-2">
              View All Vehicles
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Ready to Find Your Dream Car?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-primary-200 mb-8 max-w-lg mx-auto"
          >
            Schedule a test drive, explore financing options, or get a trade-in valuation — all from the comfort of your home.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/inventory" className="btn-primary bg-white text-primary-800 hover:bg-gray-100 shadow-xl">
              Browse Inventory
            </Link>
            <Link to="/financing" className="btn-secondary border-white text-white hover:bg-white/10">
              Calculate Payment
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
