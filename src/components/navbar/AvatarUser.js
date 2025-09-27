"use client"

import { useState } from 'react'
import { useQuizStore } from '@/lib/store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  User, 
  BarChart3, 
  Trash2, 
  LogOut,
  Settings,
  HelpCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import CustomDialog from '@/components/ui/CustomDialog'

export default function AvatarUser() {
  const { user, logout, clearStats, deleteAccount } = useQuizStore()
  const [showClearStatsDialog, setShowClearStatsDialog] = useState(false)
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const handleClearStats = () => {
    clearStats()
    setShowClearStatsDialog(false)
  }

  const handleDeleteAccount = () => {
    deleteAccount()
    setShowDeleteAccountDialog(false)
  }

  const handleLogout = () => {
    logout()
    setShowLogoutDialog(false)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar 
              className="h-10 w-10 border-2 transition-colors duration-200"
              style={{ 
                borderColor: '#585b70'
              }}
            >
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback 
                className="text-white"
                style={{ background: 'linear-gradient(135deg, #89b4fa 0%, #cba6f7 100%)' }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56 border animate-in slide-in-from-top-2 duration-300"
          style={{ 
            backgroundColor: '#313244',
            borderColor: '#585b70'
          }}
          align="end" 
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none" style={{ color: '#cdd6f4' }}>
                {user?.name}
              </p>
              <p className="text-xs leading-none" style={{ color: '#a6adc8' }}>
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator style={{ backgroundColor: '#585b70' }} />
          
          <DropdownMenuItem 
            className="cursor-pointer transition-colors duration-200 focus:outline-none"
            style={{ 
              color: '#cdd6f4',
            }}
            onSelect={(e) => e.preventDefault()}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="cursor-pointer transition-colors duration-200 focus:outline-none"
            style={{ 
              color: '#cdd6f4',
            }}
            onSelect={(e) => e.preventDefault()}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            <span>Analytics</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="cursor-pointer transition-colors duration-200 focus:outline-none"
            style={{ 
              color: '#cdd6f4',
            }}
            onSelect={(e) => e.preventDefault()}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="cursor-pointer transition-colors duration-200 focus:outline-none"
            style={{ 
              color: '#cdd6f4',
            }}
            onSelect={(e) => e.preventDefault()}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator style={{ backgroundColor: '#585b70' }} />
          
          <DropdownMenuItem 
            onClick={() => setShowClearStatsDialog(true)}
            className="cursor-pointer transition-colors duration-200 focus:outline-none"
            style={{ 
              color: '#cdd6f4',
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Clear Stats</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => setShowDeleteAccountDialog(true)}
            className="cursor-pointer transition-colors duration-200 focus:outline-none"
            style={{ 
              color: '#f38ba8',
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete Account</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator style={{ backgroundColor: '#585b70' }} />
          
          <DropdownMenuItem 
            onClick={() => setShowLogoutDialog(true)}
            className="cursor-pointer transition-colors duration-200 focus:outline-none"
            style={{ 
              color: '#cdd6f4',
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Stats Dialog */}
      <CustomDialog
        isOpen={showClearStatsDialog}
        onClose={() => setShowClearStatsDialog(false)}
        onConfirm={handleClearStats}
        type="warning"
        title="Clear All Statistics?"
        description="This will permanently delete all your quiz statistics, scores, and progress. This action cannot be undone."
        confirmText="Clear Stats"
        cancelText="Keep Stats"
      />

      {/* Delete Account Dialog */}
      <CustomDialog
        isOpen={showDeleteAccountDialog}
        onClose={() => setShowDeleteAccountDialog(false)}
        onConfirm={handleDeleteAccount}
        type="danger"
        title="Delete Account"
        description="This will permanently delete your account and all associated data including quiz history, scores, and personal information."
        confirmText="Delete Forever"
        cancelText="Cancel"
      >
        <div 
          className="p-4 rounded-lg border-l-4"
          style={{
            backgroundColor: '#f38ba815',
            borderColor: '#f38ba8'
          }}
        >
          <p className="text-xs font-medium" style={{ color: '#f38ba8' }}>
            ⚠️ This action is irreversible and cannot be undone.
          </p>
        </div>
      </CustomDialog>

      {/* Logout Dialog */}
      <CustomDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        type="info"
        title="Sign Out"
        description="Are you sure you want to sign out? You can always sign back in anytime with your credentials."
        confirmText="Sign Out"
        cancelText="Stay Signed In"
      />
    </>
  )
}
