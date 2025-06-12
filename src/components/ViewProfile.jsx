import { useState, useEffect } from "react"
import {
  CreditCard,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/profileContext"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom"
import { SubscriptionAlert } from "@/utils/ProfileView/SubscriptionAlert" 
import { ProfileHeaderCard } from "@/utils/ProfileView/ProfileHeaderCard"
import { CurrentClassInfo } from "@/utils/ProfileView/CurrentClassInfo"
import { SkillsProgress } from "@/utils/ProfileView/SkillsProgress"
import { Achievements } from "@/utils/ProfileView/Achievements"
import { QuickStats } from "@/utils/ProfileView/QuickStats"
import { UpcomingGoals } from "@/utils/ProfileView/UpcomingGoals"

const levels = {
  1: "Starter",
  2: "Novice",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
  6: "Master",
  7: "Champion",
}

export default function ViewProfile() {
  const navigate = useNavigate()
  const { profile: rawprofile } = useProfile()
  const [profile, setProfile] = useState()
  useEffect(() => {
    setProfile(rawprofile)
  }, [rawprofile])
  const [badges, setBadges] = useState([])
  const [skills, setSkills] = useState([])
  const [instructor, setInstructor] = useState(null)

  useEffect(() => {
    if (!profile?.id) return;

    async function loadChildrenAndSubscriptions() {
      const { data: subs, error: subsErr } = await supabase
        .from('subscriptions')
        .select('*')
        .in('profile_id', [profile?.id])
        .eq('status', 'active')

      profile.has_subscription = subs.length > 0
      profile.subscription_type = subs[0]?.plan
      setProfile(profile)
    }

    loadChildrenAndSubscriptions()
  }, [profile])

  useEffect(() => {
    if (!profile?.id) return;
    async function loadSkills() {
      const { data: skills, error: skillsErr } = await supabase
        .from('swimmer_stats')
        .select('*')
        .eq('profile_id', profile?.id)
      setSkills(skills)
    }
    loadSkills()
  }, [profile])

  useEffect(() => {
    if (!profile?.id) return;
    async function loadBadges() {
      const { data: badges, error: badgesErr } = await supabase
        .from('badges')
        .select('*')
        .eq('profile_id', profile?.id)
      setBadges(badges)
    }
    loadBadges()
  }, [profile])

  const skillsNeeded = ["Butterfly", "Breaststroke", "Backstroke", "Freestyle", "Diving"]
  const filteredSkills = skills?.filter((skill) => skillsNeeded.includes(skill?.category))
  const earnedBadges = badges?.filter((badge) => badge?.is_earned === true)
  const goalBadges = badges?.filter((badge) => badge?.is_earned === false)
  useEffect(() => {
    if (!profile?.id) return;
    if (!profile?.has_subscription) return;
    async function loadInstructor() {
      const { data: instructor, error: instructorErr } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('profile_id', profile?.id)
        .single()
      if (instructorErr) {
        setInstructor(null)
        return
      }
      const { data: instructorData, error: instructorDataErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', instructor?.instructor)
        .single()
      setInstructor(instructorData)
    }
    loadInstructor()
  }, [profile])


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Subscription Alert */}
        <SubscriptionAlert selectedChild2={profile} />

        {/* Profile Header Card */}
        <ProfileHeaderCard selectedChild2={profile} skills={skills} filteredSkills={filteredSkills} levels={levels} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Class Info */}
            <CurrentClassInfo selectedChild2={profile} skills={skills} levels={levels} instructor={instructor} />

            {/* Skills Progress */}
            <SkillsProgress selectedChild2={profile} filteredSkills={filteredSkills} />

            {/* Achievements */}
            <Achievements selectedChild2={profile} earnedBadges={earnedBadges} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <QuickStats selectedChild2={profile} earnedBadges={earnedBadges} skills={skills} filteredSkills={filteredSkills} />

            {/* Upcoming Goals */}
            <UpcomingGoals selectedChild2={profile} goalBadges={goalBadges} />

            {/* Action Buttons */}
            <div className="space-y-3">
              {profile?.has_subscription ? (
                <>
                  <Button onClick={() => navigate(`/timetable`)} className="w-full bg-blue-600 text-white hover:bg-blue-700" size="lg">
                    View Class Schedule
                  </Button>
                  <Button variant="outline" className="w-full bg-white border-blue-200 text-blue-600 hover:bg-blue-50" size="lg">
                    Contact Instructor
                  </Button>
                </>
              ) : (
                <>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white shadow-md" size="lg">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Get Full Access
                  </Button>
                  <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-500" size="lg" disabled>
                    <Lock className="w-4 h-4 mr-2" />
                    View Class Schedule
                  </Button>
                  <Button variant="outline" className="w-full bg-white border-gray-300 text-gray-500" size="lg" disabled>
                    <Lock className="w-4 h-4 mr-2" />
                    Contact Instructor
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
