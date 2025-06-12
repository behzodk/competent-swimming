import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Medal, TrendingUp, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "lucide-react"
import { rarityColors, categoryColors } from './utils'


const BadgesContainer = ({ categoryColors, realFilteredBadges, inProgressBadges }) => {
  const randomRarityColor = (val) => {
    if (val === 'rarity') {
      const rarityColorsVals = Object.values(rarityColors)
      return rarityColorsVals[Math.floor(Math.random() * rarityColorsVals.length)]
    } else if (val === 'category') {
      const categoryColorsVals = Object.values(categoryColors)
      return categoryColorsVals[Math.floor(Math.random() * categoryColorsVals.length)]
    }
}

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
        <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
                <Medal className="w-6 h-6 text-yellow-600" />
                Earned Badges ({realFilteredBadges.length})
            </CardTitle>
            </CardHeader>
            <CardContent>
            {realFilteredBadges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {realFilteredBadges.map((badge) => (
                    <Card
                        key={badge.id}
                        className={`border-2 transition-all hover:shadow-md ${randomRarityColor('rarity')}`}
                    >
                    <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                        <div
                            className={`w-12 h-12 rounded-full ${randomRarityColor('category')} flex items-center justify-center text-white text-xl flex-shrink-0`}
                        >
                            {badge.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900 text-sm leading-tight">{badge.title}</h4>
                            <Badge className={`text-xs ${randomRarityColor('category')} border`}>
                                {badge.type}
                            </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mb-2 leading-relaxed">{badge.description}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{new Date(badge.date_earned_or_estimated).toLocaleDateString()}</span>
                            <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500" />
                                <span className="font-medium">{badge.points} pts</span>
                            </div>
                            </div>
                        </div>
                        </div>
                    </CardContent>
                    </Card>
                ))}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500">
                <Medal className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No badges in this category yet</p>
                <p className="text-sm">Keep swimming to earn more achievements!</p>
                </div>
            )}
            </CardContent>
        </Card>
        </div>

        <div>
        <Card className="border-0 shadow-lg mb-6 bg-white">
            <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                In Progress
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            {inProgressBadges.map((badge, index) => (
                <div key={index} className={`p-4 ${randomRarityColor('rarity')} rounded-lg border border-gray-200`}>
                <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${randomRarityColor('category')} rounded-full flex items-center justify-center text-lg`}>
                    {badge.emoji}
                    </div>
                    <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{badge.title}</h4>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-600">
                    <span>Progress</span>
                    <span>{badge.progress}%</span>
                    </div>
                    <Progress value={badge.progress} className="h-2" />
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>Est. {new Date(badge.date_earned_or_estimated).toLocaleDateString()}</span>
                    </div>
                </div>
                </div>
            ))}
            </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
                <Clock className="w-6 h-6 text-green-600" />
                Recent Activity
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
            {realFilteredBadges
                .sort((a, b) => new Date(b.date_earned_or_estimated).getTime() - new Date(a.date_earned_or_estimated).getTime())
                .slice(0, 3)
                .map((badge) => (
                <div
                    key={badge.id}
                    className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                >
                    <div
                    className={`w-8 h-8 rounded-full ${badge.color} flex items-center justify-center text-white text-sm`}
                    >
                    {badge.emoji}
                    </div>
                    <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{badge.title}</p>
                    <p className="text-xs text-gray-600">{new Date(badge.date_earned_or_estimated).toLocaleDateString()}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">New</Badge>
                </div>
                ))}
            </CardContent>
        </Card>
        </div>
    </div>
  )
}

export default BadgesContainer