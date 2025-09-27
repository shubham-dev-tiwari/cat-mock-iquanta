"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/lib/store'
import Navbar from '@/components/navbar/Navbar'
import MainArea from '@/components/main-area/MainArea'
import RightSidebar from '@/components/right-sidebar/RightSidebar'
import QuizInterface from '@/components/quiz/QuizInterface'

export default function Dashboard() {
  const { isAuthenticated, quizStarted } = useQuizStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  if (quizStarted) {
    return <QuizInterface />
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #1e1e1e 0%, #313244 25%, #1e1e1e 50%, #313244 75%, #1e1e1e 100%)'
      }}
    >
      <Navbar />
      <main className="grid lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 py-6">
        <div className="lg:col-span-3">
          <MainArea />
        </div>
        <div className="lg:col-span-1">
          <RightSidebar />
        </div>
      </main>
    </div>
  )
}
