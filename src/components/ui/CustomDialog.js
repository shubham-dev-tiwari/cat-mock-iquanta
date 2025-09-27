"use client"

import { X, AlertTriangle, LogOut, Trash2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CustomDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  type = 'default', // 'warning', 'danger', 'info'
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  children 
}) {
  if (!isOpen) return null

  const getTypeColors = () => {
    switch (type) {
      case 'warning':
        return {
          iconColor: '#f9e2af', // Yellow
          buttonColor: '#f9e2af',
          buttonTextColor: '#1e1e1e'
        }
      case 'danger':
        return {
          iconColor: '#f38ba8', // Red
          buttonColor: '#f38ba8',
          buttonTextColor: '#1e1e1e'
        }
      case 'info':
        return {
          iconColor: '#89b4fa', // Blue
          buttonColor: '#89b4fa',
          buttonTextColor: '#1e1e1e'
        }
      default:
        return {
          iconColor: '#a6adc8', // Subtext1
          buttonColor: '#89b4fa', // Blue
          buttonTextColor: '#1e1e1e'
        }
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-12 w-12" style={{ color: getTypeColors().iconColor }} />
      case 'danger':
        return <Trash2 className="h-12 w-12" style={{ color: getTypeColors().iconColor }} />
      case 'info':
        return <ArrowLeft className="h-12 w-12" style={{ color: getTypeColors().iconColor }} />
      default:
        return <LogOut className="h-12 w-12" style={{ color: getTypeColors().iconColor }} />
    }
  }

  const colors = getTypeColors()

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: '#1e1e1e80' }} // Base with transparency
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div 
        className="relative max-w-md w-full rounded-2xl border shadow-2xl animate-in zoom-in duration-300"
        style={{
          backgroundColor: '#313244', // Surface0
          borderColor: '#585b70' // Surface2
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg transition-colors duration-200"
          style={{ 
            color: '#a6adc8',
            '&:hover': { backgroundColor: '#45475a' }
          }}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content */}
        <div className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div 
              className="p-4 rounded-full"
              style={{ backgroundColor: `${colors.iconColor}20` }}
            >
              {getIcon()}
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold" style={{ color: '#cdd6f4' }}>
              {title}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#bac2de' }}>
              {description}
            </p>
          </div>

          {/* Custom Content */}
          {children && (
            <div className="py-2">
              {children}
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 border transition-colors duration-200"
              style={{
                backgroundColor: 'transparent',
                borderColor: '#585b70',
                color: '#cdd6f4'
              }}
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 h-12 font-semibold transition-all duration-200"
              style={{
                backgroundColor: colors.buttonColor,
                color: colors.buttonTextColor
              }}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
