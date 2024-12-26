'use client'

import { useState, useEffect, memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Youtube, Loader2, BookOpen } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import QuestionList with a loading state
const QuestionList = dynamic(() => import('./QuestionList'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />
})

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

// Memoized header component
const LessonHeader = memo(({ topic, youtubeLink, onBack }: {
  topic: string
  youtubeLink: string
  onBack: () => void
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
    <button
      onClick={onBack}
      className="group flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors mb-6"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back to Lessons</span>
    </button>

    <div className="flex items-center space-x-3 mb-6">
      <BookOpen className="w-8 h-8 text-indigo-600" />
      <h2 className="text-3xl font-bold text-gray-800">
        {topic}
      </h2>
    </div>

    <a
      href={youtubeLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
    >
      <Youtube className="w-5 h-5" />
      <span>Watch Video Lesson</span>
    </a>
  </div>
))

LessonHeader.displayName = 'LessonHeader'

export default function LessonDetails({ lessonId, onBack }: LessonDetailsProps) {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLesson() {
      try {
        const response = await fetch(
          'https://quiz-app-1072083660725.us-central1.run.app/api/v1/lessons/subject/History',
          {
            next: { revalidate: 3600 } // Cache for 1 hour
          }
        )
        const data = await response.json()
        const selectedLesson = data.find((l: Lesson) => l.id === lessonId)
        setLesson(selectedLesson)
      } catch (error) {
        console.error('Error fetching lesson:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLesson()
  }, [lessonId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold text-red-600">Lesson Not Found</h3>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
        >
          Return to Lessons
        </button>
      </div>
    )
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <LessonHeader
        topic={lesson.topic}
        youtubeLink={lesson.youtubeLink}
        onBack={onBack}
      />
      
      <QuestionList questions={lesson.questions} />
    </motion.div>
  )
}