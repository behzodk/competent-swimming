import React from 'react'
import { SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from '@/components/ui/sidebar'
import { CalendarDays, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { allNavItems } from './utils'

export const Header = () => {
  return (
    <div>
        <SidebarHeader className="px-6 py-4 border-b">
            <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => navigate('/')}>
                <CalendarDays className="w-6 h-6 text-indigo-600" />
                <span className="ml-3 font-bold text-lg text-indigo-600">Competent Swimming</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    </div>
  )
}


export const Header2 = ({unreadCount}) => {

    const location = useLocation();
    const activeTab = location.pathname.split('/')[1];
    const navItems = allNavItems;

  return (
    <div>
        <header className="flex items-center h-16 px-4 border-b">
          <SidebarTrigger className="-ml-1"/>
          <h2 className="ml-4 font-semibold">
            {(() => {
              if (['subscriptions','bookings','book'].includes(activeTab)) return 'Manage';
              if (activeTab === 'support') return 'Support';
              const found = navItems.find(i => i.id === activeTab);
              return found?.title || 'Dashboard';
            })()}
          </h2>
          <div className="ml-auto flex items-center gap-4">
            <Link to="/notifications" className="relative inline-flex">
              <Bell className="h-6 w-6 text-gray-600"/>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
          </div>
        </header>
    </div>
  )
}

