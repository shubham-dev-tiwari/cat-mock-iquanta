import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'

export function AuthHeader({ isSignIn, setIsSignIn }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6 text-blue" />
        <span className="text-xl font-bold text-text">CAT Mock</span>
      </div>
      <Button
        variant="ghost"
        onClick={() => setIsSignIn(!isSignIn)}
        className="text-sm text-subtext0 hover:text-text"
      >
        {isSignIn ? 'Sign Up' : 'Sign In'}
      </Button>
    </div>
  )
}
