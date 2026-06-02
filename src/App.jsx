import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Inventory = lazy(() => import('./pages/Inventory'))
const VehicleDetail = lazy(() => import('./pages/VehicleDetail'))
const Compare = lazy(() => import('./pages/Compare'))
const Financing = lazy(() => import('./pages/Financing'))
const TradeIn = lazy(() => import('./pages/TradeIn'))
const Contact = lazy(() => import('./pages/Contact'))

function Loading() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/:id" element={<VehicleDetail />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/trade-in" element={<TradeIn />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
