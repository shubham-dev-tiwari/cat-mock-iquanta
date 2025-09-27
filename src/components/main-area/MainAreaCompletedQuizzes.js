"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Target, Calendar } from 'lucide-react'
import SingleQuiz from './SingleQuiz'
import SortDropdown from '@/components/dropdowns/SortDropdown'
import { getCompletedQuizzes } from '@/data/quizzes'

export default function MainAreaCompletedQuizzes() {
  const completedQuizzes = getCompletedQuizzes()

  if (completedQuizzes.length === 0) {
    return (
      <Card className="bg-zinc-800 border-zinc-700">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Trophy className="h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No Completed Tests Yet</h3>
          <p className="text-zinc-400 text-center max-w-md">
            Start taking mock tests to see your completed tests and performance analytics here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-zinc-800 border-zinc-700">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-2 text-white">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>Completed Mock Tests</span>
          </CardTitle>
          <SortDropdown />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedQuizzes.map((quiz) => (
            <SingleQuiz key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
