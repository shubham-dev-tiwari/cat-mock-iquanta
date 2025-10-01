"use client"

import { useState } from 'react'
import AppNameLogo from './AppNameLogo'
import SearchBar from './SearchBar'
import ExperiencePoints from './ExperiencePoints'
import AvatarUser from './AvatarUser'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Menu, X, Search } from 'lucide-react'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b backdrop-blur safe-area-top"
      style={{
        backgroundColor: '#313244f0',
        borderColor: '#585b70'
      }}
    >
      <nav className="container mx-auto px-2 sm:px-4 lg:px-6">
        {/* Desktop Navbar */}
        <div className="hidden md:flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <AppNameLogo />
            <Separator orientation="vertical" className="h-6" style={{ backgroundColor: '#585b70' }} />
            <SearchBar />
          </div>
          
          <div className="flex items-center space-x-3 lg:space-x-4">
            <ExperiencePoints />
            <Separator orientation="vertical" className="h-6" style={{ backgroundColor: '#585b70' }} />
            <AvatarUser />
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden">
          {/* Main Mobile Header */}
          <div className="flex justify-between items-center h-14 sm:h-16">
            <AppNameLogo isMobile={true} />
            
            <div className="flex items-center space-x-2">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="h-9 w-9 p-0"
                style={{ color: '#a6adc8' }}
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9 p-0"
                style={{ color: '#a6adc8' }}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isMobileSearchOpen && (
            <div className="pb-3 border-b" style={{ borderColor: '#585b70' }}>
              <SearchBar isMobile={true} />
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div 
              className="py-4 border-b space-y-3"
              style={{ borderColor: '#585b70' }}
            >
              <div className="flex items-center justify-between px-2">
                <ExperiencePoints isMobile={true} />
                <AvatarUser isMobile={true} />
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
