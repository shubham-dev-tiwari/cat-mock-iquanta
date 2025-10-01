"use client"

import { useState } from 'react'
import { useQuizStore } from '@/lib/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { 
  Calculator, 
  BookOpen, 
  Brain, 
  Globe,
} from 'lucide-react'
import SingleQuiz from './SingleQuiz'
import SortDropdown from '@/components/dropdowns/SortDropdown'
import { getAllQuizzes, getQuizzesBySection } from '@/data/quizzes'

export default function MainAreaAllQuizzes() {
  const { selectedLanguage, setSelectedLanguage } = useQuizStore()
  const [isMobileSectionOpen, setIsMobileSectionOpen] = useState(false)

  const sections = [
    { value: 'all', label: 'All Sections', icon: null },
    { value: 'quantitative', label: 'Quantitative', icon: <Calculator className="h-4 w-4 text-blue-600" /> },
    { value: 'verbal', label: 'Verbal', icon: <BookOpen className="h-4 w-4 text-green-600" /> },
    { value: 'logical', label: 'Logical', icon: <Brain className="h-4 w-4 text-yellow-600" /> },
    { value: 'general', label: 'General', icon: <Globe className="h-4 w-4 text-purple-600" /> }
  ]

  const currentSection = sections.find(section => section.value === selectedLanguage)

  return (
    <Card 
      className="border"
      style={{ 
        backgroundColor: '#313244',
        borderColor: '#585b70'
      }}
    >
      <div className="p-4 sm:p-6">
        <Tabs 
          value={selectedLanguage} 
          onValueChange={setSelectedLanguage}
          className="w-full"
        >
          {/* Desktop Section Tabs */}
          <TabsList className="hidden sm:grid sm:grid-cols-5 w-full" style={{ backgroundColor: '#45475a' }}>
            {sections.map((section) => (
              <TabsTrigger 
                key={section.value}
                value={section.value}
                className="transition-all duration-200 text-xs lg:text-sm"
                style={{
                  color: selectedLanguage === section.value ? '#cdd6f4' : '#a6adc8',
                  backgroundColor: selectedLanguage === section.value ? '#585b70' : 'transparent'
                }}
              >
                <div className="flex items-center space-x-1 lg:space-x-2">
                  {section.icon}
                  <span className="truncate">{section.label}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Mobile Section Selector */}
          <div className="sm:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setIsMobileSectionOpen(!isMobileSectionOpen)}
              className="w-full justify-between h-12 text-left"
              style={{
                backgroundColor: '#45475a',
                borderColor: '#585b70',
                color: '#cdd6f4'
              }}
            >
              <div className="flex items-center space-x-2">
                {currentSection?.icon}
                <span>{currentSection?.label}</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${isMobileSectionOpen ? 'rotate-180' : ''}`} />
            </Button>

            {isMobileSectionOpen && (
              <div 
                className="mt-2 border rounded-lg overflow-hidden"
                style={{ 
                  backgroundColor: '#45475a',
                  borderColor: '#585b70'
                }}
              >
                {sections.map((section) => (
                  <button
                    key={section.value}
                    onClick={() => {
                      setSelectedLanguage(section.value)
                      setIsMobileSectionOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-opacity-80 transition-all duration-200 border-b last:border-b-0"
                    style={{
                      backgroundColor: selectedLanguage === section.value ? '#585b70' : 'transparent',
                      borderColor: '#6c7086',
                      color: selectedLanguage === section.value ? '#cdd6f4' : '#a6adc8'
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      {section.icon}
                      <span>{section.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <TabsContent value="all" className="mt-4 sm:mt-6">
            <QuizGrid quizzes={getAllQuizzes()} />
          </TabsContent>
          
          <TabsContent value="quantitative" className="mt-4 sm:mt-6">
            <QuizGrid quizzes={getQuizzesBySection('quantitative')} />
          </TabsContent>
          
          <TabsContent value="verbal" className="mt-4 sm:mt-6">
            <QuizGrid quizzes={getQuizzesBySection('verbal')} />
          </TabsContent>
          
          <TabsContent value="logical" className="mt-4 sm:mt-6">
            <QuizGrid quizzes={getQuizzesBySection('logical')} />
          </TabsContent>
          
          <TabsContent value="general" className="mt-4 sm:mt-6">
            <QuizGrid quizzes={getQuizzesBySection('general')} />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}

function QuizGrid({ quizzes }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        <span className="text-sm" style={{ color: '#a6adc8' }}>Sort by:</span>
        <SortDropdown />
      </div>
      
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {quizzes.map((quiz) => (
          <SingleQuiz key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  )
}
