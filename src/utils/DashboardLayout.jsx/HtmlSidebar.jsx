import React from 'react'
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from '@/components/ui/sidebar'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge';
import { Header } from './Header'
import AccordionForSubscriptions from './AccordionForSubscriptions'
import AccordionForSupport from './AccordionForSupport'
import Footer from './Footer'
import { Header2 } from './Header'
import { Outlet } from 'react-router-dom'
import { ChartBar } from 'lucide-react'
import AccordionForInstructions from './AccordionForInstructions';

const HtmlSidebar = ({ navItems, activeTab, unreadCount, profile, session, profileOptions, activeProfileId, handleProfileChange, manageOpen, setManageOpen, extraOpen, setExtraOpen, helpOpen, setHelpOpen, instructionsOpen, setInstructionsOpen }) => {
  return (
    <SidebarProvider>
        <Sidebar className="bg-white border-r shadow-sm z-30">
        <Header />

        {/* Content */}
        <SidebarContent className="flex-1 py-4 px-3">
            <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                {navItems.map(item => (
                    <SidebarMenuItem key={item.id} className="mb-1">
                    <Link to={item.to}>
                        <SidebarMenuButton isActive={activeTab === item.id}>
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.title}</span>
                        {item.id === 'notifications' && unreadCount > 0 && (
                            <Badge className="ml-auto bg-red-500 text-white">
                            {unreadCount}
                            </Badge>
                        )}
                        </SidebarMenuButton>
                    </Link>
                    </SidebarMenuItem>
                ))}

                {/* Manage Accordion (hidden for teachers) */}
                {!profile?.is_teacher && (
                    <AccordionForSubscriptions
                    manageOpen={manageOpen}
                    setManageOpen={setManageOpen}
                    activeTab={activeTab}
                    />
                )}

                {/* Extras Accordion (hidden for teachers) */}
                {!profile?.is_teacher && (
                    <SidebarMenuItem className="mb-1">
                    <SidebarMenuButton
                        onClick={() => setExtraOpen(o => !o)}
                        className={extraOpen ? 'bg-indigo-100 text-indigo-800 font-semibold' : ''}
                    >
                        <ChartBar className="w-5 h-5 mr-3" />
                        <span>Progress</span>
                        <svg
                        className={`w-4 h-4 ml-auto transform transition-transform ${extraOpen ? 'rotate-180' : 'rotate-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </SidebarMenuButton>
                    {extraOpen && (
                        <div className="ml-8 mt-1 space-y-1">
                        <SidebarMenuItem>
                            <Link to="/badges">
                            <SidebarMenuButton isActive={activeTab === 'badges'}>
                                Badges
                            </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link to="/feedbacks">
                            <SidebarMenuButton isActive={activeTab === 'feedbacks'}>
                                Feedbacks
                            </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        </div>
                    )}
                    </SidebarMenuItem>
                )}

                {/* Help & Support Accordion (hidden for teachers) */}
                {!profile?.is_teacher && (
                    <AccordionForSupport
                    helpOpen={helpOpen}
                    setHelpOpen={setHelpOpen}
                    activeTab={activeTab}
                    />
                )}

                {/* Instructions Accordion (hidden for teachers) */}
                {!profile?.is_teacher && (
                    <AccordionForInstructions
                    instructionsOpen={instructionsOpen}
                    setInstructionsOpen={setInstructionsOpen}
                    activeTab={activeTab}
                    />
                )}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <Footer profile={profile} session={session} profileOptions={profileOptions} activeProfileId={activeProfileId} onProfileChange={handleProfileChange} />
        </Sidebar>

        {/* Main area */}
        <SidebarInset>
        <Header2 unreadCount={unreadCount} />
        <main className="p-6 flex-1 overflow-auto">
            <Outlet />
        </main>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default HtmlSidebar