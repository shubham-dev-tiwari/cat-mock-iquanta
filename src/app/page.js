"use client"

import { useQuizStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AuthPage from '@/components/auth/AuthPage'

export default function Home() {
  const { isAuthenticated } = useQuizStore()
  const router = useRouter()
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])
  
  if (isAuthenticated) {
    return null // Will redirect to dashboard
  }
  
  return <AuthPage />
}
