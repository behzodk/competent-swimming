import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Send, Mail } from 'lucide-react'

const GeneralForm = ({handleGeneralSubmit, generalContactForm, setGeneralContactForm}) => {
  return (
    <div>
        <Card className="border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg">
            <CardHeader className="flex flex-row items-center space-x-3 pb-2">
                <Mail className="h-6 w-6 text-emerald-600" />
                <CardTitle className="text-lg font-semibold text-emerald-900">
                Contact Competent Swimming
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-gray-700 mb-4">
                Get in touch with our general support team.
                </CardDescription>
                <form onSubmit={handleGeneralSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="general-name">Your Name</Label>
                    <Input
                    id="general-name"
                    value={generalContactForm.name}
                    onChange={(e) =>
                        setGeneralContactForm({
                        ...generalContactForm,
                        name: e.target.value,
                        })
                    }
                    placeholder="John Doe"
                    className="bg-white"
                    required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="general-email">Your Email</Label>
                    <Input
                    id="general-email"
                    type="email"
                    value={generalContactForm.email}
                    onChange={(e) =>
                        setGeneralContactForm({
                        ...generalContactForm,
                        email: e.target.value,
                        })
                    }
                    placeholder="you@example.com"
                    className="bg-white"
                    required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="general-subject">Subject</Label>
                    <Input
                    id="general-subject"
                    value={generalContactForm.subject}
                    onChange={(e) =>
                        setGeneralContactForm({
                        ...generalContactForm,
                        subject: e.target.value,
                        })
                    }
                    placeholder="Subject of your message"
                    className="bg-white"
                    required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="general-message">Message</Label>
                    <Textarea
                    id="general-message"
                    value={generalContactForm.message}
                    onChange={(e) =>
                        setGeneralContactForm({
                        ...generalContactForm,
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
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                >
                    <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default GeneralForm