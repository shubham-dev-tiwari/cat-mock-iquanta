"use client"

import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function BackButton({ 
  onClick, 
  href = '/dashboard',
  text = 'Back to Dashboard',
  variant = 'outline',
  className = '',
  showIcon = true 
}) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      router.push(href)
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      className={`transition-all duration-200 ${className}`}
      style={{
        backgroundColor: variant === 'outline' ? 'transparent' : '#89b4fa',
        borderColor: variant === 'outline' ? '#585b70' : 'transparent',
        color: variant === 'outline' ? '#cdd6f4' : '#1e1e1e'
      }}
    >
      {showIcon && <ArrowLeft className="h-4 w-4 mr-2" />}
      {text}
    </Button>
  )
}
