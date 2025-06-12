import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send, User } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const InstructorForm = ({teacherList, loadingTeachers, handleInstructorSubmit, instructorContactForm, setInstructorContactForm}) => {
  return (
    <div>
        <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
          <CardHeader className="flex flex-row items-center space-x-3 pb-2">
            <User className="h-6 w-6 text-purple-600" />
            <CardTitle className="text-lg font-semibold text-purple-900">
              Contact Your Instructor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-700 mb-4">
              Send a direct message to one of our instructors.
            </CardDescription>

            {loadingTeachers ? (
              <p className="text-gray-500">Loading instructors…</p>
            ) : (
              <form onSubmit={handleInstructorSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instructor-select">Select Instructor</Label>
                  <Select
                    value={instructorContactForm.instructor}
                    onValueChange={(value) =>
                      setInstructorContactForm({
                        ...instructorContactForm,
                        instructor: value,
                      })
                    }
                    required
                  >
                    <SelectTrigger
                      id="instructor-select"
                      className="w-full bg-white"
                    >
                      <SelectValue placeholder="Choose an instructor" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {teacherList.length === 0 ? (
                        <SelectItem value="" disabled>
                          No instructors available
                        </SelectItem>
                      ) : (
                        teacherList.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor-subject">Subject</Label>
                  <Input
                    id="instructor-subject"
                    value={instructorContactForm.subject}
                    onChange={(e) =>
                      setInstructorContactForm({
                        ...instructorContactForm,
                        subject: e.target.value,
                      })
                    }
                    placeholder="e.g., Class inquiry, personal training"
                    className="bg-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor-message">Message</Label>
                  <Textarea
                    id="instructor-message"
                    value={instructorContactForm.message}
                    onChange={(e) =>
                      setInstructorContactForm({
                        ...instructorContactForm,
                        message: e.target.value,
                      })
                    }
                    placeholder="Your detailed message here..."
                    className="bg-white min-h-[100px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
    </div>
  )
}

export default InstructorForm