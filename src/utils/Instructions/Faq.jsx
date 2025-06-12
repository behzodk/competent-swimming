import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Filter, HelpCircle } from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'


const faqs = [
    {
      id: "1",
      question: "What should my child bring to their first swimming lesson?",
      answer:
        "Your child should bring a swimsuit, towel, swim cap (optional but recommended), goggles (optional), and flip-flops or pool shoes. We also recommend bringing a water bottle and a small snack for after the lesson. Please ensure all items are labeled with your child's name.",
      category: "Getting Started",
    },
    {
      id: "2",
      question: "How do I know which level is right for my child?",
      answer:
        "If your child is new to our program, we recommend scheduling a skills assessment. Our instructors will evaluate your child's current abilities and recommend the appropriate level. You can book an assessment through the 'Assessments' section of your parent dashboard.",
      category: "Enrollment",
    },
    {
      id: "3",
      question: "What is your make-up class policy?",
      answer:
        "If you need to miss a class, please notify us at least 24 hours in advance through the parent dashboard. You are entitled to two make-up classes per session, which must be scheduled within the same session period. Make-up classes are subject to availability.",
      category: "Policies",
    },
    {
      id: "4",
      question: "How long does it typically take to advance to the next level?",
      answer:
        "Most levels are designed as 8-12 week programs, but advancement depends on individual progress. Some children may need to repeat a level to fully master the required skills. Our instructors provide regular progress updates and will recommend advancement when your child is ready.",
      category: "Progress",
    },
    {
      id: "5",
      question: "Is parent participation required during lessons?",
      answer:
        "Parent participation is required for our Parent & Tot classes (ages 6 months to 3 years). For all other levels, parents are welcome to observe from the designated viewing area but do not participate in the lessons directly.",
      category: "Classes",
    },
    {
      id: "6",
      question: "What safety measures are in place during swimming lessons?",
      answer:
        "All our instructors are certified in water safety and CPR. We maintain strict instructor-to-student ratios (1:3 for beginners, 1:5 for intermediate, 1:8 for advanced). Lifeguards are always on duty during lessons, and we conduct regular safety drills. Our facilities are inspected daily for safety compliance.",
      category: "Safety",
    },
    {
      id: "7",
      question: "How do I track my child's progress?",
      answer:
        "You can track your child's progress through the parent dashboard. Instructors update skill achievements after each class, and you'll receive a comprehensive progress report at the midpoint and end of each session. You can also schedule a brief meeting with your child's instructor if you have specific questions.",
      category: "Progress",
    },
    {
      id: "8",
      question: "What happens if my child is afraid of the water?",
      answer:
        "Fear of water is common and our instructors are trained to work with anxious swimmers. We use a gentle, progressive approach that builds confidence gradually. We never force children into uncomfortable situations. Please inform your instructor about specific concerns so they can tailor their approach accordingly.",
      category: "Classes",
    },
  ]

const Faq = () => {
    const [faqFilter, setFaqFilter] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredFaqs, setFilteredFaqs] = useState(faqs)

    const faqCategories = ["All", "Getting Started", "Enrollment", "Policies", "Progress", "Classes", "Safety"]

  return (
    <div>
        <Card className="border-0 shadow-lg mb-8 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions about our swimming program</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-start gap-3 text-left">
                            <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                              <Badge variant="outline" className="text-xs mt-1">
                                {faq.category}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-8 pr-4 text-gray-700">{faq.answer}</div>
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <HelpCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No FAQs found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </Accordion>
              </CardContent>
        </Card>
    </div>
  )
}

export default Faq