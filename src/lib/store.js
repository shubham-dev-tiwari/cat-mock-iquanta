import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Mock leaderboard data (in real app, this would come from API)
const generateMockLeaderboard = () => [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    totalPoints: 12450,
    accuracy: 94,
    totalQuizzes: 45,
    currentStreak: 12,
    averageScore: 89,
    rank: 1,
    lastActiveDate: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    totalPoints: 11890,
    accuracy: 92,
    totalQuizzes: 38,
    currentStreak: 8,
    averageScore: 87,
    rank: 2,
    lastActiveDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 3,
    name: "Amit Kumar",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    totalPoints: 11250,
    accuracy: 89,
    totalQuizzes: 42,
    currentStreak: 5,
    averageScore: 85,
    rank: 3,
    lastActiveDate: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    id: 4,
    name: "Sneha Reddy",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    totalPoints: 10890,
    accuracy: 91,
    totalQuizzes: 35,
    currentStreak: 15,
    averageScore: 88,
    rank: 4,
    lastActiveDate: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
  },
  {
    id: 5,
    name: "Vikram Singh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    totalPoints: 10200,
    accuracy: 86,
    totalQuizzes: 40,
    currentStreak: 3,
    averageScore: 82,
    rank: 5,
    lastActiveDate: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
  }
]

export const useQuizStore = create(
  persist(
    (set, get) => ({
      // Existing state...
      user: null,
      isAuthenticated: false,
      
      // Quiz State
      selectedTab: 'all',
      selectedLanguage: 'all',
      currentQuiz: null,
      quizStarted: false,
      completedQuizzes: [],
      
      // Gamification (existing)
      totalPoints: 0,
      currentStreak: 0,
      totalQuizzes: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      accuracy: 0,
      bestScore: 0,
      
      // NEW: Analytics & Leaderboard
      leaderboard: generateMockLeaderboard(),
      userRank: null,
      weeklyStats: {
        testsThisWeek: 0,
        avgScoreThisWeek: 0,
        hoursStudied: 0,
        improvementRate: 0
      },
      monthlyStats: {
        testsThisMonth: 0,
        avgScoreThisMonth: 0,
        strongSubjects: [],
        weakSubjects: []
      },
      performanceHistory: [], // Last 30 quiz results
      
      // Search
      searchQuery: '',
      
      // Actions (existing)
      login: (userData) => {
        const currentUser = {
          ...userData,
          totalPoints: get().totalPoints,
          accuracy: get().accuracy,
          totalQuizzes: get().totalQuizzes,
          currentStreak: get().currentStreak,
        }
        
        // Update leaderboard with current user
        const updatedLeaderboard = get().updateLeaderboard(currentUser)
        
        set({ 
          user: currentUser, 
          isAuthenticated: true,
          leaderboard: updatedLeaderboard
        })
      },
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        quizStarted: false,
        currentQuiz: null
      }),
      
      setSelectedTab: (tab) => set({ selectedTab: tab }),
      setSelectedLanguage: (language) => set({ selectedLanguage: language }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      startQuiz: (quiz) => set({ 
        currentQuiz: quiz, 
        quizStarted: true 
      }),
      
      exitQuiz: () => set({
        quizStarted: false,
        currentQuiz: null
      }),
      
      // Enhanced complete quiz with analytics
      completeQuiz: (quizResult) => {
        const { 
          completedQuizzes, 
          totalPoints, 
          correctAnswers, 
          wrongAnswers, 
          totalQuizzes, 
          currentStreak,
          performanceHistory,
          user 
        } = get()
        
        const newCompletedQuiz = {
          ...quizResult,
          completedAt: new Date().toISOString(),
          id: Date.now()
        }
        
        const newCorrectAnswers = correctAnswers + quizResult.correctAnswers
        const newWrongAnswers = wrongAnswers + quizResult.wrongAnswers
        const newTotalQuizzes = totalQuizzes + 1
        const newAccuracy = Math.round((newCorrectAnswers / (newCorrectAnswers + newWrongAnswers)) * 100)
        const pointsEarned = quizResult.score * 10
        const newTotalPoints = totalPoints + pointsEarned
        const newStreak = quizResult.score >= 80 ? currentStreak + 1 : 0
        
        // Update performance history
        const newPerformanceHistory = [
          ...performanceHistory.slice(-29), // Keep last 29 + new one = 30
          {
            date: new Date().toISOString(),
            score: quizResult.score,
            section: quizResult.section || 'general',
            timeSpent: quizResult.timeSpent
          }
        ]
        
        // Calculate weekly stats
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        const thisWeekResults = newPerformanceHistory.filter(
          result => new Date(result.date) >= oneWeekAgo
        )
        
        const weeklyStats = {
          testsThisWeek: thisWeekResults.length,
          avgScoreThisWeek: thisWeekResults.length > 0 
            ? Math.round(thisWeekResults.reduce((sum, r) => sum + r.score, 0) / thisWeekResults.length)
            : 0,
          hoursStudied: Math.round(thisWeekResults.reduce((sum, r) => sum + (r.timeSpent || 0), 0) / 3600 * 100) / 100,
          improvementRate: thisWeekResults.length >= 2 
            ? Math.round(((thisWeekResults[thisWeekResults.length - 1].score - thisWeekResults[0].score) / thisWeekResults[0].score) * 100)
            : 0
        }
        
        const newState = {
          completedQuizzes: [...completedQuizzes, newCompletedQuiz],
          totalPoints: newTotalPoints,
          correctAnswers: newCorrectAnswers,
          wrongAnswers: newWrongAnswers,
          totalQuizzes: newTotalQuizzes,
          accuracy: newAccuracy,
          currentStreak: newStreak,
          bestScore: Math.max(get().bestScore, quizResult.score),
          quizStarted: false,
          currentQuiz: null,
          performanceHistory: newPerformanceHistory,
          weeklyStats
        }
        
        set(newState)
        
        // Update user in leaderboard
        if (user) {
          const updatedUser = {
            ...user,
            totalPoints: newTotalPoints,
            accuracy: newAccuracy,
            totalQuizzes: newTotalQuizzes,
            currentStreak: newStreak
          }
          const updatedLeaderboard = get().updateLeaderboard(updatedUser)
          set({ user: updatedUser, leaderboard: updatedLeaderboard })
        }
      },
      
      // NEW: Update leaderboard function
      updateLeaderboard: (updatedUser) => {
        const { leaderboard } = get()
        let newLeaderboard = [...leaderboard]
        
        // Find and update user or add new user
        const userIndex = newLeaderboard.findIndex(u => u.id === updatedUser.id)
        if (userIndex >= 0) {
          newLeaderboard[userIndex] = {
            ...newLeaderboard[userIndex],
            ...updatedUser,
            lastActiveDate: new Date().toISOString()
          }
        } else {
          // Add new user to leaderboard
          newLeaderboard.push({
            ...updatedUser,
            rank: newLeaderboard.length + 1,
            averageScore: updatedUser.totalQuizzes > 0 
              ? Math.round((updatedUser.totalPoints / 10) / updatedUser.totalQuizzes) 
              : 0,
            lastActiveDate: new Date().toISOString()
          })
        }
        
        // Sort by total points and update ranks
        newLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints)
        newLeaderboard.forEach((user, index) => {
          user.rank = index + 1
        })
        
        return newLeaderboard
      },
      
      // Get current user rank
      getCurrentUserRank: () => {
        const { user, leaderboard } = get()
        if (!user) return null
        const userInLeaderboard = leaderboard.find(u => u.id === user.id)
        return userInLeaderboard ? userInLeaderboard.rank : null
      },
      
      clearStats: () => set({
        totalPoints: 0,
        totalQuizzes: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        currentStreak: 0,
        bestScore: 0,
        accuracy: 0,
        completedQuizzes: [],
        performanceHistory: [],
        weeklyStats: {
          testsThisWeek: 0,
          avgScoreThisWeek: 0,
          hoursStudied: 0,
          improvementRate: 0
        }
      }),
      
      deleteAccount: () => set({
        user: null,
        isAuthenticated: false,
        totalPoints: 0,
        totalQuizzes: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        currentStreak: 0,
        bestScore: 0,
        accuracy: 0,
        completedQuizzes: [],
        selectedTab: 'all',
        selectedLanguage: 'all',
        searchQuery: '',
        quizStarted: false,
        currentQuiz: null,
        performanceHistory: [],
        weeklyStats: {
          testsThisWeek: 0,
          avgScoreThisWeek: 0,
          hoursStudied: 0,
          improvementRate: 0
        }
      })
    }),
    {
      name: 'cat-mock-test-storage'
    }
  )
)
