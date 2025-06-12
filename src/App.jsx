

// src/App.jsx
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import Loader from './components/Loader'
import Aroutes from './routes'
import { ProfileProvider } from './contexts/profileContext'

function App() {
  const [session, setSession] = useState(null)
  const [initializing, setInitializing] = useState(true)
  const navigate = useNavigate()

  // 1) Handle recovery link & initial session fetch
  useEffect(() => {
    const MIN_LOADING_MS = 500
    const start = Date.now()

    async function handleRecoveryLink() {
      const url = new URL(window.location.href)
      const type = url.searchParams.get('type')
      const access = url.searchParams.get('access_token')
      const refresh = url.searchParams.get('refresh_token')

      if (type === 'recovery' && access) {
        const {
          data: { session: newSession },
          error,
        } = await supabase.auth.setSession({
          access_token: access,
          refresh_token: refresh,
        })
        if (!error) {
          setSession(newSession)
          navigate('/reset-password', { replace: true })
        }
      }
    }

    handleRecoveryLink().finally(() => {
      supabase.auth
        .getSession()
        .then(({ data: { session: existing } }) => {
          setSession(existing)
        })
        .catch(console.error)
        .finally(() => {
          const elapsed = Date.now() - start
          const wait = MIN_LOADING_MS - elapsed
          if (wait > 0) setTimeout(() => setInitializing(false), wait)
          else setInitializing(false)
        })
    })
  }, [navigate])

  // 2) Listen for auth changes (login/logout)
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      setSession(newSession)
    })
    // cleanup
    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  if (initializing) return <Loader />

  return (
    <ProfileProvider initialSession={session}>
      <div className="container mx-auto">
        <Aroutes session={session} />
      </div>
    </ProfileProvider>
  )
}

export default App