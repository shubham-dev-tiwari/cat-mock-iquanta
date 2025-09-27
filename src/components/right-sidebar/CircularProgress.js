"use client"

import { useQuizStore } from '@/lib/store'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function CircularProgress() {
  const { accuracy, totalQuizzes } = useQuizStore()
  const progressValue = totalQuizzes > 0 ? accuracy : 0

  return (
    <div className="w-32 h-32 mx-auto">
      <CircularProgressbar
        value={progressValue}
        text={`${progressValue}%`}
        styles={buildStyles({
          textSize: '16px',
          pathColor: '#89b4fa', // Catppuccin Mocha Blue
          textColor: '#cdd6f4', // Catppuccin Mocha Text
          trailColor: '#585b70', // Catppuccin Mocha Surface2
          backgroundColor: '#89b4fa',
        })}
      />
    </div>
  )
}
