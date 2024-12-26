'use client'

import { useState, useEffect, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { Book, Loader2, GraduationCap, Clock, Calendar, ChevronRight } from 'lucide-react'

interface Lesson {
  id: string
  topic: string
  youtubeLink: string
  date: string  // Added date field
}

interface LessonListProps {
  onSelectLesson: (lessonId: string) => void
}

const CACHE_KEY = 'lesson_cache'
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('hi-IN', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Memoized Lesson Card Component
const LessonCard = memo(({ 
  lesson, 
  isHovered, 
  onHover, 
  onSelect 
}: { 
  lesson: Lesson
  isHovered: boolean
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}) => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    onHoverStart={() => onHover(lesson.id)}
    onHoverEnd={() => onHover(null)}
  >
    <motion.button
      onClick={() => onSelect(lesson.id)}
      className="w-full text-left px-8 py-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border-2 border-transparent hover:border-indigo-300 group relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-indigo-50/50"
          layoutId="hoverBackground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      <div className="relative flex items-center gap-6">
        <div className="p-4 bg-indigo-100/80 rounded-xl group-hover:bg-indigo-200/80 transition-colors">
          <Book className="w-8 h-8 text-indigo-600" />
        </div>
        
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
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(lesson.date)}
            </span>
          </div>
        </div>

        <ChevronRight className="w-8 h-8 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.button>
  </motion.li>
))

LessonCard.displayName = 'LessonCard'

// Memoized Header Component
const Header = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-16"
  >
    <div className="relative w-20 h-20 mx-auto mb-6">
      <GraduationCap className="w-20 h-20 text-indigo-600" />
    </div>
    
    <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
      Choose a History Lesson
    </h2>
    <p className="text-gray-600 mt-4 text-lg">
      Embark on a journey through time and knowledge
    </p>
  </motion.div>
))

Header.displayName = 'Header'

// Main Component
export default function LessonList({ onSelectLesson }: LessonListProps) {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredLesson, setHoveredLesson] = useState<string | null>(null)

  const fetchLessons = useCallback(async () => {
    try {
      // Check cache first
      const cachedData = localStorage.getItem(CACHE_KEY)
      if (cachedData) {
        const { timestamp, lessons } = JSON.parse(cachedData)
        if (Date.now() - timestamp < CACHE_DURATION) {
          setLessons(lessons)
          setLoading(false)
          return
        }
      }

      // Fetch if cache invalid
      const response = await fetch(
        'https://quiz-app-1072083660725.us-central1.run.app/api/v1/lessons/subject/History',
        { next: { revalidate: 3600 } }
      )
      const data = await response.json()

      // Sort lessons by date in descending order
      const sortedLessons = data.sort((a: Lesson, b: Lesson) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )

      setLessons(sortedLessons)
      localStorage.setItem(CACHE_KEY, JSON.stringify({ 
        timestamp: Date.now(), 
        lessons: sortedLessons 
      }))
    } catch (error) {
      console.error('Error fetching lessons:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLessons()
  }, [fetchLessons])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          <p className="text-xl text-gray-600 mt-6 font-medium">
            Loading your journey through history...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Header />

        <motion.ul className="space-y-6">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isHovered={hoveredLesson === lesson.id}
              onHover={setHoveredLesson}
              onSelect={onSelectLesson}
            />
          ))}
        </motion.ul>
      </div>
    </div>
  )
}