import { Home, Clock, CalendarDays, Mail, Users } from 'lucide-react';

export const allNavItems = [
    { title: 'Home', icon: Home, id: 'home', to: '/' },
    { title: 'Slots', icon: Clock, id: 'slots', to: '/slots' },
    { title: 'My Timetable', icon: CalendarDays, id: 'timetable', to: '/timetable' },
    { title: 'Inbox', icon: Mail, id: 'notifications', to: '/notifications' },
    { title: 'My Children', icon: Users, id: 'dependents', to: '/dependents' },
    { title: 'Students', icon: Users, id: 'students', to: '/students' },
];