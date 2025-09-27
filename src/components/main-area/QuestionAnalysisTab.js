"use client"

import { useQuizStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Clock, 
  Target, 
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Timer,
  BarChart3,
  Zap,
  AlertCircle
} from 'lucide-react'

export default function QuestionAnalysisTab() {
  const { completedQuizzes } = useQuizStore()
  
  // Get the most recent quiz with detailed analytics
  const latestQuizWithAnalytics = completedQuizzes
    .filter(quiz => quiz.questionAnalytics && quiz.questionAnalytics.length > 0)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))[0]
  
  if (!latestQuizWithAnalytics) {
    return (
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BarChart3 className="h-12 w-12 mb-4" style={{ color: '#585b70' }} />
          <h3 className="text-lg font-semibold mb-2" style={{ color: '#cdd6f4' }}>
            No Detailed Analytics Yet
          </h3>
          <p className="text-center max-w-md" style={{ color: '#a6adc8' }}>
            Take a quiz to see detailed question-by-question analysis including time spent on each question.
          </p>
        </CardContent>
      </Card>
    )
  }

  const quiz = latestQuizWithAnalytics
  const { questionAnalytics, timeManagement, accuracyByDifficulty } = quiz

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getSpeedColor = (category) => {
    switch (category) {
      case 'Fast':
        return '#a6e3a1'
      case 'Optimal':
        return '#89b4fa'
      case 'Slow':
        return '#f9e2af'
      case 'Very Slow':
        return '#f38ba8'
      default:
        return '#6c7086'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return '#a6e3a1'
      case 'Medium':
        return '#f9e2af'
      case 'Hard':
        return '#f38ba8'
      default:
        return '#6c7086'
    }
  }

  return (
    <div className="space-y-6">
      {/* Quiz Overview */}
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between" style={{ color: '#cdd6f4' }}>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" style={{ color: '#89b4fa' }} />
              <span>Question-by-Question Analysis</span>
            </div>
            <Badge style={{ backgroundColor: '#89b4fa', color: '#1e1e1e' }}>
              {quiz.quizName}
            </Badge>
          </CardTitle>
          <p className="text-sm" style={{ color: '#a6adc8' }}>
            Detailed breakdown of your performance on each question
          </p>
        </CardHeader>
      </Card>

      {/* Time Management Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className="border"
          style={{ 
            backgroundColor: '#313244',
            borderColor: '#585b70'
          }}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: '#a6adc8' }}>Fast Answers</p>
                <p className="text-xl font-bold" style={{ color: '#a6e3a1' }}>
                  {timeManagement.questionsAnsweredFast}
                </p>
              </div>
              <Zap className="h-5 w-5" style={{ color: '#a6e3a1' }} />
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: '#a6adc8' }}>Optimal Time</p>
                <p className="text-xl font-bold" style={{ color: '#89b4fa' }}>
                  {timeManagement.questionsAnsweredOptimal}
                </p>
              </div>
              <Target className="h-5 w-5" style={{ color: '#89b4fa' }} />
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: '#a6adc8' }}>Slow Answers</p>
                <p className="text-xl font-bold" style={{ color: '#f9e2af' }}>
                  {timeManagement.questionsAnsweredSlow}
                </p>
              </div>
              <Clock className="h-5 w-5" style={{ color: '#f9e2af' }} />
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
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm" style={{ color: '#a6adc8' }}>Very Slow</p>
                <p className="text-xl font-bold" style={{ color: '#f38ba8' }}>
                  {timeManagement.questionsAnsweredVerySlow}
                </p>
              </div>
              <AlertCircle className="h-5 w-5" style={{ color: '#f38ba8' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accuracy by Difficulty */}
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2" style={{ color: '#cdd6f4' }}>
            <Target className="h-5 w-5" style={{ color: '#89b4fa' }} />
            <span>Accuracy by Difficulty</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(accuracyByDifficulty).map(([difficulty, accuracy]) => (
            <div key={difficulty} className="space-y-2">
              <div className="flex items-center justify-between">
                <span style={{ color: '#cdd6f4' }}>{difficulty}</span>
                <Badge 
                  style={{ 
                    backgroundColor: `${getDifficultyColor(difficulty)}20`,
                    color: getDifficultyColor(difficulty)
                  }}
                >
                  {Math.round(accuracy)}%
                </Badge>
              </div>
              <Progress 
                value={accuracy} 
                className="h-2"
                style={{ backgroundColor: '#585b70' }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Question-by-Question Breakdown */}
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2" style={{ color: '#cdd6f4' }}>
            <Timer className="h-5 w-5" style={{ color: '#89b4fa' }} />
            <span>Individual Question Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {questionAnalytics.map((q, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: '#45475a',
                borderColor: '#585b70'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant="outline"
                    className="border"
                    style={{ 
                      color: '#89b4fa',
                      borderColor: '#89b4fa'
                    }}
                  >
                    Q{q.questionNumber}
                  </Badge>
                  
                  <Badge 
                    style={{ 
                      backgroundColor: `${getDifficultyColor(q.difficulty)}20`,
                      color: getDifficultyColor(q.difficulty)
                    }}
                  >
                    {q.difficulty}
                  </Badge>

                  <Badge 
                    variant="outline"
                    className="border text-xs"
                    style={{ 
                      color: '#cba6f7',
                      borderColor: '#cba6f7'
                    }}
                  >
                    {q.topic}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  {q.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5" style={{ color: '#a6e3a1' }} />
                  ) : (
                    <XCircle className="h-5 w-5" style={{ color: '#f38ba8' }} />
                  )}
                </div>
              </div>

              {/* Question Text */}
              <p className="text-sm mb-3 line-clamp-2" style={{ color: '#cdd6f4' }}>
                {q.question}
              </p>

              {/* Time and Performance Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p style={{ color: '#a6adc8' }}>Time Spent</p>
                  <p className="font-semibold" style={{ color: getSpeedColor(q.speedCategory) }}>
                    {formatTime(q.timeSpent)}
                  </p>
                </div>
                
                <div>
                  <p style={{ color: '#a6adc8' }}>Expected</p>
                  <p className="font-semibold" style={{ color: '#cdd6f4' }}>
                    {formatTime(q.expectedTime)}
                  </p>
                </div>
                
                <div>
                  <p style={{ color: '#a6adc8' }}>Speed</p>
                  <Badge 
                    variant="outline"
                    className="border text-xs"
                    style={{ 
                      color: getSpeedColor(q.speedCategory),
                      borderColor: getSpeedColor(q.speedCategory)
                    }}
                  >
                    {q.speedCategory}
                  </Badge>
                </div>
                
                <div>
                  <p style={{ color: '#a6adc8' }}>Attempts</p>
                  <p className="font-semibold" style={{ color: '#cdd6f4' }}>
                    {q.attemptCount || 1}
                  </p>
                </div>
              </div>

              {/* Time Efficiency Bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span style={{ color: '#a6adc8' }}>Time Efficiency</span>
                  <span 
                    style={{ 
                      color: q.timeEfficiency > 0 ? '#a6e3a1' : '#f38ba8'
                    }}
                  >
                    {q.timeEfficiency > 0 ? '+' : ''}{Math.round(q.timeEfficiency)}%
                  </span>
                </div>
                <div className="h-1 rounded-full" style={{ backgroundColor: '#585b70' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min(100, Math.abs(q.timeEfficiency))}%`,
                      backgroundColor: q.timeEfficiency > 0 ? '#a6e3a1' : '#f38ba8'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2" style={{ color: '#cdd6f4' }}>
            <TrendingUp className="h-5 w-5" style={{ color: '#a6e3a1' }} />
            <span>Performance Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className="p-4 rounded-lg border-l-4"
            style={{ 
              backgroundColor: '#89b4fa15',
              borderColor: '#89b4fa'
            }}
          >
            <h4 className="font-semibold mb-2" style={{ color: '#89b4fa' }}>
              💡 Time Management Tips
            </h4>
            <ul className="text-sm space-y-1" style={{ color: '#a6adc8' }}>
              <li>• Questions answered very slowly need more practice</li>
              <li>• Fast answers might indicate good topic mastery</li>
              <li>• Optimal timing shows balanced speed and accuracy</li>
            </ul>
          </div>

          {quiz.fastestQuestion && quiz.slowestQuestion && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#a6e3a115' }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: '#a6e3a1' }}>
                  🚀 Fastest Question
                </p>
                <p className="text-xs" style={{ color: '#a6adc8' }}>
                  Q{quiz.fastestQuestion.questionNumber} - {formatTime(quiz.fastestQuestion.timeSpent)}
                </p>
              </div>
              
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#f38ba815' }}
              >
                <p className="text-sm font-semibold mb-1" style={{ color: '#f38ba8' }}>
                  🐌 Slowest Question
                </p>
                <p className="text-xs" style={{ color: '#a6adc8' }}>
                  Q{quiz.slowestQuestion.questionNumber} - {formatTime(quiz.slowestQuestion.timeSpent)}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
