'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QuestionList from './QuestionList'
import { ArrowLeft, Youtube, Loader2, BookOpen, AlertCircle } from 'lucide-react'

interface Lesson {
  id: string
  topic: string
  youtubeLink: string
  questions: Question[]
}

interface Question {
  id: string | null
  text: string
  type: string
  options: string[]
  correctOptionIndex: number
  points: number
  hint: string
  explanation: string
}

interface LessonDetailsProps {
  lessonId: string
  onBack: () => void
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3
    }
  }
}

export default function LessonDetails({ lessonId, onBack }: LessonDetailsProps) {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    async function fetchLessonDetails() {
      try {
        const response = await fetch('https://quiz-app-1072083660725.us-central1.run.app/api/v1/lessons/subject/History')
        const data = await response.json()
        const selectedLesson = data.find((l: Lesson) => l.id === lessonId)
        setLesson(selectedLesson)
        setLoading(false)
        // Delay showing content for smooth animation
        setTimeout(() => setShowContent(true), 1000)
      } catch (error) {
        console.error('Error fetching lesson details:', error)
        setLoading(false)
      }
    }

    fetchLessonDetails()
    return () => setShowContent(false)
  }, [lessonId])

  if (loading) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[400px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
        <p className="text-xl text-gray-600">Loading your lesson...</p>
      </motion.div>
    )
  }

  if (!lesson) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[400px] space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-2xl font-semibold text-red-600">Lesson Not Found</h3>
        <p className="text-gray-600">The lesson you're looking for doesn't exist.</p>
        <motion.button
          onClick={onBack}
          className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Return to Lessons
        </motion.button>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {showContent && (
        <motion.div
          className="max-w-4xl mx-auto px-4 py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header Section */}
          <div className="relative mb-12">
            {/* Background Decoration */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            <div className="p-6">
              <motion.button
                onClick={onBack}
                className="group flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors mb-6"
                variants={itemVariants}
                whileHover={{ x: -5 }}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Lessons</span>
              </motion.button>

              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-3 mb-4"
              >
                <BookOpen className="w-8 h-8 text-indigo-600" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {lesson.topic}
                </h2>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="mt-6"
              >
                <a
                  href={lesson.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex group"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-500 blur-md opacity-75 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.button
                    className="relative px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full flex items-center space-x-2 hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Youtube className="w-5 h-5" />
                    <span>Watch Video Lesson</span>
                  </motion.button>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Quiz Section */}
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <QuestionList questions={lesson.questions} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}