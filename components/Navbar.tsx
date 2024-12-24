'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { History, HomeIcon, Info, Sparkles } from 'lucide-react'
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
      {/* Glassmorphism background */}
      <motion.nav 
        className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg relative z-10"
      >
        {/* Animated gradient border */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        />

        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo section with animated sparkles */}
            <Link 
              href="/" 
              className="relative flex items-center group"
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <History className="w-8 h-8 text-indigo-600 mr-2" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                HistoryQuiz
              </span>
              <Sparkles className="w-4 h-4 text-indigo-400 absolute -top-1 -right-4" />
            </Link>

            {/* Navigation links with hover effects */}
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
                      className="absolute -inset-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100"
                      initial={false}
                      animate={hoveredLink === link.href ? {
                        scale: [1, 1.1, 1],
                        opacity: [0, 1, 0]
                      } : {}}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <link.icon className="w-4 h-4 text-indigo-600" />
                    </motion.div>
                    <span className="text-gray-700 group-hover:text-indigo-600 transition-colors">
                      {link.label}
                    </span>
                    
                    {/* Underline effect */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredLink === link.href ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* Ambient light effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
      </div>
    </motion.div>
  )
}