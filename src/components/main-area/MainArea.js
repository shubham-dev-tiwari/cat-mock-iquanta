"use client"

import { useState } from 'react'
import { useQuizStore } from '@/lib/store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import MainAreaAllQuizzes from './MainAreaAllQuizzes'
import MainAreaCompletedQuizzes from './MainAreaCompletedQuizzes'
import LeaderboardTab from './LeaderboardTab'
import AnalyticsTab from './AnalyticsTab'
import QuestionAnalysisTab from './QuestionAnalysisTab'
import PremiumCoachingTab from './PremiumCoachingTab'

export default function MainArea() {
  const { selectedTab, setSelectedTab, completedQuizzes, getCurrentUserRank } = useQuizStore()
  const [isMobileTabsOpen, setIsMobileTabsOpen] = useState(false)
  const userRank = getCurrentUserRank()

  const tabs = [
    { value: 'all', label: 'All Tests', badge: '11', badgeColor: '#89b4fa' },
    { value: 'completed', label: 'Completed', badge: completedQuizzes.length, badgeColor: '#a6e3a1' },
    { value: 'leaderboard', label: 'Leaderboard', badge: userRank ? `#${userRank}` : null, badgeColor: '#f9e2af' },
    { value: 'analytics', label: 'Analytics', badge: null, badgeColor: null },
    { value: 'question-analysis', label: 'Questions', badge: null, badgeColor: null },
    { value: 'premium-coaching', label: 'Premium', badge: 'NEW', badgeColor: '#f9e2af' }
  ]

  const currentTab = tabs.find(tab => tab.value === selectedTab)

  return (
    <div className="space-y-4 sm:space-y-6">
      <Tabs 
        value={selectedTab} 
        onValueChange={setSelectedTab}
        className="w-full"
      >
        {/* Desktop Tabs */}
        <TabsList 
          className="hidden sm:grid sm:grid-cols-6 w-full border"
          style={{ 
            backgroundColor: '#45475a',
            borderColor: '#585b70'
          }}
        >
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className="transition-all duration-200 text-xs lg:text-sm"
              style={{
                color: selectedTab === tab.value ? '#cdd6f4' : '#a6adc8',
                backgroundColor: selectedTab === tab.value ? '#585b70' : 'transparent'
              }}
            >
              <span className="truncate">{tab.label}</span>
              {tab.badge && (
                <Badge 
                  variant="secondary" 
                  className="ml-1 lg:ml-2 text-xs"
                  style={{ 
                    backgroundColor: tab.badgeColor,
                    color: '#1e1e1e'
                  }}
                >
                  {tab.badge}
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Mobile Tab Selector */}
        <div className="sm:hidden">
          <Button
            variant="outline"
            onClick={() => setIsMobileTabsOpen(!isMobileTabsOpen)}
            className="w-full justify-between h-12 text-left"
            style={{
              backgroundColor: '#45475a',
              borderColor: '#585b70',
              color: '#cdd6f4'
            }}
          >
            <div className="flex items-center space-x-2">
              <span>{currentTab?.label}</span>
              {currentTab?.badge && (
                <Badge 
                  variant="secondary" 
                  className="text-xs"
                  style={{ 
                    backgroundColor: currentTab.badgeColor,
                    color: '#1e1e1e'
                  }}
                >
                  {currentTab.badge}
                </Badge>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isMobileTabsOpen ? 'rotate-180' : ''}`} />
          </Button>

          {isMobileTabsOpen && (
            <div 
              className="mt-2 border rounded-lg overflow-hidden"
              style={{ 
                backgroundColor: '#45475a',
                borderColor: '#585b70'
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => {
                    setSelectedTab(tab.value)
                    setIsMobileTabsOpen(false)
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-opacity-80 transition-all duration-200 border-b last:border-b-0"
                  style={{
                    backgroundColor: selectedTab === tab.value ? '#585b70' : 'transparent',
                    borderColor: '#6c7086',
                    color: selectedTab === tab.value ? '#cdd6f4' : '#a6adc8'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                        style={{ 
                          backgroundColor: tab.badgeColor,
                          color: '#1e1e1e'
                        }}
                      >
                        {tab.badge}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Tab Content */}
        <div className="mt-4 sm:mt-6">
          <TabsContent value="all">
            <MainAreaAllQuizzes />
          </TabsContent>
          
          <TabsContent value="completed">
            <MainAreaCompletedQuizzes />
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <LeaderboardTab />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
          
          <TabsContent value="question-analysis">
            <QuestionAnalysisTab />
          </TabsContent>
          
          <TabsContent value="premium-coaching">
            <PremiumCoachingTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
