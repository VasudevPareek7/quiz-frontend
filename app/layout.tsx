import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Modern History Quiz App',
  description: 'Learn history through interactive quizzes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>{children}
        <Analytics />
      </body>
    </html>
  )
}



