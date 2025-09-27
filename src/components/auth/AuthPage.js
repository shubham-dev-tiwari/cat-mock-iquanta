"use client"

import { useState } from 'react'
import { useQuizStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { GraduationCap, UserCheck, UserPlus, Sparkles, Award } from 'lucide-react'

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const login = useQuizStore((state) => state.login)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    const userData = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      joinDate: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.trim()}`
    }
    
    login(userData)
    setIsLoading(false)
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e1e1e 0%, #313244 25%, #1e1e1e 50%, #313244 75%, #1e1e1e 100%)'
      }}
    >
      {/* Background animation elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: '#89b4fa15' }}
        ></div>
        <div 
          className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse delay-1000"
          style={{ backgroundColor: '#cba6f715' }}
        ></div>
        <div 
          className="absolute -bottom-20 left-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse delay-500"
          style={{ backgroundColor: '#f5c2e715' }}
        ></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Floating decorative elements */}
        <div className="absolute -top-8 -right-8 animate-bounce delay-1000" style={{ color: '#89b4fa' }}>
          <Award className="h-8 w-8" />
        </div>
        <div className="absolute -top-6 -left-6 animate-bounce delay-500" style={{ color: '#f9e2af' }}>
          <Sparkles className="h-6 w-6" />
        </div>

        <Card 
          className="backdrop-blur-xl shadow-2xl border"
          style={{ 
            backgroundColor: '#313244f0',
            borderColor: '#585b70'
          }}
        >
          <CardHeader className="space-y-6 pb-8">
            {/* Logo and Brand */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div 
                  className="p-4 rounded-2xl border"
                  style={{ 
                    backgroundColor: '#45475a',
                    borderColor: '#585b70'
                  }}
                >
                  <img
                    src="https://media.iquanta.in/ui_images/iquanta-logo-white.png"
                    alt="iQuanta CAT Mock Test"
                    className="h-16 w-16 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="h-16 w-16 hidden items-center justify-center rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, #89b4fa 0%, #cba6f7 100%)' }}
                  >
                    <GraduationCap className="h-10 w-10" style={{ color: '#1e1e1e' }} />
                  </div>
                </div>
              </div>
              <div>
                <h1 
                  className="text-4xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #89b4fa 0%, #cba6f7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  CAT Mock Test
                </h1>
                <p className="text-sm" style={{ color: '#bac2de' }}>
                  Professional CAT Exam Preparation Platform
                </p>
                <p className="text-xs mt-1" style={{ color: '#89b4fa' }}>
                  Powered by iQuanta
                </p>
              </div>
            </div>

            {/* Auth Toggle */}
            <div className="flex items-center justify-center">
              <div 
                className="flex p-1.5 rounded-xl border"
                style={{ 
                  backgroundColor: '#45475a',
                  borderColor: '#585b70'
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsSignIn(true)}
                  className="px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: isSignIn ? '#585b70' : 'transparent',
                    color: isSignIn ? '#cdd6f4' : '#a6adc8'
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignIn(false)}
                  className="px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: !isSignIn ? '#585b70' : 'transparent',
                    color: !isSignIn ? '#cdd6f4' : '#a6adc8'
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Dynamic content based on state */}
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <div className="relative">
                  <div 
                    className="p-4 rounded-full backdrop-blur-sm border-2"
                    style={{
                      backgroundColor: isSignIn ? '#89b4fa20' : '#a6e3a120',
                      borderColor: isSignIn ? '#89b4fa50' : '#a6e3a150'
                    }}
                  >
                    {isSignIn ? (
                      <UserCheck className="h-12 w-12" style={{ color: '#89b4fa' }} />
                    ) : (
                      <UserPlus className="h-12 w-12" style={{ color: '#a6e3a1' }} />
                    )}
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-5 w-5 animate-pulse" style={{ color: '#f9e2af' }} />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#cdd6f4' }}>
                  {isSignIn ? 'Welcome Back to CAT Mock Test' : 'Join CAT Mock Test Platform'}
                </h2>
                <p className="text-sm max-w-sm mx-auto" style={{ color: '#bac2de' }}>
                  {isSignIn 
                    ? 'Continue your CAT preparation with realistic mock tests and detailed performance analysis'
                    : 'Start your CAT preparation journey with India&apos;s most trusted mock test platform'
                  }
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* FIXED NAME INPUT */}
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-medium" style={{ color: '#bac2de' }}>
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  disabled={isLoading}
                  className="h-12 text-base transition-all duration-200 border focus:ring-2 focus:ring-offset-0"
                  style={{
                    backgroundColor: '#45475a',
                    borderColor: '#6c7086',
                    color: '#cdd6f4',
                    fontSize: '16px',
                    fontWeight: '400'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#89b4fa'
                    e.target.style.boxShadow = '0 0 0 2px rgba(137, 180, 250, 0.2)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#6c7086'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>
              
              {/* FIXED EMAIL INPUT */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium" style={{ color: '#bac2de' }}>
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading}
                  className="h-12 text-base transition-all duration-200 border focus:ring-2 focus:ring-offset-0"
                  style={{
                    backgroundColor: '#45475a',
                    borderColor: '#6c7086',
                    color: '#cdd6f4',
                    fontSize: '16px',
                    fontWeight: '400'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#89b4fa'
                    e.target.style.boxShadow = '0 0 0 2px rgba(137, 180, 250, 0.2)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#6c7086'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300"
                disabled={isLoading}
                style={{
                  background: 'linear-gradient(135deg, #89b4fa 0%, #cba6f7 100%)',
                  color: '#1e1e1e'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                      style={{ borderColor: '#1e1e1e' }}
                    />
                    <span>Preparing your dashboard...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://media.iquanta.in/ui_images/iquanta-logo-white.png"
                      alt="iQuanta"
                      className="h-5 w-5 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'inline';
                      }}
                    />
                    <GraduationCap className="h-5 w-5 hidden" />
                    <span>
                      {isSignIn ? 'Enter CAT Mock Test Platform' : 'Create Your CAT Account'}
                    </span>
                  </div>
                )}
              </Button>
            </form>
            
            <div className="text-center space-y-3">
              <p className="text-xs" style={{ color: '#7f849c' }}>
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs" style={{ color: '#a6adc8' }}>
                <span>✓ Realistic CAT Simulation</span>
                <span>✓ Detailed Analytics</span>
                <span>✓ Performance Tracking</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-sm font-medium" style={{ color: '#bac2de' }}>
            🎯 Master the CAT with India&apos;s Most Trusted Mock Test Platform
          </p>
          <div className="flex items-center justify-center space-x-6 text-xs" style={{ color: '#a6adc8' }}>
            <span>• 1000+ Questions</span>
            <span>• AI-Powered Analysis</span>
            <span>• Real Exam Environment</span>
          </div>
        </div>
      </div>

      {/* Add custom CSS styles directly */}
      <style jsx>{`
        input::placeholder {
          color: #a6adc8 !important;
          opacity: 0.8 !important;
        }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #45475a inset !important;
          -webkit-text-fill-color: #cdd6f4 !important;
          border: 1px solid #6c7086 !important;
        }
      `}</style>
    </div>
  )
}
