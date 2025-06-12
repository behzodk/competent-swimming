import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const helpFaqs = [
  {
    question: "How do I book a lesson?",
    answer:
      "Navigate to “Book a Class” in the sidebar, choose an available slot, and follow the prompts to complete payment.",
  },
  {
    question: "Can I reschedule or cancel my booking?",
    answer:
      "Yes—go to “My Bookings,” click on the booking you want to change, and either reschedule (if more than 10 hours remain) or cancel. Refunds follow our cancellation policy.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards (Visa, MasterCard, American Express) as well as Apple Pay and Google Pay.",
  },
  {
    question: "How do I become an instructor?",
    answer:
      "If you’re interested in teaching, go to the “Students” tab (visible if you’re flagged as a teacher) and complete the instructor onboarding form. Our team will review and notify you once approved.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Click “Help & Support” → “Contact” in the sidebar—fill out the form under “Contact Competent Swimming” to send us a message.",
  },
  {
    question: "Where can I find my lesson history?",
    answer:
      "Under “My Bookings” you’ll see past, upcoming, and canceled lessons. Click any entry to view details or receipts.",
  },
];

function FAQItem({ question, answer }) {
  return (
    <details className="group bg-white rounded-lg border border-gray-200 p-4 shadow-sm overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer text-gray-800 hover:text-indigo-600 transition-colors py-1">
        <span className="font-medium text-base">{question}</span>
        <ChevronDown className="w-5 h-5 text-gray-500 group-open:hidden transform transition-transform duration-200" />
        <ChevronUp className="w-5 h-5 text-indigo-600 hidden group-open:block transform transition-transform duration-200" />
      </summary>
      <p className="mt-3 text-gray-600 leading-relaxed">{answer}</p>
    </details>
  );
}

export default function FaqPage() {
  return (
    <div className="space-y-6 py-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground mt-1">
          Find answers to the most common questions below.
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-4">
        {helpFaqs.map((faq, idx) => (
          <FAQItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}