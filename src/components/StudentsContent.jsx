// src/components/StudentsContent.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function StudentsContent({ session }) {
  const navigate = useNavigate();
  const userId = session?.user?.id;

  const [isTeacher, setIsTeacher] = useState(null); // null = still checking
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [searchText, setSearchText] = useState('');

  // 1) Check current user’s role (is_teacher)
  useEffect(() => {
    async function checkRole() {
      if (!userId) {
        // not logged in → redirect to home
        navigate('/', { replace: true });
        return;
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('is_teacher')
        .eq('user_id', userId)    // ← use “user_id” rather than “id”
        .single();

      if (error || !data) {
        // if something went wrong or no profile row, assume no access
        navigate('/', { replace: true });
        return;
      }

      if (!data.is_teacher) {
        // not a teacher → redirect
        navigate('/', { replace: true });
        return;
      }

      // user is a teacher → allow rendering
      setIsTeacher(true);
    }

    checkRole();
  }, [userId, navigate]);

  // 2) Once role confirmed, fetch students
  useEffect(() => {
    if (isTeacher !== true) {
      return;
    }

    async function loadStudents() {
      setLoadingStudents(true);

      // Query the “profiles_with_email” VIEW, which already joins to auth.users
      const { data, error } = await supabase
        .from('profiles_with_email')
        .select(`
          id,
          first_name,
          last_name,
          location,
          date_of_birth,
          email
        `)
        .eq('is_teacher', false)
        .order('first_name', { ascending: true });

      if (error) {
        setStudents([]);
      } else {
        setStudents(data ?? []);
      }

      setLoadingStudents(false);
    }

    loadStudents();
  }, [isTeacher]);

  // 3) Filtered list based on searchText
  const filtered = students.filter((s) => {
    const name = `${s.first_name} ${s.last_name}`.toLowerCase();
    const location = (s.location ?? '').toLowerCase();
    const email = (s.email ?? '').toLowerCase();

    return (
      name.includes(searchText.toLowerCase()) ||
      location.includes(searchText.toLowerCase()) ||
      email.includes(searchText.toLowerCase())
    );
  });

  // 4) While checking role, render nothing (or a loader)
  if (isTeacher === null) {
    return <div className="text-gray-500">Checking permissions…</div>;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Students</h1>
        <p className="text-gray-600">Below is a list of all student accounts.</p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md">
        <Input
          type="text"
          placeholder="Search by name, email, or location…"
          className="w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Table */}
      {loadingStudents ? (
        <div className="text-gray-500">Loading students…</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-800">
            <thead>
              <tr>
                <th className="border-b px-4 py-2 bg-gray-100 font-medium text-gray-700">
                  Name
                </th>
                <th className="border-b px-4 py-2 bg-gray-100 font-medium text-gray-700">
                  Email
                </th>
                <th className="border-b px-4 py-2 bg-gray-100 font-medium text-gray-700">
                  Location
                </th>
                <th className="border-b px-4 py-2 bg-gray-100 font-medium text-gray-700">
                  Date of Birth
                </th>
                <th className="border-b px-4 py-2 bg-gray-100 font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-600">
                    No matching students found.
                  </td>
                </tr>
              ) : (
                filtered.map((stu) => (
                  <tr key={stu.id} className="hover:bg-gray-50">
                    <td className="border-b px-4 py-3">
                      {stu.first_name} {stu.last_name}
                    </td>
                    <td className="border-b px-4 py-3">{stu.email ?? '—'}</td>
                    <td className="border-b px-4 py-3">{stu.location ?? '—'}</td>
                    <td className="border-b px-4 py-3">
                      {stu.date_of_birth
                        ? new Date(stu.date_of_birth).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="border-b px-4 py-3">
                      <Link to={`/students/${stu.id}`}>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}