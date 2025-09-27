"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ExternalLink,
  Star,
  Users,
  Clock,
  Target,
  BookOpen,
  Zap,
  Trophy,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Award,
  TrendingUp
} from 'lucide-react'

export default function PremiumCoachingTab() {
  const handleVisitIQuanta = () => {
    window.open('https://www.iquanta.in/', '_blank', 'noopener,noreferrer')
  }

  const features = [
    {
      icon: <Clock className="h-5 w-5" />,
      title: "24×7 Doubt Solving",
      description: "Get your doubts resolved within 15 minutes anytime",
      color: "#89b4fa"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "500+ 99%ilers in 2024",
      description: "Proven track record of top CAT results",
      color: "#f9e2af"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "7500+ Practice Questions",
      description: "Comprehensive question bank with detailed solutions",
      color: "#a6e3a1"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Live Classes & Mocks",
      description: "Interactive sessions with full-length mock tests",
      color: "#cba6f7"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Shortcuts & Techniques",
      description: "Time-saving formulas and problem-solving tricks",
      color: "#f38ba8"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "AI Mock Analysis",
      description: "Advanced AI-powered performance analysis",
      color: "#94e2d5"
    }
  ]

  const courses = [
    {
      name: "CAT 2025 Full Course",
      price: "₹15,999",
      originalPrice: "₹25,999",
      features: [
        "Live Conceptual Classes",
        "All Year Practice Sessions", 
        "24×7 Doubt Solving",
        "Full Mocks with Video Solutions",
        "Assignments & Practice"
      ],
      popular: false
    },
    {
      name: "CAT 2025 + IIM ABC",
      price: "₹24,999",
      originalPrice: "₹39,999",
      features: [
        "Everything in Full Course",
        "7500 CAT Questions IIM ABC Course",
        "IIM ABC Practice Sessions",
        "12 Sets: CAT'24 Level Books",
        "Premium Support"
      ],
      popular: true
    },
    {
      name: "CAT 2025 Full Course Pro",
      price: "₹32,999",
      originalPrice: "₹49,999",
      features: [
        "All Premium Features",
        "AI Mock Analysis",
        "Special Initiatives (QA250, LRDI70)",
        "Peer to Peer Learning",
        "Free 2 Month Crash Course"
      ],
      popular: false
    }
  ]

  const testimonials = [
    {
      name: "Rahul Sharma",
      score: "99.86%ile",
      text: "iQuanta's shortcuts and tricks are very useful. There were 2-3 questions in QA which were direct from their formulas!",
      college: "IIM Bangalore"
    },
    {
      name: "Priya Patel", 
      score: "99.76%ile",
      text: "With time limitations due to job, I relied on iQuanta for quant. My quant showed significant improvement.",
      college: "IIM Calcutta"
    },
    {
      name: "Amit Kumar",
      score: "99.67%ile", 
      text: "Best material for quant preparation for CAT which suited my preparation style perfectly.",
      college: "IIM Ahmedabad"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card 
        className="border relative overflow-hidden"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4">
            <GraduationCap className="h-32 w-32" style={{ color: '#89b4fa' }} />
          </div>
        </div>
        
        <CardContent className="p-8 relative">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: '#89b4fa20' }}
                >
                  <Trophy className="h-8 w-8" style={{ color: '#f9e2af' }} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold" style={{ color: '#cdd6f4' }}>
                    Upgrade to Premium CAT Coaching
                  </h1>
                  <p className="text-lg" style={{ color: '#89b4fa' }}>
                    Join iQuanta - India's Leading CAT Online Coaching
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#f9e2af' }}>
                    500+
                  </div>
                  <div className="text-sm" style={{ color: '#a6adc8' }}>
                    99%ilers in 2024
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#a6e3a1' }}>
                    24×7
                  </div>
                  <div className="text-sm" style={{ color: '#a6adc8' }}>
                    Doubt Support
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: '#cba6f7' }}>
                    7500+
                  </div>
                  <div className="text-sm" style={{ color: '#a6adc8' }}>
                    Practice Questions
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleVisitIQuanta}
                className="inline-flex items-center space-x-2 px-6 py-3 text-lg"
                style={{
                  background: 'linear-gradient(135deg, #89b4fa 0%, #cba6f7 100%)',
                  color: '#1e1e1e'
                }}
              >
                <span>Explore iQuanta Courses</span>
                <ExternalLink className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Why Choose iQuanta */}
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2" style={{ color: '#cdd6f4' }}>
            <Star className="h-5 w-5" style={{ color: '#f9e2af' }} />
            <span>Why Choose iQuanta for CAT Preparation?</span>
          </CardTitle>
          <p className="text-sm" style={{ color: '#a6adc8' }}>
            India's most trusted CAT coaching platform with proven results
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: '#45475a',
                  borderColor: '#585b70'
                }}
              >
                <div className="flex items-start space-x-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <div style={{ color: feature.color }}>
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1" style={{ color: '#cdd6f4' }}>
                      {feature.title}
                    </h3>
                    <p className="text-sm" style={{ color: '#a6adc8' }}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Comparison */}
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2" style={{ color: '#cdd6f4' }}>
            <BookOpen className="h-5 w-5" style={{ color: '#89b4fa' }} />
            <span>Choose Your CAT 2025 Course</span>
          </CardTitle>
          <p className="text-sm" style={{ color: '#a6adc8' }}>
            Flexible learning options designed for different preparation needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 relative ${
                  course.popular ? 'ring-2' : ''
                }`}
                style={{ 
                  backgroundColor: '#45475a',
                  borderColor: course.popular ? '#89b4fa' : '#585b70',
                  ringColor: course.popular ? '#89b4fa' : 'transparent'
                }}
              >
                {course.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge 
                      style={{ 
                        backgroundColor: '#89b4fa',
                        color: '#1e1e1e'
                      }}
                    >
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#cdd6f4' }}>
                    {course.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold" style={{ color: '#a6e3a1' }}>
                      {course.price}
                    </span>
                    <span 
                      className="text-sm line-through"
                      style={{ color: '#f38ba8' }}
                    >
                      {course.originalPrice}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {course.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#a6e3a1' }} />
                      <span className="text-sm" style={{ color: '#a6adc8' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={handleVisitIQuanta}
                  className="w-full"
                  style={{
                    backgroundColor: course.popular ? '#89b4fa' : '#585b70',
                    color: course.popular ? '#1e1e1e' : '#cdd6f4'
                  }}
                >
                  Select Course
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Stories */}
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2" style={{ color: '#cdd6f4' }}>
            <TrendingUp className="h-5 w-5" style={{ color: '#a6e3a1' }} />
            <span>Success Stories from iQuanta Students</span>
          </CardTitle>
          <p className="text-sm" style={{ color: '#a6adc8' }}>
            Real testimonials from CAT toppers who cracked their dream IIMs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg border"
                style={{ 
                  backgroundColor: '#45475a',
                  borderColor: '#585b70'
                }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ 
                      background: 'linear-gradient(135deg, #89b4fa 0%, #cba6f7 100%)',
                      color: '#1e1e1e'
                    }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: '#cdd6f4' }}>
                      {testimonial.name}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        style={{ 
                          backgroundColor: '#a6e3a120',
                          color: '#a6e3a1'
                        }}
                      >
                        {testimonial.score}
                      </Badge>
                      <span className="text-xs" style={{ color: '#cba6f7' }}>
                        {testimonial.college}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm italic" style={{ color: '#a6adc8' }}>
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card 
        className="border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        <CardContent className="p-8 text-center">
          <div 
            className="p-6 rounded-xl mb-6"
            style={{ backgroundColor: '#89b4fa10' }}
          >
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#cdd6f4' }}>
              Ready to Join 500+ CAT 99%ilers?
            </h2>
            <p className="mb-4" style={{ color: '#a6adc8' }}>
              Take your CAT preparation to the next level with India's leading online coaching platform
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm mb-6">
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-4 w-4" style={{ color: '#a6e3a1' }} />
                <span style={{ color: '#a6adc8' }}>24×7 Doubt Support</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-4 w-4" style={{ color: '#a6e3a1' }} />
                <span style={{ color: '#a6adc8' }}>Live Classes</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-4 w-4" style={{ color: '#a6e3a1' }} />
                <span style={{ color: '#a6adc8' }}>AI Mock Analysis</span>
              </div>
            </div>
            <Button 
              onClick={handleVisitIQuanta}
              size="lg"
              className="px-8 py-3 text-lg"
              style={{
                background: 'linear-gradient(135deg, #89b4fa 0%, #cba6f7 100%)',
                color: '#1e1e1e'
              }}
            >
              Start Your CAT Journey with iQuanta
              <ExternalLink className="h-5 w-5 ml-2" />
            </Button>
          </div>
          
          <p className="text-xs" style={{ color: '#7f849c' }}>
            * This is a partnership link. Clicking will take you to iQuanta's official website.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
