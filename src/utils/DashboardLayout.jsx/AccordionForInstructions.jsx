import React from 'react'
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const AccordionForInstructions = ({ instructionsOpen, setInstructionsOpen, activeTab }) => {
  return (
    <SidebarMenuItem className="mb-1">
      <SidebarMenuButton
        onClick={() => setInstructionsOpen(o => !o)}
        className={instructionsOpen ? 'bg-indigo-100 text-indigo-800 font-semibold' : ''}
      >
        <HelpCircle className="w-5 h-5 mr-3" />
        <span>Instructions</span>
        <svg
          className={`w-4 h-4 ml-auto transform transition-transform ${instructionsOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </SidebarMenuButton>

      {instructionsOpen && (
        <div className="ml-8 mt-1 space-y-1">
          <SidebarMenuItem>
            <Link to="/instructions/video-tutorials">
              <SidebarMenuButton isActive={activeTab === 'support'}>
                Video Tutorials
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/instructions/reading-materials">
              <SidebarMenuButton isActive={activeTab === 'support-contact'}>
                Reading Materials
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/instructions/level-guides">
              <SidebarMenuButton isActive={activeTab === 'instructions-level-guides'}>
                Level Guides
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/instructions/faq">
              <SidebarMenuButton isActive={activeTab === 'instructions-faq'}>
                FAQ
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link to="/instructions/additional-resources">
              <SidebarMenuButton isActive={activeTab === 'support-legal'}>
                Additional Resources
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </div>
      )}
    </SidebarMenuItem>
  )
}

export default AccordionForInstructions