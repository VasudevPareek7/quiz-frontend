'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Youtube, ArrowLeft, GraduationCap, PlayCircle, History } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-30"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.2, 0.3],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <main className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <History className="w-10 h-10 text-indigo-600" />
          <h1 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            About HistoryQuiz
          </h1>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-indigo-50">
            <div className="p-8 sm:p-12">
              {/* Profile Section */}
              <motion.div 
                className="flex flex-col items-center mb-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div 
                  className="w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1 mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <GraduationCap className="w-20 h-20 text-indigo-600" />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="text-center space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Upasana Pareek
                  </h2>
                  <p className="text-gray-600 font-medium">
                    Creator & Lead Instructor
                  </p>
                </motion.div>
              </motion.div>

              {/* Description */}
              <motion.div 
                className="mb-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  हमारी टीम की प्रमुख विशेषज्ञ उपासना पारीक, जो MA, M.Ed, NET, SLET उत्तीर्ण एवं इतिहास की विद्वान हैं, के मार्गदर्शन में हम प्रतियोगी परीक्षाओं की तैयारी में आपकी सहायता करते हैं। हमारा विशेष फोकस इतिहास के महत्वपूर्ण ऐतिहासिक विषयों पर है
                </p>
              </motion.div>

              {/* YouTube Section */}
              <motion.div
                className="flex flex-col items-center gap-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
                  <PlayCircle className="w-6 h-6" />
                  Check out our YouTube Channel
                </h3>
                
                <Link 
                  href="https://www.youtube.com/@sumanlatayadavhindi/playlists" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.button
                    className="relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full flex items-center gap-3 hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Youtube className="w-6 h-6" />
                    <span className="font-semibold">Visit our YouTube Channel</span>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Back Button */}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link href="/" className="group">
                  <motion.button
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center gap-3 hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    <span className="font-semibold">Back to Quizzes</span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}