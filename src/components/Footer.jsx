import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BSL</span>
              </div>
              Big Smart <span className="font-light">luxury ride</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Premium car sales with a passion for excellence. We curate the finest vehicles for
              enthusiasts who demand the best.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/inventory" className="hover:text-white transition-colors">Inventory</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Compare</Link></li>
              <li><Link to="/financing" className="hover:text-white transition-colors">Financing</Link></li>
              <li><Link to="/trade-in" className="hover:text-white transition-colors">Trade-In</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Elite Drive</li>
              <li>Beverly Hills, CA 90210</li>
              <li>+1 (555) 123-4567</li>
              <li>hello@bigsmart.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Big Smart luxury ride. All rights reserved. This is a demo project.
        </div>
      </div>
    </footer>
  )
}
