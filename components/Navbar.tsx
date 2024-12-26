'use client'

import { memo } from 'react'
import Link from 'next/link'
import { History, HomeIcon, Info } from 'lucide-react'

// Navigation links data
const NAV_LINKS = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/about', label: 'About', icon: Info },
] as const

// Memoized NavLink component
const NavLink = memo(({ href, label, icon: Icon }: {
  href: string
  label: string
  icon: typeof HomeIcon
}) => (
  <Link 
    href={href}
    className="group flex items-center space-x-2 text-slate-400 hover:text-slate-200 transition-colors duration-200"
  >
    <Icon className="w-4 h-4 transition-colors duration-200" />
    <span>{label}</span>
  </Link>
))

NavLink.displayName = 'NavLink'

// Main Navbar component
export default function Navbar() {
  return (
    <nav className="bg-slate-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <History className="w-6 h-6 text-slate-300" />
            <span className="text-xl font-semibold text-slate-100">
              HistoryQuiz
            </span>
          </Link>

          {/* Navigation */}
          <ul className="flex space-x-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink {...link} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}