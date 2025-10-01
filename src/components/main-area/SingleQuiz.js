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
        return { backgroundColor: '#a6e3a1', color: '#1e1e1e' }
      case 'medium':
        return { backgroundColor: '#f9e2af', color: '#1e1e1e' }
      case 'hard':
        return { backgroundColor: '#f38ba8', color: '#1e1e1e' }
      default:
        return { backgroundColor: '#6c7086', color: '#cdd6f4' }
    }
  }

  return (
    <Card 
      className="border hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
      style={{ 
        backgroundColor: '#313244',
        borderColor: '#585b70'
      }}
    >
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="text-lg sm:text-2xl flex-shrink-0">{quiz.icon}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base truncate" style={{ color: '#cdd6f4' }}>
                {quiz.name}
              </h3>
              <p className="text-xs mt-1" style={{ color: '#a6adc8' }}>
                {quiz.questions} questions • {quiz.timeLimit} min
              </p>
            </div>
          </div>
          {quiz.completed && (
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
          )}
        </div>
      </CardHeader>

      <CardContent className="py-3 flex-1">
        {quiz.completed ? (
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span style={{ color: '#a6adc8' }}>Score</span>
              <span className="font-semibold text-green-600">
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
                <Trophy className="h-3 w-3 text-yellow-600" />
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
            <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#a6adc8' }}>
              {quiz.description}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 flex-shrink-0">
        <div className="flex items-center space-x-2 flex-wrap">
          <Badge className="font-semibold text-xs" style={getDifficultyColor(quiz.difficulty)}>
            <Target className="h-3 w-3 mr-1" />
            {quiz.difficulty}
          </Badge>
          {quiz.score && quiz.score >= 80 && (
            <Badge variant="outline" className="border-yellow-600 text-yellow-600 text-xs">
              <Star className="h-3 w-3 mr-1" />
              High Score
            </Badge>
          )}
        </div>
        
        <Button 
          size="sm"
          onClick={handleStartQuiz}
          className={`transition-all duration-300 w-full sm:w-auto ${
            quiz.completed 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'hover:scale-105'
          }`}
          style={{
            backgroundColor: quiz.completed ? '#a6e3a1' : '#89b4fa',
            color: '#1e1e1e'
          }}
        >
          <Play className="h-3 w-3 mr-1" />
          {quiz.completed ? 'Retake' : 'Start'}
        </Button>
      </CardFooter>
    </Card>
  )
}
