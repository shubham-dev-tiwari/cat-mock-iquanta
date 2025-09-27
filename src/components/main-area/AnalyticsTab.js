"use client"

import { useQuizStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3, 
  Target, 
  Clock,
  Zap,
  Calendar,
  Award,
  BookOpen,
  Brain,
  Calculator,
  Globe
} from 'lucide-react'

export default function AnalyticsTab() {
  const { 
    user,
    totalPoints,
    totalQuizzes,
    accuracy,
    currentStreak,
    bestScore,
    weeklyStats,
    performanceHistory,
    completedQuizzes
  } = useQuizStore()

  // Calculate section-wise performance
  const sectionPerformance = {
    quantitative: completedQuizzes.filter(q => q.section === 'quantitative'),
    verbal: completedQuizzes.filter(q => q.section === 'verbal'),
    logical: completedQuizzes.filter(q => q.section === 'logical'),
    general: completedQuizzes.filter(q => q.section === 'general')
  }

  const getSectionAverage = (section) => {
    const sectionQuizzes = sectionPerformance[section]
    if (sectionQuizzes.length === 0) return 0
    return Math.round(sectionQuizzes.reduce((sum, quiz) => sum + quiz.score, 0) / sectionQuizzes.length)
  }

  const getSectionIcon = (section) => {
    switch (section) {
      case 'quantitative':
        return <Calculator className="h-4 w-4" style={{ color: '#89b4fa' }} />
      case 'verbal':
        return <BookOpen className="h-4 w-4" style={{ color: '#a6e3a1' }} />
      case 'logical':
        return <Brain className="h-4 w-4" style={{ color: '#f9e2af' }} />
      case 'general':
        return <Globe className="h-4 w-4" style={{ color: '#cba6f7' }} />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getPerformanceColor = (score) => {
    if (score >= 80) return '#a6e3a1' // Green
    if (score >= 60) return '#f9e2af' // Yellow
    return '#f38ba8' // Red
  }

  const getImprovementTrend = () => {
    if (performanceHistory.length < 5) return null
    
    const recent5 = performanceHistory.slice(-5)
    const older5 = performanceHistory.slice(-10, -5)
    
    if (older5.length === 0) return null
    
    const recentAvg = recent5.reduce((sum, p) => sum + p.score, 0) / recent5.length
    const olderAvg = older5.reduce((sum, p) => sum + p.score, 0) / older5.length
    
    const improvement = ((recentAvg - olderAvg) / olderAvg) * 100
    
    return {
      percentage: Math.abs(Math.round(improvement)),
      isPositive: improvement > 0,
      recentAvg: Math.round(recentAvg),
      olderAvg: Math.round(olderAvg)
    }
  }

  const trend = getImprovementTrend()

  return (
    <div className="space-y-6">
      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Points */}
        <Card 
          className="border"
          style={{ 
            backgroundColor: '#313244',
            borderColor: '#585b70'
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#a6adc8' }}>
                  Total Points
                </p>
                <p className="text-2xl font-bold" style={{ color: '#f9e2af' }}>
                  {totalPoints.toLocaleString()}
                </p>
              </div>
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#f9e2af20' }}
              >
                <Zap className="h-6 w-6" style={{ color: '#f9e2af' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Accuracy */}
        <Card 
          className="border"
          style={{ 
            backgroundColor: '#313244',
            borderColor: '#585b70'
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#a6adc8' }}>
                  Overall Accuracy
                </p>
                <p className="text-2xl font-bold" style={{ color: getPerformanceColor(accuracy) }}>
                  {accuracy}%
                </p>
              </div>
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${getPerformanceColor(accuracy)}20` }}
              >
                <Target className="h-6 w-6" style={{ color: getPerformanceColor(accuracy) }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Streak */}
        <Card 
          className="border"
          style={{ 
            backgroundColor: '#313244',
            borderColor: '#585b70'
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#a6adc8' }}>
                  Current Streak
                </p>
                <p className="text-2xl font-bold" style={{ color: '#a6e3a1' }}>
                  {currentStreak} 🔥
                </p>
              </div>
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#a6e3a120' }}
              >
                <TrendingUp className="h-6 w-6" style={{ color: '#a6e3a1' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Score */}
        <Card 
          className="border"
          style={{ 
            backgroundColor: '#313244',
            borderColor: '#585b70'
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: '#a6adc8' }}>
                  Best Score
                </p>
                <p className="text-2xl font-bold" style={{ color: '#89b4fa' }}>
                  {bestScore}%
                </p>
              </div>
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: '#89b4fa20' }}
              >
                <Award className="h-6 w-6" style={{ color: '#89b4fa' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Performance */}
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2" style={{ color: '#cdd6f4' }}>
            <Calendar className="h-5 w-5" style={{ color: '#89b4fa' }} />
            <span>This Week's Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#89b4fa' }}>
                {weeklyStats.testsThisWeek}
              </div>
              <div className="text-sm" style={{ color: '#a6adc8' }}>
                Tests Taken
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: getPerformanceColor(weeklyStats.avgScoreThisWeek) }}>
                {weeklyStats.avgScoreThisWeek}%
              </div>
              <div className="text-sm" style={{ color: '#a6adc8' }}>
                Average Score
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#f9e2af' }}>
                {weeklyStats.hoursStudied}h
              </div>
              <div className="text-sm" style={{ color: '#a6adc8' }}>
                Study Time
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                {weeklyStats.improvementRate >= 0 ? (
                  <TrendingUp className="h-4 w-4" style={{ color: '#a6e3a1' }} />
                ) : (
                  <TrendingDown className="h-4 w-4" style={{ color: '#f38ba8' }} />
                )}
                <span 
                  className="text-2xl font-bold"
                  style={{ color: weeklyStats.improvementRate >= 0 ? '#a6e3a1' : '#f38ba8' }}
                >
                  {Math.abs(weeklyStats.improvementRate)}%
                </span>
              </div>
              <div className="text-sm" style={{ color: '#a6adc8' }}>
                Improvement
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section-wise Performance */}
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2" style={{ color: '#cdd6f4' }}>
            <BarChart3 className="h-5 w-5" style={{ color: '#89b4fa' }} />
            <span>Section-wise Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(sectionPerformance).map(([section, quizzes]) => {
            const average = getSectionAverage(section)
            const sectionName = section.charAt(0).toUpperCase() + section.slice(1)
            
            return (
              <div key={section} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getSectionIcon(section)}
                    <span style={{ color: '#cdd6f4' }}>{sectionName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm" style={{ color: '#a6adc8' }}>
                      {quizzes.length} tests
                    </span>
                    <Badge 
                      style={{ 
                        backgroundColor: `${getPerformanceColor(average)}20`,
                        color: getPerformanceColor(average)
                      }}
                    >
                      {average}%
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={average} 
                  className="h-2"
                  style={{ backgroundColor: '#585b70' }}
                />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Performance Trend */}
      {trend && (
        <Card 
          className="border"
          style={{ 
            backgroundColor: '#313244',
            borderColor: '#585b70'
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2" style={{ color: '#cdd6f4' }}>
              <TrendingUp className="h-5 w-5" style={{ color: trend.isPositive ? '#a6e3a1' : '#f38ba8' }} />
              <span>Performance Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-lg" 
                 style={{ backgroundColor: trend.isPositive ? '#a6e3a115' : '#f38ba815' }}>
              <div>
                <p className="text-sm" style={{ color: '#a6adc8' }}>
                  Last 5 tests vs Previous 5 tests
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  {trend.isPositive ? (
                    <TrendingUp className="h-4 w-4" style={{ color: '#a6e3a1' }} />
                  ) : (
                    <TrendingDown className="h-4 w-4" style={{ color: '#f38ba8' }} />
                  )}
                  <span 
                    className="font-bold"
                    style={{ color: trend.isPositive ? '#a6e3a1' : '#f38ba8' }}
                  >
                    {trend.isPositive ? '+' : '-'}{trend.percentage}% {trend.isPositive ? 'Improvement' : 'Decline'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm" style={{ color: '#a6adc8' }}>
                  {trend.olderAvg}% → {trend.recentAvg}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
