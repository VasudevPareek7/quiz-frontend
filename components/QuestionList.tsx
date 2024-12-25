'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Award } from 'lucide-react'

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

interface QuestionListProps {
  questions: Question[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1 
    }
  }
}

const questionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

const optionLabels = ['A', 'B', 'C', 'D']

export default function QuestionList({ questions }: QuestionListProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))
  const [showExplanations, setShowExplanations] = useState<boolean[]>(new Array(questions.length).fill(false))
  const [score, setScore] = useState(0)
  const [celebratingQuestions, setCelebratingQuestions] = useState<boolean[]>(new Array(questions.length).fill(false))

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (answers[questionIndex] !== null) return

    const newAnswers = [...answers]
    newAnswers[questionIndex] = optionIndex
    setAnswers(newAnswers)

    const newExplanations = [...showExplanations]
    newExplanations[questionIndex] = true
    setShowExplanations(newExplanations)

    if (optionIndex === questions[questionIndex].correctOptionIndex) {
      setScore(score + questions[questionIndex].points)
      const newCelebrating = [...celebratingQuestions]
      newCelebrating[questionIndex] = true
      setCelebratingQuestions(newCelebrating)
      setTimeout(() => {
        const resetCelebrating = [...celebratingQuestions]
        resetCelebrating[questionIndex] = false
        setCelebratingQuestions(resetCelebrating)
      }, 2000)
    }
  }

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="bg-white rounded-lg shadow p-4 sticky top-0 z-10 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-sm font-medium text-gray-500">
          {answers.filter(a => a !== null).length} of {questions.length} answered
        </span>
        <div className="flex items-center gap-2 text-sm font-medium text-indigo-600">
          <Award className="w-4 h-4" />
          <span>Score: {score}</span>
        </div>
      </motion.div>

      {questions.map((question, questionIndex) => (
        <motion.div 
          key={questionIndex}
          className="bg-white rounded-lg shadow-xl p-6 relative overflow-hidden"
          variants={questionVariants}
        >
          {celebratingQuestions[questionIndex] && (
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20" />
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-yellow-400"
                  initial={{ 
                    top: "50%",
                    left: "50%",
                    scale: 0
                  }}
                  animate={{ 
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                    scale: [0, 1, 0],
                    y: [-20, 20],
                    x: [-20, 20]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>
          )}

          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            {questionIndex + 1}. {question.text}
          </h3>

          <ul className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <motion.li 
                key={optionIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: optionIndex * 0.1 }}
              >
                <motion.button
                  onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                  disabled={answers[questionIndex] !== null}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group ${
                    answers[questionIndex] === optionIndex
                      ? optionIndex === question.correctOptionIndex
                        ? 'bg-green-100 text-green-800 border-2 border-green-500'
                        : 'bg-red-100 text-red-800 border-2 border-red-500'
                      : answers[questionIndex] !== null && optionIndex === question.correctOptionIndex
                        ? 'bg-green-50 text-green-800 border-2 border-green-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-transparent hover:border-indigo-300'
                  } ${answers[questionIndex] !== null && optionIndex !== answers[questionIndex] && optionIndex !== question.correctOptionIndex ? 'opacity-50' : ''}`}
                  whileHover={{ scale: answers[questionIndex] === null ? 1.02 : 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                      {optionLabels[optionIndex]}
                    </span>
                    <span>{option}</span>
                  </span>
                  {(answers[questionIndex] === optionIndex || 
                    (answers[questionIndex] !== null && optionIndex === question.correctOptionIndex)) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {optionIndex === question.correctOptionIndex ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                    </motion.span>
                  )}
                </motion.button>
              </motion.li>
            ))}
          </ul>

          <AnimatePresence>
            {showExplanations[questionIndex] && (
              <motion.div 
                className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-base text-indigo-800">{question.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  )
}