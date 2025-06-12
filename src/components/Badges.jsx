import { useState, useEffect } from "react"
import { Trophy, Star, Target, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { profilesData } from "@/utils/Badges/ProfileData"
import BadgesContainer from "@/utils/Badges/BadgesContainer"
import { LockedContent } from "@/utils/Badges/LockedContent"
import { SubscriptionAlert } from "@/utils/Badges/SubscriptionAlert"
import { NoSubscriptionHeader } from "@/utils/Badges/NoSubscriptionHeader"
import { categoryColors, rarityColors } from "@/utils/Badges/utils"
import { useProfile } from "@/contexts/profileContext"
import { supabase } from "@/lib/supabaseClient"
import { useNavigate } from "react-router-dom"
import Loader from "./Loader"





export default function BadgesAchievementsPage() {
  const [selectedChildId, setSelectedChildId] = useState(profilesData[0].id)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(false)
  const [badges, setBadges] = useState([])
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null)

  const selectedChild = profilesData.find((child) => child.id === selectedChildId) || profilesData[0]
  const { activeProfileId } = useProfile();

  useEffect(() => {
    async function loadBadges() {
      if (!activeProfileId) {
        navigate('/login');
        return;
      };
      setLoading(true);
      const { data: badges, error: badgesError } = await supabase
        .from('badges')
        .select('*')
        .eq('profile_id', activeProfileId);
      if (badgesError && badgesError.code !== 'PGRST116') return;
      setBadges(badges || []);
      setLoading(false);
    }
    loadBadges();
  }, [activeProfileId]);

  useEffect(() => {
    async function loadSubscription() {
      setLoading(true);
      const { data: subscription, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('profile_id', activeProfileId)
        .eq('status', 'active')
        .single();
      if (subscriptionError && subscriptionError.code !== 'PGRST116') return;
      setSubscription(subscription);
      setLoading(false);
    }
    loadSubscription();
  }, [activeProfileId]);

  const totalPoints = badges.reduce((acc, badge) => acc + badge.points, 0)
  const totalEarnedBadges = badges.filter((badge) => badge.is_earned === true).length
  const notEarnedBadges = badges.filter((badge) => badge.is_earned === false).length



  const categories = ["All", "Milestone", "Skill", "Attendance", "Safety", "Social", "Achievement"]
  const realFilteredBadges =
  selectedCategory === "All"
    ? badges.filter((badge) => badge.is_earned === true)
    : badges.filter((badge) => badge.type === selectedCategory.toLowerCase() && badge.is_earned === true)

  const inProgressBadges = badges.filter((badge) => badge.is_earned === false)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Loader />
        </div>
      </div>
    )
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
        <NoSubscriptionHeader selectedChildId={selectedChildId} setSelectedChildId={setSelectedChildId} />

          <SubscriptionAlert selectedChild={selectedChild} />
          <LockedContent />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Badges & Achievements</h1>
              <p className="text-gray-600">Celebrate your child's swimming journey and milestones</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">{totalEarnedBadges}</div>
              <p className="text-blue-100 text-sm">Total Badges</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">{totalPoints}</div>
              <p className="text-yellow-100 text-sm">Total Points</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">{selectedChild.currentStreak}</div>
              <p className="text-green-100 text-sm">Day Streak</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold mb-1">{notEarnedBadges}</div>
              <p className="text-purple-100 text-sm">In Progress</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-blue-200 text-blue-600 hover:bg-blue-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <BadgesContainer
          realFilteredBadges={realFilteredBadges}
          selectedChild={selectedChild}
          categoryColors={categoryColors}
          rarityColors={rarityColors}
          badges={badges}
          inProgressBadges={inProgressBadges}
        />
      </div>
    </div>
  )
}
