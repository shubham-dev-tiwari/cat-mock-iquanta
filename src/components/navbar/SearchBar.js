"use client"

import { useState } from 'react'
import { useQuizStore } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useQuizStore()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(localQuery)
  }

  const clearSearch = () => {
    setLocalQuery('')
    setSearchQuery('')
  }

  return (
    <div className="relative w-64">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#a6adc8' }} />
          <Input
            type="text"
            placeholder="Search mock tests..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="pl-10 pr-10 h-9 transition-all duration-200"
            style={{
              backgroundColor: '#45475a',
              borderColor: '#6c7086',
              color: '#cdd6f4',
            }}
          />
          {localQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
              style={{ color: '#a6adc8' }}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
