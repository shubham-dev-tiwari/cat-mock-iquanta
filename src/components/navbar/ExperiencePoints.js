"use client"

import { useQuizStore } from '@/lib/store'
import { Trophy, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function ExperiencePoints() {
  const { totalPoints, currentStreak } = useQuizStore()

  return (
    <div className="flex items-center space-x-3">
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-9 px-3 transition-all duration-200"
        style={{ 
          backgroundColor: 'transparent',
          '&:hover': { backgroundColor: '#45475a' }
        }}
      >
        <Trophy className="h-4 w-4 mr-2" style={{ color: '#f9e2af' }} />
        <Badge 
          variant="secondary" 
          className="font-semibold border"
          style={{ 
            backgroundColor: '#45475a',
            color: '#f9e2af',
            borderColor: '#f9e2af50'
          }}
        >
          {totalPoints} XP
        </Badge>
      </Button>

      {currentStreak > 0 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-3 transition-all duration-200"
          style={{ 
            backgroundColor: 'transparent',
            '&:hover': { backgroundColor: '#45475a' }
          }}
        >
          <TrendingUp className="h-4 w-4 mr-2" style={{ color: '#a6e3a1' }} />
          <Badge 
            variant="outline" 
            className="font-semibold"
            style={{ 
              color: '#a6e3a1',
              borderColor: '#a6e3a150'
            }}
          >
            {currentStreak} 🔥
          </Badge>
        </Button>
      )}
    </div>
  )
}
