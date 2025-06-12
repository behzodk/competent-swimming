// src/contexts/ProfileContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const ProfileContext = createContext({
  activeProfileId: null,
  setActiveProfileId: () => {},
  profile: null,
  profileOptions: [],
})

export function ProfileProvider({ children, initialSession }) {
  const [activeProfileId, _setActiveProfileId] = useState(() => {
    return localStorage.getItem('activeProfile') || null
  })
  const [profile, setProfile] = useState(null)
  const [profileOptions, setProfileOptions] = useState([])

  // mirror setter to localStorage
  const setActiveProfileId = (id) => {
    localStorage.setItem('activeProfile', id)
    _setActiveProfileId(id)
  }

  // seed initial if none
  useEffect(() => {
    if (!activeProfileId && initialSession?.user?.id) {
      supabase
        .from('profiles')
        .select('id')
        .eq('user_id', initialSession.user.id)
        .single()
        .then(({ data }) => {
          if (data?.id) setActiveProfileId(data.id)
        })
    }
  }, [initialSession, activeProfileId])

  // load profileOptions (self + dependents)
  useEffect(() => {
    async function loadOptions() {
      if (!initialSession?.user?.id) return
      const { data: me } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .eq('user_id', initialSession.user.id)
        .single()
      if (!me?.id) return
      const { data: deps } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .eq('parent', me.id)
        .order('first_name', { ascending: true })
      const opts = [
        { id: me.id, label: `${me.first_name} ${me.last_name} (You)` },
        ...((deps || []).map(d => ({ id: d.id, label: `${d.first_name} ${d.last_name}` })))
      ]
      setProfileOptions(opts)
    }
    loadOptions()
  }, [initialSession])

  // load full profile whenever activeProfileId changes
  useEffect(() => {
    async function loadProfile() {
      if (!activeProfileId) {
        setProfile(null)
        return
      }
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', activeProfileId)
        .single()
      setProfile(data || null)
    }
    loadProfile()
  }, [activeProfileId])

  return (
    <ProfileContext.Provider
      value={{ activeProfileId, setActiveProfileId, profile, profileOptions }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)
