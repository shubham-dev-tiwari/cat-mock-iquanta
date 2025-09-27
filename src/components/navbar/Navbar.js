"use client"

import AppNameLogo from './AppNameLogo'
import SearchBar from './SearchBar'
import ExperiencePoints from './ExperiencePoints'
import AvatarUser from './AvatarUser'
import { Separator } from '@/components/ui/separator'

export default function Navbar() {
  return (
    <header 
      className="sticky top-0 z-50 w-full border-b backdrop-blur"
      style={{
        backgroundColor: '#313244f0',
        borderColor: '#585b70'
      }}
    >
      <nav className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <AppNameLogo />
            <Separator orientation="vertical" className="h-6" style={{ backgroundColor: '#585b70' }} />
            <SearchBar />
          </div>
          
          <div className="flex items-center space-x-4">
            <ExperiencePoints />
            <Separator orientation="vertical" className="h-6" style={{ backgroundColor: '#585b70' }} />
            <AvatarUser />
          </div>
        </div>
      </nav>
    </header>
  )
}
