import { UserCheck, UserPlus, Sparkles } from 'lucide-react'

export function AuthIconTitle({ isSignIn }) {
  return (
    <div className="text-center space-y-3">
      <div className="flex justify-center">
        <div className="relative">
          <div className="p-4 rounded-full bg-gradient-to-br from-blue/20 to-sapphire/20 border-2 border-blue/30">
            {isSignIn ? (
              <UserCheck className="h-8 w-8 text-blue" />
            ) : (
              <UserPlus className="h-8 w-8 text-green" />
            )}
          </div>
          <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-text">
          {isSignIn ? 'Welcome Back!' : 'Join CAT Quiz Pro'}
        </h2>
        <p className="text-subtext0 mt-1">
          {isSignIn 
            ? 'Continue your CAT preparation journey'
            : 'Start your journey to CAT excellence'
          }
        </p>
      </div>
    </div>
  )
}
