"use client"

import { useState } from 'react'
import { useQuizStore } from '@/lib/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import MainAreaAllQuizzes from './MainAreaAllQuizzes'
import MainAreaCompletedQuizzes from './MainAreaCompletedQuizzes'
import LeaderboardTab from './LeaderboardTab'
import AnalyticsTab from './AnalyticsTab'
import QuestionAnalysisTab from './QuestionAnalysisTab'
import PremiumCoachingTab from './PremiumCoachingTab'

export default function MainArea() {
  const { selectedTab, setSelectedTab, completedQuizzes, getCurrentUserRank } = useQuizStore()
  const userRank = getCurrentUserRank()

  return (
    <div className="space-y-6">
      <Tabs 
        value={selectedTab} 
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList 
          className="grid w-full grid-cols-6 border"
          style={{ 
            backgroundColor: '#45475a',
            borderColor: '#585b70'
          }}
        >
          <TabsTrigger 
            value="all" 
            className="transition-all duration-200"
            style={{
              color: selectedTab === 'all' ? '#cdd6f4' : '#a6adc8',
              backgroundColor: selectedTab === 'all' ? '#585b70' : 'transparent'
            }}
          >
            All Tests
            <Badge 
              variant="secondary" 
              className="ml-2"
              style={{ 
                backgroundColor: '#89b4fa',
                color: '#1e1e1e'
              }}
            >
              11
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="completed" 
            className="transition-all duration-200"
            style={{
              color: selectedTab === 'completed' ? '#cdd6f4' : '#a6adc8',
              backgroundColor: selectedTab === 'completed' ? '#585b70' : 'transparent'
            }}
          >
            Completed
            <Badge 
              variant="secondary" 
              className="ml-2"
              style={{ 
                backgroundColor: '#a6e3a1',
                color: '#1e1e1e'
              }}
            >
              {completedQuizzes.length}
            </Badge>
          </TabsTrigger>
          
          <TabsTrigger 
            value="leaderboard" 
            className="transition-all duration-200"
            style={{
              color: selectedTab === 'leaderboard' ? '#cdd6f4' : '#a6adc8',
              backgroundColor: selectedTab === 'leaderboard' ? '#585b70' : 'transparent'
            }}
          >
            Leaderboard
            {userRank && (
              <Badge 
                variant="secondary" 
                className="ml-2"
                style={{ 
                  backgroundColor: '#f9e2af',
                  color: '#1e1e1e'
                }}
              >
                #{userRank}
              </Badge>
            )}
          </TabsTrigger>
          
          <TabsTrigger 
            value="analytics" 
            className="transition-all duration-200"
            style={{
              color: selectedTab === 'analytics' ? '#cdd6f4' : '#a6adc8',
              backgroundColor: selectedTab === 'analytics' ? '#585b70' : 'transparent'
            }}
          >
            Analytics
          </TabsTrigger>
          
          <TabsTrigger 
            value="question-analysis" 
            className="transition-all duration-200"
            style={{
              color: selectedTab === 'question-analysis' ? '#cdd6f4' : '#a6adc8',
              backgroundColor: selectedTab === 'question-analysis' ? '#585b70' : 'transparent'
            }}
          >
            Questions
          </TabsTrigger>
          
          <TabsTrigger 
            value="premium-coaching" 
            className="transition-all duration-200"
            style={{
              color: selectedTab === 'premium-coaching' ? '#cdd6f4' : '#a6adc8',
              backgroundColor: selectedTab === 'premium-coaching' ? '#585b70' : 'transparent'
            }}
          >
            Premium
            <Badge 
              variant="secondary" 
              className="ml-2"
              style={{ 
                backgroundColor: '#f9e2af',
                color: '#1e1e1e'
              }}
            >
              NEW
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <MainAreaAllQuizzes />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <MainAreaCompletedQuizzes />
        </TabsContent>
        
        <TabsContent value="leaderboard" className="mt-6">
          <LeaderboardTab />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <AnalyticsTab />
        </TabsContent>
        
        <TabsContent value="question-analysis" className="mt-6">
          <QuestionAnalysisTab />
        </TabsContent>
        
        <TabsContent value="premium-coaching" className="mt-6">
          <PremiumCoachingTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
