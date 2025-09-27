"use client"

import { useState } from 'react'
import { useQuizStore } from '@/lib/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { 
  Calculator, 
  BookOpen, 
  Brain, 
  Globe,
} from 'lucide-react'
import SingleQuiz from './SingleQuiz'
import SortDropdown from '@/components/dropdowns/SortDropdown'
import { getAllQuizzes, getQuizzesBySection } from '@/data/quizzes'

// Catppuccin Mocha colors for each CAT section
const iconColors = {
  quantitative: '#89b4fa', // Blue
  verbal: '#a6e3a1',       // Green  
  logical: '#f9e2af',      // Yellow
  general: '#cba6f7',      // Mauve
}

export default function MainAreaAllQuizzes() {
  const { selectedLanguage, setSelectedLanguage } = useQuizStore()

  return (
    <Card 
      className="border"
      style={{ 
        backgroundColor: '#313244',
        borderColor: '#585b70'
      }}
    >
      <div className="p-6">
        {/* CAT Sections Tabs */}
        <Tabs 
          value={selectedLanguage} 
          onValueChange={setSelectedLanguage}
          className="w-full"
        >
          <TabsList 
            className="grid w-full grid-cols-5"
            style={{ backgroundColor: '#45475a' }}
          >
            <TabsTrigger 
              value="all" 
              className="transition-all duration-200"
              style={{
                color: selectedLanguage === 'all' ? '#cdd6f4' : '#a6adc8',
                backgroundColor: selectedLanguage === 'all' ? '#585b70' : 'transparent'
              }}
            >
              All Sections
            </TabsTrigger>
            <TabsTrigger 
              value="quantitative"
              className="transition-all duration-200"
              style={{
                color: selectedLanguage === 'quantitative' ? '#cdd6f4' : '#a6adc8',
                backgroundColor: selectedLanguage === 'quantitative' ? '#585b70' : 'transparent'
              }}
            >
              <Calculator className="h-4 w-4 mr-2" style={{ color: iconColors.quantitative }} />
              Quantitative
            </TabsTrigger>
            <TabsTrigger 
              value="verbal"
              className="transition-all duration-200"
              style={{
                color: selectedLanguage === 'verbal' ? '#cdd6f4' : '#a6adc8',
                backgroundColor: selectedLanguage === 'verbal' ? '#585b70' : 'transparent'
              }}
            >
              <BookOpen className="h-4 w-4 mr-2" style={{ color: iconColors.verbal }} />
              Verbal
            </TabsTrigger>
            <TabsTrigger 
              value="logical"
              className="transition-all duration-200"
              style={{
                color: selectedLanguage === 'logical' ? '#cdd6f4' : '#a6adc8',
                backgroundColor: selectedLanguage === 'logical' ? '#585b70' : 'transparent'
              }}
            >
              <Brain className="h-4 w-4 mr-2" style={{ color: iconColors.logical }} />
              Logical
            </TabsTrigger>
            <TabsTrigger 
              value="general"
              className="transition-all duration-200"
              style={{
                color: selectedLanguage === 'general' ? '#cdd6f4' : '#a6adc8',
                backgroundColor: selectedLanguage === 'general' ? '#585b70' : 'transparent'
              }}
            >
              <Globe className="h-4 w-4 mr-2" style={{ color: iconColors.general }} />
              General
            </TabsTrigger>
          </TabsList>

          {/* Content for each tab */}
          <TabsContent value="all" className="mt-6">
            <QuizGrid quizzes={getAllQuizzes()} />
          </TabsContent>
          
          <TabsContent value="quantitative" className="mt-6">
            <QuizGrid quizzes={getQuizzesBySection('quantitative')} />
          </TabsContent>
          
          <TabsContent value="verbal" className="mt-6">
            <QuizGrid quizzes={getQuizzesBySection('verbal')} />
          </TabsContent>
          
          <TabsContent value="logical" className="mt-6">
            <QuizGrid quizzes={getQuizzesBySection('logical')} />
          </TabsContent>
          
          <TabsContent value="general" className="mt-6">
            <QuizGrid quizzes={getQuizzesBySection('general')} />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}

// Quiz Grid Component
function QuizGrid({ quizzes }) {
  return (
    <div className="space-y-4">
      {/* Sort Dropdown */}
      <div className="flex justify-between items-center">
        <span className="text-sm" style={{ color: '#a6adc8' }}>Sort by:</span>
        <SortDropdown />
      </div>
      
      {/* Quiz Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <SingleQuiz key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  )
}
