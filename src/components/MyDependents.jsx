import { useState, useEffect } from "react"
import {
  Trophy,
  Award,
  CreditCard,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProfile } from "@/contexts/ProfileContext"
import { supabase } from "../lib/supabaseClient"
import { useNavigate } from "react-router-dom"
import { SubscriptionAlert } from "@/utils/ProfileView/SubscriptionAlert"
import { HeaderWithChildSelector } from "@/utils/ProfileView/HeaderWithChildSelector"
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

export default function ChildProfilePage() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const [badges, setBadges] = useState([])
  const [children2, setChildren2] = useState([])
  const [skills, setSkills] = useState([])
  const [selectedChildId2, setSelectedChildId2] = useState(children2?.length > 0 ? children2[0].id : null)
  const [instructor, setInstructor] = useState(null)
  useEffect(() => {
    if (children2.length > 0 && !selectedChildId2) {
      setSelectedChildId2(children2[0].id)
    }
  }, [children2, selectedChildId2])
  const [isAddChildDialogOpen, setIsAddChildDialogOpen] = useState(false)
  const [newChildForm, setNewChildForm] = useState({
    name: "",
    age: "",
    medicalNotes: "",
    emergencyContact: "",
    skillLevel: "beginner",
  })

  useEffect(() => {
    if (!profile?.id) return;

    async function loadChildrenAndSubscriptions() {
      const { data: kids, error: kidsErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('parent', profile.id)

      if (kidsErr) {
        setChildren2([])
        return
      }

      const childIds = kids.map((c) => c.id)

      const { data: subs, error: subsErr } = await supabase
        .from('subscriptions')
        .select('*')
        .in('profile_id', childIds)
        .eq('status', 'active')

      if (subsErr) {
        // we can still show children, all marked false
        setChildren2(
          kids.map((c) => ({ ...c, has_subscription: false, subscription_type: null }))
        )
        return
      }

      // 3) build a lookup set
      const activeSet = new Set(subs.map((s) => s.profile_id))

      // 4) annotate each child
      const annotated = kids.map((c) => ({
        ...c,
        has_subscription: activeSet.has(c.id),
        subscription_type: subs.find((s) => s.profile_id === c.id)?.plan
      }))

      setChildren2(annotated)
    }

    loadChildrenAndSubscriptions()
  }, [profile])

  const selectedChild2 = children2?.find((child) => child.id === selectedChildId2) || children2?.[0]
  // const selectedChild = children.find((child) => child.id === selectedChildId) || children[0]

  useEffect(() => {
    if (!selectedChild2?.id) return;
    async function loadSkills() {
      const { data: skills, error: skillsErr } = await supabase
        .from('swimmer_stats')
        .select('*')
        .eq('profile_id', selectedChild2?.id)
      setSkills(skills)
    }
    loadSkills()
  }, [selectedChild2])

  useEffect(() => {
    if (!selectedChild2?.id) return;
    async function loadBadges() {
      const { data: badges, error: badgesErr } = await supabase
        .from('badges')
        .select('*')
        .eq('profile_id', selectedChild2?.id)
      setBadges(badges)
    }
    loadBadges()
  }, [selectedChild2])

  const skillsNeeded = ["Butterfly", "Breaststroke", "Backstroke", "Freestyle", "Diving"]
  const filteredSkills = skills?.filter((skill) => skillsNeeded.includes(skill?.category))
  const earnedBadges = badges?.filter((badge) => badge?.is_earned === true)
  const goalBadges = badges?.filter((badge) => badge?.is_earned === false)
  useEffect(() => {
    if (!selectedChild2?.id) return;
    if (!selectedChild2?.has_subscription) return;
    async function loadInstructor() {
      const { data: instructor, error: instructorErr } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('profile_id', selectedChild2?.id)
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
  }, [selectedChild2])

  const handleAddChild = () => {
    navigate('/profile/add')
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with Child Selector and Add Child Button */}
        <HeaderWithChildSelector
          children2={children2}
          selectedChildId2={selectedChildId2}
          setSelectedChildId2={setSelectedChildId2}
          isAddChildDialogOpen={isAddChildDialogOpen}
          setIsAddChildDialogOpen={setIsAddChildDialogOpen}
          newChildForm={newChildForm}
          setNewChildForm={setNewChildForm}
          handleAddChild={handleAddChild}
        />

        {/* Subscription Alert */}
        <SubscriptionAlert selectedChild2={selectedChild2} />

        {/* Profile Header Card */}
        <ProfileHeaderCard selectedChild2={selectedChild2} skills={skills} filteredSkills={filteredSkills} levels={levels} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Class Info */}
            <CurrentClassInfo selectedChild2={selectedChild2} skills={skills} levels={levels} instructor={instructor} />

            {/* Skills Progress */}
            <SkillsProgress selectedChild2={selectedChild2} filteredSkills={filteredSkills} />

            {/* Achievements */}
            <Achievements selectedChild2={selectedChild2} earnedBadges={earnedBadges} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <QuickStats selectedChild2={selectedChild2} earnedBadges={earnedBadges} skills={skills} filteredSkills={filteredSkills} />

            {/* Upcoming Goals */}
            <UpcomingGoals selectedChild2={selectedChild2} goalBadges={goalBadges} />

            {/* Action Buttons */}
            <div className="space-y-3">
              {selectedChild2?.has_subscription ? (
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
