"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuizStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  X, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  ArrowLeft
} from 'lucide-react'
import CustomDialog from '@/components/ui/CustomDialog'
import BackButton from '@/components/ui/BackButton'

export default function QuizInterface() {
  const { currentQuiz, exitQuiz, completeQuiz } = useQuizStore()
  const router = useRouter()
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(currentQuiz?.timeLimit * 60 || 1800)
  const [showResults, setShowResults] = useState(false)
  const [showExitDialog, setShowExitDialog] = useState(false)
  
  // NEW: Detailed question tracking
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [questionTimeSpent, setQuestionTimeSpent] = useState({}) // {questionIndex: timeInSeconds}
  const [questionFirstAttemptTime, setQuestionFirstAttemptTime] = useState({}) // When user first answered
  const [questionAttemptCount, setQuestionAttemptCount] = useState({}) // How many times user changed answer
  const [questionSwitches, setQuestionSwitches] = useState([]) // Track navigation pattern
  
  // Sample questions with difficulty and expected time
  const sampleQuestions = [
    {
      id: 1,
      question: "What is 15% of 240?",
      options: ["32", "36", "40", "42"],
      correct: 1,
      explanation: "15% of 240 = (15/100) × 240 = 36",
      difficulty: "Easy",
      expectedTime: 45, // seconds
      section: "quantitative",
      topic: "Percentage"
    },
    {
      id: 2,
      question: "If a train travels 300 km in 4 hours, what is its average speed?",
      options: ["70 km/h", "75 km/h", "80 km/h", "85 km/h"],
      correct: 1,
      explanation: "Speed = Distance/Time = 300/4 = 75 km/h",
      difficulty: "Medium",
      expectedTime: 75,
      section: "quantitative",
      topic: "Speed & Distance"
    },
    {
      id: 3,
      question: "Solve: 2x + 5 = 15",
      options: ["x = 4", "x = 5", "x = 6", "x = 7"],
      correct: 1,
      explanation: "2x + 5 = 15 → 2x = 10 → x = 5",
      difficulty: "Easy",
      expectedTime: 60,
      section: "quantitative",
      topic: "Linear Equations"
    },
    {
      id: 4,
      question: "In a mixture of 60 litres, the ratio of milk to water is 2:1. How much water should be added to make the ratio 1:2?",
      options: ["60 litres", "80 litres", "100 litres", "120 litres"],
      correct: 3,
      explanation: "Initial: 40L milk, 20L water. Final: 40L milk, 80L water. Need to add 60L water.",
      difficulty: "Hard",
      expectedTime: 120,
      section: "quantitative",
      topic: "Mixtures"
    },
    {
      id: 5,
      question: "Choose the word most similar in meaning to 'UBIQUITOUS':",
      options: ["Rare", "Omnipresent", "Dangerous", "Beautiful"],
      correct: 1,
      explanation: "Ubiquitous means present everywhere at the same time.",
      difficulty: "Medium",
      expectedTime: 30,
      section: "verbal",
      topic: "Vocabulary"
    }
  ]

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmitQuiz()
    }
  }, [timeLeft, showResults])

  // Track time spent on current question
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const timeSpent = Math.floor((now - questionStartTime) / 1000)
      
      setQuestionTimeSpent(prev => ({
        ...prev,
        [currentQuestionIndex]: (prev[currentQuestionIndex] || 0) + 1
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [currentQuestionIndex, questionStartTime])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const now = Date.now()
    
    // Track first attempt time
    if (!questionFirstAttemptTime[questionIndex]) {
      setQuestionFirstAttemptTime(prev => ({
        ...prev,
        [questionIndex]: now
      }))
    }
    
    // Track attempt count (how many times user changed answer)
    setQuestionAttemptCount(prev => ({
      ...prev,
      [questionIndex]: (prev[questionIndex] || 0) + 1
    }))
    
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    })
  }

  const handleQuestionNavigation = (newIndex) => {
    const now = Date.now()
    
    // Record navigation pattern
    setQuestionSwitches(prev => [...prev, {
      from: currentQuestionIndex,
      to: newIndex,
      timestamp: now,
      timeSpentOnPrevious: Math.floor((now - questionStartTime) / 1000)
    }])
    
    setCurrentQuestionIndex(newIndex)
    setQuestionStartTime(now)
  }

  const handleSubmitQuiz = () => {
    const now = Date.now()
    
    // Calculate results with detailed analytics
    let correct = 0
    const questionAnalytics = sampleQuestions.map((question, index) => {
      const isCorrect = selectedAnswers[index] === question.correct
      if (isCorrect) correct++
      
      const timeSpent = questionTimeSpent[index] || 0
      const firstAttemptTime = questionFirstAttemptTime[index] 
        ? Math.floor((questionFirstAttemptTime[index] - (now - (currentQuiz.timeLimit * 60 * 1000))) / 1000)
        : null
      
      return {
        questionId: question.id,
        questionNumber: index + 1,
        question: question.question,
        selectedAnswer: selectedAnswers[index],
        correctAnswer: question.correct,
        isCorrect,
        timeSpent, // in seconds
        expectedTime: question.expectedTime,
        timeEfficiency: question.expectedTime > 0 ? ((question.expectedTime - timeSpent) / question.expectedTime * 100) : 0,
        attemptCount: questionAttemptCount[index] || 0,
        difficulty: question.difficulty,
        section: question.section,
        topic: question.topic,
        firstAttemptTime: firstAttemptTime,
        wasSkipped: selectedAnswers[index] === undefined,
        speedCategory: timeSpent <= question.expectedTime * 0.5 ? 'Fast' 
                     : timeSpent <= question.expectedTime ? 'Optimal' 
                     : timeSpent <= question.expectedTime * 1.5 ? 'Slow' 
                     : 'Very Slow'
      }
    })
    
    const score = Math.round((correct / sampleQuestions.length) * 100)
    const totalTimeSpent = Object.values(questionTimeSpent).reduce((sum, time) => sum + time, 0)
    
    const quizResult = {
      quizId: currentQuiz.id,
      quizName: currentQuiz.name,
      section: currentQuiz.section,
      correctAnswers: correct,
      wrongAnswers: sampleQuestions.length - correct,
      totalQuestions: sampleQuestions.length,
      score: score,
      timeSpent: totalTimeSpent,
      completedAt: new Date().toISOString(),
      
      // NEW: Detailed analytics
      questionAnalytics,
      navigationPattern: questionSwitches,
      averageTimePerQuestion: Math.round(totalTimeSpent / sampleQuestions.length),
      fastestQuestion: questionAnalytics.reduce((fastest, q) => 
        q.timeSpent < fastest.timeSpent ? q : fastest, questionAnalytics[0]
      ),
      slowestQuestion: questionAnalytics.reduce((slowest, q) => 
        q.timeSpent > slowest.timeSpent ? q : slowest, questionAnalytics[0]
      ),
      accuracyByDifficulty: {
        Easy: questionAnalytics.filter(q => q.difficulty === 'Easy' && q.isCorrect).length / 
              Math.max(1, questionAnalytics.filter(q => q.difficulty === 'Easy').length) * 100,
        Medium: questionAnalytics.filter(q => q.difficulty === 'Medium' && q.isCorrect).length / 
                Math.max(1, questionAnalytics.filter(q => q.difficulty === 'Medium').length) * 100,
        Hard: questionAnalytics.filter(q => q.difficulty === 'Hard' && q.isCorrect).length / 
              Math.max(1, questionAnalytics.filter(q => q.difficulty === 'Hard').length) * 100,
      },
      timeManagement: {
        questionsAnsweredFast: questionAnalytics.filter(q => q.speedCategory === 'Fast').length,
        questionsAnsweredOptimal: questionAnalytics.filter(q => q.speedCategory === 'Optimal').length,
        questionsAnsweredSlow: questionAnalytics.filter(q => q.speedCategory === 'Slow').length,
        questionsAnsweredVerySlow: questionAnalytics.filter(q => q.speedCategory === 'Very Slow').length,
      }
    }
    
    completeQuiz(quizResult)
    setShowResults(true)
  }

  const handleExitQuiz = () => {
    exitQuiz()
    router.push('/dashboard')
    setShowExitDialog(false)
  }

  const currentQuestion = sampleQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / sampleQuestions.length) * 100
  const currentQuestionTime = questionTimeSpent[currentQuestionIndex] || 0

  if (showResults) {
    return <QuizResults />
  }

  return (
    <>
      <div 
        className="min-h-screen p-4"
        style={{
          background: 'linear-gradient(135deg, #1e1e1e 0%, #313244 25%, #1e1e1e 50%, #313244 75%, #1e1e1e 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <BackButton
              onClick={() => setShowExitDialog(true)}
              text="Exit Quiz"
              variant="outline"
            />
          </div>

          {/* Quiz Header with Question Timer */}
          <Card 
            className="mb-6 border"
            style={{ 
              backgroundColor: '#313244',
              borderColor: '#585b70'
            }}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{currentQuiz?.icon}</div>
                  <div>
                    <CardTitle style={{ color: '#cdd6f4' }}>{currentQuiz?.name}</CardTitle>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge 
                        variant="outline" 
                        className="border"
                        style={{ 
                          color: '#89b4fa',
                          borderColor: '#89b4fa'
                        }}
                      >
                        {currentQuiz?.difficulty}
                      </Badge>
                      <span className="text-sm" style={{ color: '#a6adc8' }}>
                        Question {currentQuestionIndex + 1} of {sampleQuestions.length}
                      </span>
                      {/* NEW: Current Question Timer */}
                      <Badge 
                        variant="outline"
                        className="border"
                        style={{ 
                          color: currentQuestionTime > currentQuestion.expectedTime ? '#f38ba8' : '#a6e3a1',
                          borderColor: currentQuestionTime > currentQuestion.expectedTime ? '#f38ba8' : '#a6e3a1'
                        }}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(currentQuestionTime)} / {formatTime(currentQuestion.expectedTime)}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2" style={{ color: '#cdd6f4' }}>
                    <Clock className="h-4 w-4" />
                    <span className="font-mono">{formatTime(timeLeft)}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowExitDialog(true)}
                    style={{ color: '#f38ba8' }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Progress 
                value={progress} 
                className="w-full h-2 mt-4"
                style={{ backgroundColor: '#585b70' }}
              />
            </CardHeader>
          </Card>

          {/* Question Card with Difficulty and Topic */}
          <Card 
            className="mb-6 border"
            style={{ 
              backgroundColor: '#313244',
              borderColor: '#585b70'
            }}
          >
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex flex-col space-y-2">
                    <Badge 
                      variant="outline" 
                      className="border w-fit"
                      style={{ 
                        color: '#89b4fa',
                        borderColor: '#89b4fa'
                      }}
                    >
                      Q{currentQuestionIndex + 1}
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className="text-xs w-fit"
                      style={{
                        backgroundColor: currentQuestion.difficulty === 'Easy' ? '#a6e3a120' 
                                       : currentQuestion.difficulty === 'Medium' ? '#f9e2af20'
                                       : '#f38ba820',
                        color: currentQuestion.difficulty === 'Easy' ? '#a6e3a1' 
                             : currentQuestion.difficulty === 'Medium' ? '#f9e2af'
                             : '#f38ba8'
                      }}
                    >
                      {currentQuestion.difficulty}
                    </Badge>
                    <Badge 
                      variant="outline"
                      className="text-xs border w-fit"
                      style={{ 
                        color: '#cba6f7',
                        borderColor: '#cba6f7'
                      }}
                    >
                      {currentQuestion.topic}
                    </Badge>
                  </div>
                  <h2 className="text-xl leading-relaxed" style={{ color: '#cdd6f4' }}>
                    {currentQuestion.question}
                  </h2>
                </div>
                
                <div className="space-y-3 pl-16">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                      className="w-full text-left p-4 rounded-lg border transition-all duration-200"
                      style={{
                        borderColor: selectedAnswers[currentQuestionIndex] === index ? '#89b4fa' : '#585b70',
                        backgroundColor: selectedAnswers[currentQuestionIndex] === index ? '#89b4fa20' : '#45475a',
                        color: selectedAnswers[currentQuestionIndex] === index ? '#89b4fa' : '#cdd6f4'
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                          style={{
                            borderColor: selectedAnswers[currentQuestionIndex] === index ? '#89b4fa' : '#6c7086',
                            backgroundColor: selectedAnswers[currentQuestionIndex] === index ? '#89b4fa' : 'transparent',
                            color: selectedAnswers[currentQuestionIndex] === index ? '#1e1e1e' : '#a6adc8'
                          }}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation with Time Indicators */}
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => handleQuestionNavigation(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="border"
              style={{
                backgroundColor: '#45475a',
                borderColor: '#585b70',
                color: '#cdd6f4'
              }}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex space-x-3">
              {sampleQuestions.map((_, index) => {
                const timeSpent = questionTimeSpent[index] || 0
                const expectedTime = sampleQuestions[index].expectedTime
                const isOvertime = timeSpent > expectedTime
                
                return (
                  <button
                    key={index}
                    onClick={() => handleQuestionNavigation(index)}
                    className="w-8 h-8 rounded text-xs font-bold transition-colors relative"
                    style={{
                      backgroundColor: index === currentQuestionIndex
                        ? '#89b4fa'
                        : selectedAnswers[index] !== undefined
                        ? (isOvertime ? '#f9e2af' : '#a6e3a1')
                        : '#585b70',
                      color: index === currentQuestionIndex || selectedAnswers[index] !== undefined
                        ? '#1e1e1e'
                        : '#a6adc8'
                    }}
                  >
                    {index + 1}
                    {timeSpent > 0 && index !== currentQuestionIndex && (
                      <div 
                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                        style={{ 
                          backgroundColor: isOvertime ? '#f38ba8' : '#a6e3a1'
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {currentQuestionIndex === sampleQuestions.length - 1 ? (
              <Button 
                onClick={handleSubmitQuiz}
                style={{
                  backgroundColor: '#a6e3a1',
                  color: '#1e1e1e'
                }}
              >
                <Flag className="h-4 w-4 mr-2" />
                Submit Quiz
              </Button>
            ) : (
              <Button 
                onClick={() => handleQuestionNavigation(Math.min(sampleQuestions.length - 1, currentQuestionIndex + 1))}
                style={{
                  backgroundColor: '#89b4fa',
                  color: '#1e1e1e'
                }}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Exit Quiz Dialog */}
      <CustomDialog
        isOpen={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        onConfirm={handleExitQuiz}
        type="warning"
        title="Exit Quiz?"
        description="Are you sure you want to exit this quiz? Your current progress will be lost and cannot be recovered."
        confirmText="Exit Quiz"
        cancelText="Continue Quiz"
      >
        <div 
          className="p-4 rounded-lg border-l-4"
          style={{
            backgroundColor: '#f9e2af15',
            borderColor: '#f9e2af'
          }}
        >
          <p className="text-xs font-medium" style={{ color: '#f9e2af' }}>
            💡 Your answers for this session will not be saved.
          </p>
        </div>
      </CustomDialog>
    </>
  )
}

// Quiz Results Component with Back Button
function QuizResults() {
  const { currentQuiz, exitQuiz } = useQuizStore()
  const router = useRouter()

  const handleBackToDashboard = () => {
    exitQuiz()
    router.push('/dashboard')
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #1e1e1e 0%, #313244 25%, #1e1e1e 50%, #313244 75%, #1e1e1e 100%)'
      }}
    >
      <Card 
        className="max-w-md w-full border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardContent className="p-8 text-center space-y-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold" style={{ color: '#cdd6f4' }}>
            Quiz Completed!
          </h2>
          <p style={{ color: '#a6adc8' }}>
            Great job on completing the {currentQuiz?.name} quiz!
          </p>
          
          <div className="space-y-3 py-4">
            <div className="flex justify-between text-sm">
              <span style={{ color: '#a6adc8' }}>Score</span>
              <span className="font-bold" style={{ color: '#a6e3a1' }}>85%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#a6adc8' }}>Points Earned</span>
              <span className="font-bold" style={{ color: '#f9e2af' }}>+850 XP</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: '#a6adc8' }}>Correct Answers</span>
              <span className="font-bold" style={{ color: '#a6e3a1' }}>17/20</span>
            </div>
          </div>
          
          <BackButton
            onClick={handleBackToDashboard}
            text="View Detailed Analytics"
            variant="default"
            className="w-full"
            showIcon={true}
          />
        </CardContent>
      </Card>
    </div>
  )
}
