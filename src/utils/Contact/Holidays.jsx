import { Calendar, AlertTriangle, Clock, Info } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { termDates, scheduledClosures, bankHolidays } from "./utils"

export default function HolidaysClosuresPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-center sm:text-4xl md:text-5xl">Holidays & Closures</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Important information about our swimming class schedule, including term dates, planned closures, and holiday
          arrangements.
        </p>
      </div>

      <Tabs defaultValue="term-dates" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="term-dates" className="data-[state=active]:bg-black data-[state=active]:text-white">Term Dates</TabsTrigger>
          <TabsTrigger value="closures" className="data-[state=active]:bg-black data-[state=active]:text-white">Scheduled Closures</TabsTrigger>
          <TabsTrigger value="holidays" className="data-[state=active]:bg-black data-[state=active]:text-white">Bank Holidays</TabsTrigger>
          <TabsTrigger value="weather" className="data-[state=active]:bg-black data-[state=active]:text-white">Weather Disruptions</TabsTrigger>
        </TabsList>

        <TabsContent value="term-dates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-sky-500" />
                Term Dates 2024-2025
              </CardTitle>
              <CardDescription>
                Our swimming classes are organized into terms. Please note these dates for your calendar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                {termDates.map((term) => (
                  <div key={term.name} className="rounded-lg border p-4 transition-all hover:bg-muted/50">
                    <h3 className="font-medium flex items-center gap-2">
                      <span className="inline-block w-3 h-3 rounded-full bg-sky-500"></span>
                      {term.name}
                    </h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Start:</span> {term.startDate}
                      </p>
                      <p>
                        <span className="font-medium">End:</span> {term.endDate}
                      </p>
                      {term.notes && <p className="text-muted-foreground italic mt-2">{term.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="closures" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                Scheduled Closures
              </CardTitle>
              <CardDescription>Planned closures for maintenance, special events, and other purposes.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledClosures.map((closure, index) => (
                  <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                      <Clock className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{closure.date}</p>
                      <p className="text-sm text-muted-foreground">{closure.reason}</p>
                      {closure.additionalInfo && <p className="text-sm mt-2">{closure.additionalInfo}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="holidays" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-indigo-500" />
                Bank Holidays
              </CardTitle>
              <CardDescription>
                Information about classes during bank holidays and other public holidays.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <Info className="h-4 w-4" />
                <AlertTitle>Bank Holiday Policy</AlertTitle>
                <AlertDescription>
                  We are closed on all bank holidays unless specifically noted below. Make-up classes will be scheduled
                  for affected students.
                </AlertDescription>
              </Alert>

              <Accordion type="single" collapsible className="w-full">
                {bankHolidays.map((holiday, index) => (
                  <AccordionItem key={index} value={`holiday-${index}`}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-2">
                        <span>{holiday.name}</span>
                        <Badge variant={holiday.classesAffected ? "destructive" : "outline"} className={holiday.classesAffected ? "bg-red-600 hover:bg-red-700" : ""}>
                          {holiday.classesAffected ? "Classes Cancelled" : "Classes Running"}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        <p>
                          <span className="font-medium">Date:</span> {holiday.date}
                        </p>
                        <p>{holiday.details}</p>
                        {holiday.makeupInfo && <p className="text-sm text-muted-foreground">{holiday.makeupInfo}</p>}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Weather Disruptions
              </CardTitle>
              <CardDescription>
                Information about potential class cancellations due to weather conditions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Current Weather Alert</AlertTitle>
                <AlertDescription>
                  No current weather disruptions. This section will be updated if conditions change.
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Weather Policy</h3>
                  <p className="text-muted-foreground">
                    In case of severe weather conditions, classes may be cancelled for safety reasons. We will notify
                    all affected students via email and update this page as soon as possible.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Notification Process</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Email notification to all affected students</li>
                    <li>SMS alerts for same-day cancellations</li>
                    <li>Updates on our social media channels</li>
                    <li>Information posted on this page</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Make-up Classes</h3>
                  <p className="text-muted-foreground">
                    If classes are cancelled due to weather conditions, we will schedule make-up classes or provide
                    credit for future sessions. Our team will contact you with available options.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Need More Information?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          If you have any questions about our schedule, closures, or need to reschedule a class, please don't hesitate
          to contact our team.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="tel:+1234567890"
            className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Call Us
          </a>
          <a
            href="mailto:info@swimmingclasses.com"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  )
}