"use client"

import { useQuizStore } from '@/lib/store'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Target, 
  Trophy,
  Star
} from 'lucide-react'

export default function SingleQuiz({ quiz }) {
  const { startQuiz } = useQuizStore()

  const handleStartQuiz = () => {
    startQuiz(quiz)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return { backgroundColor: '#a6e3a1', color: '#1e1e2e' }
      case 'medium':
        return { backgroundColor: '#f9e2af', color: '#1e1e2e' }
      case 'hard':
        return { backgroundColor: '#f38ba8', color: '#1e1e2e' }
      default:
        return { backgroundColor: '#6c7086', color: '#cdd6f4' }
    }
  }

  return (
    <Card 
      className="border hover:border-opacity-100 transition-all duration-300 hover:shadow-lg group"
      style={{ 
        backgroundColor: '#45475a',
        borderColor: '#585b70'
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{quiz.icon}</div>
            <div className="flex-1">
              <h3 
                className="font-semibold text-sm group-hover:text-opacity-100 transition-colors"
                style={{ 
                  color: quiz.completed ? '#cdd6f4' : '#cdd6f4'
                }}
              >
                {quiz.name}
              </h3>
              <p className="text-xs mt-1" style={{ color: '#a6adc8' }}>
                {quiz.questions} questions • {quiz.timeLimit} min
              </p>
            </div>
          </div>
          {quiz.completed && (
            <CheckCircle2 className="h-5 w-5" style={{ color: '#a6e3a1' }} />
          )}
        </div>
      </CardHeader>

      <CardContent className="py-3">
        {/* Progress and Score */}
        {quiz.completed ? (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span style={{ color: '#a6adc8' }}>Score</span>
              <span className="font-semibold" style={{ color: '#a6e3a1' }}>
                {quiz.score}%
              </span>
            </div>
            <Progress 
              value={quiz.score} 
              className="h-2"
              style={{ backgroundColor: '#585b70' }}
            />
            <div className="flex items-center justify-between text-xs" style={{ color: '#a6adc8' }}>
              <span>Completed</span>
              <div className="flex items-center space-x-1">
                <Trophy className="h-3 w-3" style={{ color: '#f9e2af' }} />
                <span>{quiz.attempts} attempts</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span style={{ color: '#a6adc8' }}>Progress</span>
              <span style={{ color: '#a6adc8' }}>Not started</span>
            </div>
            <Progress 
              value={0} 
              className="h-2"
              style={{ backgroundColor: '#585b70' }}
            />
            <p className="text-xs leading-relaxed" style={{ color: '#7f849c' }}>
              {quiz.description}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Badge 
            className="font-semibold"
            style={getDifficultyColor(quiz.difficulty)}
          >
            <Target className="h-3 w-3 mr-1" />
            {quiz.difficulty}
          </Badge>
          {quiz.score && quiz.score >= 80 && (
            <Badge 
              variant="outline" 
              className="border"
              style={{ 
                color: '#f9e2af',
                borderColor: '#f9e2af'
              }}
            >
              <Star className="h-3 w-3 mr-1" />
              High Score
            </Badge>
          )}
        </div>
        
        <Button 
          size="sm"
          onClick={handleStartQuiz}
          className="transition-all duration-300 text-white"
          style={{
            backgroundColor: quiz.completed ? '#a6e3a1' : '#89b4fa',
            color: '#1e1e2e'
          }}
        >
          <Play className="h-3 w-3 mr-1" />
          {quiz.completed ? 'Retake' : 'Start'}
        </Button>
      </CardFooter>
    </Card>
  )
}
