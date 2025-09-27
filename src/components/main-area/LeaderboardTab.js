"use client"

import { useQuizStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Clock,
  Target,
  Zap
} from 'lucide-react'

export default function LeaderboardTab() {
  const { leaderboard, user } = useQuizStore()

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5" style={{ color: '#f9e2af' }} />
      case 2:
        return <Medal className="h-5 w-5" style={{ color: '#a6adc8' }} />
      case 3:
        return <Award className="h-5 w-5" style={{ color: '#fab387' }} />
      default:
        return <span className="text-sm font-bold" style={{ color: '#a6adc8' }}>#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return { backgroundColor: '#f9e2af', color: '#1e1e1e' }
      case 2:
        return { backgroundColor: '#a6adc8', color: '#1e1e1e' }
      case 3:
        return { backgroundColor: '#fab387', color: '#1e1e1e' }
      default:
        return { backgroundColor: '#585b70', color: '#cdd6f4' }
    }
  }

  const formatLastActive = (dateString) => {
    const now = new Date()
    const lastActive = new Date(dateString)
    const diffInMinutes = Math.floor((now - lastActive) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <Card 
      className="border"
      style={{ 
        backgroundColor: '#313244',
        borderColor: '#585b70'
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center space-x-2" style={{ color: '#cdd6f4' }}>
          <Trophy className="h-5 w-5" style={{ color: '#f9e2af' }} />
          <span>Top Performers</span>
        </CardTitle>
        <p className="text-sm" style={{ color: '#a6adc8' }}>
          See how you rank against other CAT aspirants
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current User Highlight (if in top 10) */}
        {user && leaderboard.find(u => u.id === user.id) && (
          <div 
            className="p-4 rounded-lg border-2 border-dashed"
            style={{ 
              backgroundColor: '#89b4fa15',
              borderColor: '#89b4fa'
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium" style={{ color: '#89b4fa' }}>
                YOUR RANK
              </span>
              <Badge 
                style={getRankBadgeColor(leaderboard.find(u => u.id === user.id)?.rank)}
              >
                #{leaderboard.find(u => u.id === user.id)?.rank}
              </Badge>
            </div>
          </div>
        )}

        {/* Leaderboard List */}
        <div className="space-y-3">
          {leaderboard.slice(0, 10).map((player, index) => {
            const isCurrentUser = user && player.id === user.id
            
            return (
              <div 
                key={player.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  isCurrentUser ? 'ring-2' : ''
                }`}
                style={{
                  backgroundColor: isCurrentUser ? '#89b4fa20' : '#45475a',
                  borderColor: isCurrentUser ? '#89b4fa' : '#585b70',
                  ringColor: isCurrentUser ? '#89b4fa' : 'transparent'
                }}
              >
                <div className="flex items-center justify-between">
                  {/* Left: Rank + Avatar + Info */}
                  <div className="flex items-center space-x-3">
                    {/* Rank */}
                    <div className="w-8 flex justify-center">
                      {getRankIcon(player.rank)}
                    </div>
                    
                    {/* Avatar */}
                    <Avatar className="h-10 w-10 border-2" style={{ borderColor: '#585b70' }}>
                      <AvatarImage src={player.avatar} alt={player.name} />
                      <AvatarFallback 
                        style={{ 
                          background: isCurrentUser 
                            ? 'linear-gradient(135deg, #89b4fa 0%, #cba6f7 100%)'
                            : '#6c7086',
                          color: '#1e1e1e'
                        }}
                      >
                        {player.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    {/* Name and Stats */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span 
                          className="font-semibold"
                          style={{ color: isCurrentUser ? '#89b4fa' : '#cdd6f4' }}
                        >
                          {player.name}
                        </span>
                        {isCurrentUser && (
                          <Badge 
                            variant="outline"
                            style={{ color: '#89b4fa', borderColor: '#89b4fa' }}
                          >
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs" style={{ color: '#a6adc8' }}>
                        <span className="flex items-center space-x-1">
                          <Target className="h-3 w-3" />
                          <span>{player.accuracy}% accuracy</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatLastActive(player.lastActiveDate)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right: Points and Streak */}
                  <div className="text-right">
                    <div className="flex items-center space-x-1 justify-end">
                      <Zap className="h-4 w-4" style={{ color: '#f9e2af' }} />
                      <span className="font-bold text-lg" style={{ color: '#f9e2af' }}>
                        {player.totalPoints.toLocaleString()}
                      </span>
                    </div>
                    {player.currentStreak > 0 && (
                      <div className="flex items-center space-x-1 justify-end mt-1">
                        <TrendingUp className="h-3 w-3" style={{ color: '#a6e3a1' }} />
                        <span className="text-xs" style={{ color: '#a6e3a1' }}>
                          {player.currentStreak} streak
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Show More Button */}
        <div className="text-center pt-4">
          <button 
            className="text-sm px-4 py-2 rounded-lg transition-colors duration-200"
            style={{ 
              color: '#89b4fa',
              backgroundColor: '#89b4fa20'
            }}
          >
            View Full Leaderboard
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
