import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollCar() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], [-300, typeof window !== 'undefined' ? window.innerWidth + 300 : 800])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

  return (
    <section ref={ref} className="relative h-64 bg-gradient-to-r from-gray-900 via-primary-900 to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 flex items-center">
        <div className="w-full text-center mb-12">
          <p className="text-white/40 text-sm uppercase tracking-widest">Scroll to explore our collection</p>
        </div>
      </div>

      {isVisible && (
        <motion.div
          className="absolute bottom-8"
          style={{ x, rotate, scale }}
        >
          <div className="relative">
            <svg width="200" height="80" viewBox="0 0 200 80" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="carBody" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <linearGradient id="carBody2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
              <ellipse cx="40" cy="65" rx="12" ry="8" fill="#1a1a2e" />
              <ellipse cx="160" cy="65" rx="12" ry="8" fill="#1a1a2e" />
              <ellipse cx="40" cy="65" rx="8" ry="5" fill="#333" />
              <ellipse cx="160" cy="65" rx="8" ry="5" fill="#333" />
              <path d="M20 55 L30 30 L60 25 L100 25 L140 30 L170 40 L175 55 Z" fill="url(#carBody)" stroke="#b91c1c" strokeWidth="1" />
              <rect x="55" y="30" width="25" height="18" rx="3" fill="#1e3a8a" opacity="0.6" />
              <rect x="85" y="30" width="30" height="18" rx="3" fill="#1e3a8a" opacity="0.6" />
              <circle cx="40" cy="65" r="4" fill="#fff" opacity="0.3" />
              <circle cx="160" cy="65" r="4" fill="#fff" opacity="0.3" />
              <rect x="175" y="48" width="20" height="6" rx="2" fill="#dc2626" />
              <rect x="15" y="48" width="10" height="4" rx="2" fill="#ef4444" />
              <ellipse cx="60" cy="25" rx="4" ry="3" fill="#ef4444" opacity="0.8" />
            </svg>
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-white text-xs font-bold whitespace-nowrap bg-primary-600/80 px-2 py-0.5 rounded-full">
              Big Smart
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}
