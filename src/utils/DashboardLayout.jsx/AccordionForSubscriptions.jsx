import React from 'react'
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

const AccordionForSubscriptions = ({manageOpen, setManageOpen, activeTab}) => {
  return (
    <div>
        <SidebarMenuItem className="mb-1">
            <SidebarMenuButton
                onClick={() => setManageOpen(o => !o)}
                className={`${manageOpen ? 'bg-indigo-100 text-indigo-800 font-semibold' : ''}`}
            >
                <BookOpen className="w-5 h-5 mr-3" />
                <span>Billing & Payments</span>
                <svg
                className={`w-4 h-4 ml-auto transform transition-transform ${
                    manageOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 9l-7 7-7-7" />
                </svg>
            </SidebarMenuButton>
            {manageOpen && (
                <div className="ml-8 mt-1 space-y-1">
                <SidebarMenuItem>
                    <Link to="/subscriptions">
                    <SidebarMenuButton isActive={activeTab === 'subscriptions'}>
                        Subscriptions
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link to="/bookings">
                    <SidebarMenuButton isActive={activeTab === 'bookings'}>
                        My Bookings
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <Link to="/book">
                    <SidebarMenuButton isActive={activeTab === 'book'}>
                        Book a Class
                    </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                </div>
            )}
        </SidebarMenuItem>
    </div>
  )
}

export default AccordionForSubscriptions