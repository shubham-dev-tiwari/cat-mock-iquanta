"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CircularProgress from './CircularProgress'
import StatCard from './StatCard'
import { useQuizStore } from '@/lib/store'

export default function RightSidebar({ isMobile = false }) {
  const { 
    totalQuizzes, 
    correctAnswers, 
    wrongAnswers, 
    accuracy, 
    totalPoints,
    currentStreak 
  } = useQuizStore()

  const statsData = [
    {
      value: totalQuizzes,
      label: "Tests Taken"
    },
    {
      value: correctAnswers,
      label: "Correct Answers"
    },
    {
      value: wrongAnswers,
      label: "Wrong Answers"
    },
    {
      value: `${accuracy}%`,
      label: "Accuracy"
    }
  ]

  if (isMobile) {
    return (
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: '#f9e2af' }}>
                {totalPoints}
              </div>
              <div className="text-xs" style={{ color: '#a6adc8' }}>XP</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: '#a6e3a1' }}>
                {currentStreak}
              </div>
              <div className="text-xs" style={{ color: '#a6adc8' }}>Streak</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold" style={{ color: '#89b4fa' }}>
                {accuracy}%
              </div>
              <div className="text-xs" style={{ color: '#a6adc8' }}>Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardHeader className="pb-4">
          <CardTitle className="text-center">
            <span className="text-sm font-normal" style={{ color: '#a6adc8' }}>
              Tests Summary
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <CircularProgress />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {statsData.map((stat, index) => (
              <StatCard key={index} value={stat.value} label={stat.label} />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: '#a6adc8' }}>Experience Points</span>
              <span className="font-bold" style={{ color: '#f9e2af' }}>{totalPoints} XP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: '#a6adc8' }}>Current Streak</span>
              <span className="font-bold" style={{ color: '#a6e3a1' }}>{currentStreak} 🔥</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: '#a6adc8' }}>Best Performance</span>
              <span className="font-bold" style={{ color: '#89b4fa' }}>92%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
