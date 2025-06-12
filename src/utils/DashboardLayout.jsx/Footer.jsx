// src/components/Footer.jsx

import React, { useState, useRef } from 'react'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { User, ChevronDown, Users2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import { useProfile } from '@/contexts/ProfileContext'

export default function Footer() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const { profile, profileOptions, activeProfileId, setActiveProfileId } = useProfile()
  const [open, setOpen] = useState(false)

  const accountLabel = profile
    ? `${profile.first_name} ${profile.last_name}`
    : 'Your Profile'

  const toggle = () => setOpen(o => !o)

  const handleProfileSelect = (id) => {
    setActiveProfileId(id)
    setOpen(false)
    window.location.reload()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setActiveProfileId(null)
    localStorage.removeItem('activeProfile')
    navigate('/login')
  }

  return (
    <SidebarFooter ref={containerRef} className="relative bg-white border-t px-6 py-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={toggle}
            className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-4 py-3 min-h-[3rem] rounded-full shadow-sm transition"
          >
            <div className="w-9 h-9 flex-shrink-0 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
              {profile?.first_name?.[0] || 'U'}
            </div>
            <span className="flex-1 text-sm font-medium text-gray-900 truncate">{accountLabel}</span>
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${open ? 'rotate-180' : ''}`} />
          </SidebarMenuButton>

          {open && (
            <div
              className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg overflow-hidden z-50"
              style={{ minWidth: '240px' }}
            >
              {/* Profile switcher */}
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">Switch Profile</p>
                <Select
                  value={activeProfileId}
                  onValueChange={handleProfileSelect}
                  modal={false}
                >
                  <SelectTrigger className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                    <SelectValue placeholder="Choose profile…" />
                  </SelectTrigger>
                  <SelectContent side="top" className="bg-white border border-gray-200 rounded-lg shadow-md">
                    {profileOptions.map(opt => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t border-gray-200" />

              {/* Account actions */}
              <div className="space-y-1 p-2">
                <button
                  onClick={() => { navigate('/profile'); setOpen(false) }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 rounded-md transition"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  Edit Profile
                </button>
                <button
                  onClick={() => { navigate('/profile/view'); setOpen(false) }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 rounded-md transition"
                >
                  <Users2 className="w-5 h-5 text-gray-600" />
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 rounded-md transition"
                >
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Log Out
                </button>
              </div>
            </div>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}