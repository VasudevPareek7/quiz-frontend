'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import LessonList from '../components/LessonList'
import LessonDetails from '../components/LessonDetails'

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center text-indigo-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore History
        </motion.h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLesson ? 'lesson' : 'list'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {!selectedLesson ? (
              <LessonList onSelectLesson={setSelectedLesson} />
            ) : (
              <LessonDetails lessonId={selectedLesson} onBack={() => setSelectedLesson(null)} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

