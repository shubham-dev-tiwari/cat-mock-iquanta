"use client"

import { useState } from 'react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, ArrowUp, ArrowDown } from 'lucide-react'

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'difficulty-asc', label: 'Difficulty (Easy → Hard)' },
  { value: 'difficulty-desc', label: 'Difficulty (Hard → Easy)' },
  { value: 'questions-asc', label: 'Questions (Low → High)' },
  { value: 'questions-desc', label: 'Questions (High → Low)' },
]

export default function SortDropdown() {
  const [selectedOption, setSelectedOption] = useState('name-asc')

  const selectedOptionLabel = sortOptions.find(
    option => option.value === selectedOption
  )?.label || 'Name (A-Z)'

  const isAscending = selectedOption.includes('asc')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="border transition-all duration-200"
          style={{ 
            backgroundColor: '#45475a',
            borderColor: '#585b70',
            color: '#cdd6f4'
          }}
        >
          {isAscending ? (
            <ArrowUp className="h-4 w-4 mr-2" />
          ) : (
            <ArrowDown className="h-4 w-4 mr-2" />
          )}
          {selectedOptionLabel}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 border"
        style={{ 
          backgroundColor: '#313244',
          borderColor: '#585b70'
        }}
      >
        {sortOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedOption === option.value}
            onCheckedChange={() => setSelectedOption(option.value)}
            className="transition-colors duration-200"
            style={{ 
              color: '#cdd6f4',
              '&:hover': { backgroundColor: '#45475a' }
            }}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
