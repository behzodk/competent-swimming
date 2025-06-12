import React from 'react'
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const AccordionForSupport = ({ helpOpen, setHelpOpen, activeTab }) => {
  return (
    <SidebarMenuItem className="mb-1">
      <SidebarMenuButton
        onClick={() => setHelpOpen(o => !o)}
        className={helpOpen ? 'bg-indigo-100 text-indigo-800 font-semibold' : ''}
      >
        <HelpCircle className="w-5 h-5 mr-3" />
        <span>Help & Support</span>
        <svg
          className={`w-4 h-4 ml-auto transform transition-transform ${helpOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </SidebarMenuButton>

      {helpOpen && (
        <div className="ml-8 mt-1 space-y-1">
          <SidebarMenuItem>
            <Link to="/support">
              <SidebarMenuButton isActive={activeTab === 'support'}>
                General
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/support/contact">
              <SidebarMenuButton isActive={activeTab === 'support-contact'}>
                Contact
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/support/faq">
              <SidebarMenuButton isActive={activeTab === 'support-faq'}>
                FAQ
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/support/holidays">
              <SidebarMenuButton isActive={activeTab === 'support-holidays'}>
                Holidays &amp; Closures
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/support/legal">
              <SidebarMenuButton isActive={activeTab === 'support-legal'}>
                Legal &amp; Documents
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </div>
      )}
    </SidebarMenuItem>
  )
}

export default AccordionForSupport