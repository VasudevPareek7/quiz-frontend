'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Book, Loader2, GraduationCap, Clock, Star, ChevronRight } from 'lucide-react'

interface Lesson {
  id: string
  topic: string
  youtubeLink: string
}

interface LessonListProps {
  onSelectLesson: (lessonId: string) => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      mass: 0.5
    }
  }
}

export default function LessonList({ onSelectLesson }: LessonListProps) {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function fetchLessons() {
      try {
        const response = await fetch('https://quiz-app-1072083660725.us-central1.run.app/api/v1/lessons/subject/History')
        const data = await response.json()
        setLessons(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching lessons:', error)
        setLoading(false)
      }
    }

    fetchLessons()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
        <motion.div 
          className="flex flex-col items-center justify-center min-h-[400px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            <motion.div 
              className="absolute inset-0 rounded-full blur-xl bg-indigo-200 -z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <p className="text-xl text-gray-600 mt-6 font-medium">Loading your journey through history...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30"
        animate={{ 
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          translateY: scrollY * 0.2
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30"
        animate={{ 
          y: [0, -50, 0],
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          translateY: scrollY * -0.2
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="relative w-20 h-20 mx-auto mb-6"
          >
            <GraduationCap className="w-20 h-20 text-indigo-600 absolute inset-0" />
            <motion.div 
              className="absolute inset-0 rounded-full blur-xl bg-indigo-200 -z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-300% animate-gradient">
            Choose a History Lesson
          </h2>
          <p className="text-gray-600 mt-4 text-lg">Embark on a journey through time and knowledge</p>
        </motion.div>

        <motion.ul 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {lessons.map((lesson, index) => (
            <motion.li 
              key={lesson.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredLesson(lesson.id)}
              onHoverEnd={() => setHoveredLesson(null)}
            >
              <motion.button
                onClick={() => onSelectLesson(lesson.id)}
                className="w-full text-left px-8 py-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-300 group relative overflow-hidden"
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-indigo-50/50"
                  initial={false}
                  animate={{
                    opacity: hoveredLesson === lesson.id ? 1 : 0,
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: '200% 200%'
                  }}
                />

                <div className="relative flex items-center gap-6">
                  <motion.div 
                    className="p-4 bg-indigo-100/80 backdrop-blur rounded-xl group-hover:bg-indigo-200/80 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Book className="w-8 h-8 text-indigo-600" />
                  </motion.div>
                  
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {lesson.topic}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center text-sm text-gray-500 group-hover:text-indigo-500">
                        <Clock className="w-4 h-4 mr-1" />
                        20 mins
                      </span>
                      <span className="flex items-center text-sm text-gray-500 group-hover:text-indigo-500">
                        <Star className="w-4 h-4 mr-1" />
                        Beginner Friendly
                      </span>
                    </div>
                  </div>

                  <motion.div
                    className="ml-4"
                    animate={{
                      x: hoveredLesson === lesson.id ? [0, 5, 0] : 0
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <ChevronRight className="w-8 h-8 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
              </motion.button>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      {/* Additional floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-indigo-400"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              delay: i * 2
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: '80%'
            }}
          />
        ))}
      </div>
    </div>
  )
}