'use client'

import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'

// Dynamic imports with loading fallbacks
const LessonList = dynamic(() => import('../components/LessonList'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-96">
      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
})

const LessonDetails = dynamic(() => import('../components/LessonDetails'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-96">
      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  )
})

// Simple fade variants for main content
const contentVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <Suspense fallback={null}>
        <main className="flex-grow container mx-auto px-4 py-8">
          <motion.h1 
            className="text-4xl font-bold mb-8 text-center text-indigo-600"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            transition={{ duration: 0.3 }}
          >
            Explore History
          </motion.h1>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedLesson ? 'lesson' : 'list'}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.2 }}
            >
              {!selectedLesson ? (
                <LessonList onSelectLesson={setSelectedLesson} />
              ) : (
                <LessonDetails 
                  lessonId={selectedLesson} 
                  onBack={() => setSelectedLesson(null)} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </Suspense>
    </div>
  )
}