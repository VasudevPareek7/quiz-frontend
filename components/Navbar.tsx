'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { History, HomeIcon, Info } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  return (
    <motion.div
      className="relative"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <motion.nav className="bg-slate-900 shadow-md relative z-10">
        {/* Subtle accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-slate-700" />

        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo section with minimal animation */}
            <Link 
              href="/" 
              className="relative flex items-center group"
            >
              <History className="w-6 h-6 text-slate-300 mr-2" />
              <span className="text-xl font-semibold text-slate-100">
                HistoryQuiz
              </span>
            </Link>

            {/* Navigation links with subtle hover effects */}
            <ul className="flex space-x-8">
              {[
                { href: '/', label: 'Home', icon: HomeIcon },
                { href: '/about', label: 'About', icon: Info },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="relative flex items-center space-x-2 group"
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <link.icon className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
                    </motion.div>
                    <span className="text-slate-400 group-hover:text-slate-200 transition-colors">
                      {link.label}
                    </span>
                    
                    {/* Subtle underline effect */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-slate-400 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredLink === link.href ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  )
}