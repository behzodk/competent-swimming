// src/components/DashboardLayout.jsx

import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { allNavItems } from '../utils/DashboardLayout.jsx/utils';
import HtmlSidebar from '../utils/DashboardLayout.jsx/HtmlSidebar';
import { useProfile } from '@/contexts/profileContext';

export default function DashboardLayout({ session }) {
  const location = useLocation();
  const { profile, activeProfileId } = useProfile();
  const [unreadCount, setUnreadCount] = useState(0);

  // Accordions open state
  const [helpOpen, setHelpOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [extraOpen, setExtraOpen] = useState(false);

  // Active top-level tab
  const pathParts = location.pathname.split('/');
  const activeTab = pathParts[1] || 'home';


  const [profileOptions, setProfileOptions] = useState([]);

  useEffect(() => {
    if (!profile?.id) return;
  
    async function loadProfileOptions() {
      // 2a) Your own profile, marked "(You)"
      const parentOption = {
        id: profile?.id,
        label: `${profile?.first_name} ${profile?.last_name} (You)`,
      };
  
      // 2b) Fetch any dependents
      const { data: dependents, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name')
        .eq('parent', profile.id)
        .order('first_name', { ascending: true });
  
      if (error) {
        setProfileOptions([parentOption]);
        return;
      }
  
      // 2c) Map each child into an option
      const childOptions = (dependents || []).map((d) => ({
        id: d.id,
        label: `${d.first_name} ${d.last_name}`,
      }));
  
      setProfileOptions([parentOption, ...childOptions]);
    }
  
    loadProfileOptions();

  }, [profile]);

  const handleProfileChange = (id) => {
    setActiveProfileId(id);
  };

  // Unread notifications
  useEffect(() => {
    if (!profile?.id) return;
    const fetchCount = async () => {
      const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', profile?.id)
        .eq('read', false);
      setUnreadCount(count || 0);
    };
    fetchCount();
  }, [profile]);

  // Role-based filter

  const role = profile?.is_admin
  ? 'admin'
  : profile?.is_teacher
    ? 'teacher'
    : profile?.parent
      ? 'child'
      : 'parent';
    const roleTabs = {
      admin: ['home','slots','timetable','book','bookings','notifications','dependents','students','support','subscriptions','badges','feedbacks','instructions'],
      teacher: ['home','slots','timetable','notifications','students','instructions'],
      parent: ['home','book','bookings','notifications','dependents','support','subscriptions','badges','feedbacks','instructions', 'timetable'],
      child:  ['home','book','bookings','notifications','support','subscriptions','badges','feedbacks','instructions', 'timetable'],
    };
    
    // then filter your master list:
  const navItems = allNavItems.filter(item =>
    roleTabs[role].includes(item.id)
  );
  
  return (
    <HtmlSidebar
      navItems={navItems}
      activeTab={activeTab}
      unreadCount={unreadCount}
      profile={profile}
      session={session}
      profileOptions={profileOptions}
      activeProfileId={activeProfileId}
      handleProfileChange={handleProfileChange}
      manageOpen={manageOpen}
      setManageOpen={setManageOpen}
      extraOpen={extraOpen}
      setExtraOpen={setExtraOpen}
      helpOpen={helpOpen}
      setHelpOpen={setHelpOpen}
      instructionsOpen={instructionsOpen}
      setInstructionsOpen={setInstructionsOpen}
    />
  );
}
