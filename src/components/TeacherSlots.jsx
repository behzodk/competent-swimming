// src/components/TeacherSlots.jsx

import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit3 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

export default function TeacherSlots({ session }) {
  const navigate = useNavigate();
  const authUserId = session.user.id; // Auth UID

  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // New-slot form
  const [startTime, setStartTime] = useState('');
  const [price, setPrice] = useState(30); // default price £30
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Delete modal state
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Edit modal state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [editingStartTime, setEditingStartTime] = useState('');
  const [editingPrice, setEditingPrice] = useState(30);
  const [editErrorMessage, setEditErrorMessage] = useState('');

  // 1) Redirect non-teachers to "/"
  useEffect(() => {
    async function checkRole() {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_teacher')
        .eq('user_id', authUserId)
        .single();

      if (error || !data?.is_teacher) {
        navigate('/', { replace: true });
      }
    }
    checkRole();
  }, [authUserId, navigate]);

  // 2) Fetch this teacher's slots, newest-first
  useEffect(() => {
    async function fetchSlots() {
      setLoading(true);
      const { data, error } = await supabase
        .from('slots')
        .select('id, start_time, student_profile_id, price')
        .eq('teacher_id', authUserId)
        .order('start_time', { ascending: false });

      if (!error) {
        setSlots(data);
      }
      setLoading(false);
    }
    fetchSlots();
  }, [authUserId]);

  // Utility: refresh slots list
  async function refreshSlots() {
    const { data, error } = await supabase
      .from('slots')
      .select('id, start_time, student_profile_id, price')
      .eq('teacher_id', authUserId)
      .order('start_time', { ascending: false });
    if (!error) {
      setSlots(data);
    }
  }

  // 3) Create a new slot (with ±1h conflict check and 10h-ahead restriction)
  async function handleCreateSlot(e) {
    e.preventDefault();
    setErrorMessage('');

    if (!startTime) return;
    if (!price || isNaN(price) || price <= 0) {
      setErrorMessage('Please enter a valid price.');
      return;
    }

    const newStartMs = new Date(startTime).getTime();
    if (isNaN(newStartMs)) {
      setErrorMessage('Invalid date/time.');
      return;
    }

    // Prevent slots less than 10 hours ahead
    const tenHoursAhead = Date.now() + 10 * 60 * 60 * 1000;
    if (newStartMs < tenHoursAhead) {
      setErrorMessage('Slots must be scheduled at least 10 hours in advance.');
      return;
    }

    const ONE_HOUR_MS = 60 * 60 * 1000;
    const lowerBound = new Date(newStartMs - ONE_HOUR_MS).toISOString();
    const upperBound = new Date(newStartMs + ONE_HOUR_MS).toISOString();

    const { data: conflict, error: conflictError } = await supabase
      .from('slots')
      .select('id, start_time')
      .eq('teacher_id', authUserId)
      .gte('start_time', lowerBound)
      .lte('start_time', upperBound);

    if (conflictError) {
      setErrorMessage('Could not verify slot availability. Try again.');
      return;
    }
    if (Array.isArray(conflict) && conflict.length > 0) {
      setErrorMessage(
        'You already have a slot within one hour of that time. Pick a different time.'
      );
      return;
    }

    // Convert local "YYYY-MM-DDTHH:mm" into an ISO-Z string
    const isoString = new Date(startTime).toISOString();

    const { error: insertError } = await supabase
      .from('slots')
      .insert([
        {
          teacher_id: authUserId,
          start_time: isoString,
          student_profile_id: null,
          price: price,
        },
      ]);

    if (insertError) {
      if (insertError.code === '23P01') {
        setErrorMessage(
          'That exact time overlaps an existing slot. Pick a time at least one hour apart.'
        );
      } else {
        setErrorMessage('Error creating slot. Please try again.');
      }
    } else {
      setToastMessage('Slot created successfully!');
      setTimeout(() => setToastMessage(''), 3000);
      setStartTime('');
      setPrice(30);
      await refreshSlots();
    }
  }

  // 4) Open delete dialog for a specific slot
  function openDeleteDialog(slotId) {
    setPendingDeleteId(slotId);
    setIsDeleteDialogOpen(true);
  }

  // 5) Confirm deletion once user agrees
  async function confirmDelete() {
    if (!pendingDeleteId) {
      setIsDeleteDialogOpen(false);
      return;
    }
    const { error } = await supabase.from('slots').delete().eq('id', pendingDeleteId);
    if (!error) {
      setSlots((prev) => prev.filter((s) => s.id !== pendingDeleteId));
      setToastMessage('Slot deleted successfully!');
      setTimeout(() => setToastMessage(''), 3000);
    }
    setPendingDeleteId(null);
    setIsDeleteDialogOpen(false);
  }

  // 6) Open edit dialog, prefill with current slot time & price (in user's local zone)
  function openEditDialog(slot) {
    setEditingSlotId(slot.id);
    const date = new Date(slot.start_time);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const dtLocal = `${year}-${month}-${day}T${hours}:${minutes}`;
    setEditingStartTime(dtLocal);
    setEditingPrice(slot.price);
    setEditErrorMessage('');
    setIsEditDialogOpen(true);
  }

  // 7) Confirm edit (update row in Supabase)
  async function confirmEdit() {
    setEditErrorMessage('');
    if (!editingStartTime) {
      setEditErrorMessage('Please pick a valid date/time.');
      return;
    }
    if (!editingPrice || isNaN(editingPrice) || editingPrice <= 0) {
      setEditErrorMessage('Please enter a valid price.');
      return;
    }

    const newStartMs = new Date(editingStartTime).getTime();
    if (isNaN(newStartMs)) {
      setEditErrorMessage('Invalid date/time.');
      return;
    }

    // Prevent editing to less than 10 hours ahead
    const tenHoursAhead = Date.now() + 10 * 60 * 60 * 1000;
    if (newStartMs < tenHoursAhead) {
      setEditErrorMessage('Slots must be scheduled at least 10 hours in advance.');
      return;
    }

    const ONE_HOUR_MS = 60 * 60 * 1000;
    const lowerBound = new Date(newStartMs - ONE_HOUR_MS).toISOString();
    const upperBound = new Date(newStartMs + ONE_HOUR_MS).toISOString();

    // Check ±1h conflict, ignoring the slot being edited
    const { data: conflict, error: conflictError } = await supabase
      .from('slots')
      .select('id, start_time')
      .eq('teacher_id', authUserId)
      .gte('start_time', lowerBound)
      .lte('start_time', upperBound);

    if (conflictError) {
      setEditErrorMessage('Could not verify slot availability. Try again.');
      return;
    }

    // Exclude the current slot from conflict check
    const otherConflicts = (conflict ?? []).filter((row) => row.id !== editingSlotId);
    if (otherConflicts.length > 0) {
      setEditErrorMessage(
        'You already have a slot within one hour of that time. Pick a different time.'
      );
      return;
    }

    // Convert to ISO-Z string
    const isoString = new Date(editingStartTime).toISOString();

    const { error: updateError } = await supabase
      .from('slots')
      .update({ start_time: isoString, price: editingPrice })
      .eq('id', editingSlotId);

    if (updateError) {
      if (updateError.code === '23P01') {
        setEditErrorMessage(
          'That exact time overlaps an existing slot. Pick a time at least one hour apart.'
        );
      } else {
        setEditErrorMessage('Error updating slot. Please try again.');
      }
      return;
    }

    setToastMessage('Slot updated successfully!');
    setTimeout(() => setToastMessage(''), 3000);
    setIsEditDialogOpen(false);
    setEditingSlotId(null);
    await refreshSlots();
  }

  return (
    <div className="space-y-6 p-4">
      {/* Toast message in top-right */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this slot? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Confirmation Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Edit Slot</DialogTitle>
            <DialogDescription>
              Change the start time and price of this slot. The same ±1 hour conflict check applies,
              and it must be at least 10 hours from now.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              confirmEdit();
            }}
            className="space-y-4 mt-4"
          >
            <div className="space-y-1">
              <label
                htmlFor="edit-start-time"
                className="block text-sm font-medium text-gray-700"
              >
                New Start Time
              </label>
              <Input
                id="edit-start-time"
                type="datetime-local"
                value={editingStartTime}
                onChange={(e) => setEditingStartTime(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="edit-price"
                className="block text-sm font-medium text-gray-700"
              >
                Price (£)
              </label>
              <Input
                id="edit-price"
                type="number"
                value={editingPrice}
                onChange={(e) => setEditingPrice(Number(e.target.value))}
                min="1"
                required
              />
            </div>

            {editErrorMessage && <p className="text-red-600 text-sm">{editErrorMessage}</p>}
            <DialogFooter className="flex justify-end space-x-2 mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                variant="secondary"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <h2 className="text-2xl font-bold">My One-on-One Slots</h2>

      {/* New-slot form */}
      <form onSubmit={handleCreateSlot} className="flex items-end space-x-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Start Time</label>
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Price (£)</label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <Button
          type="submit"
          className="mt-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
        >
          Create Slot
        </Button>
      </form>

      {errorMessage && <p className="text-red-600 text-sm mt-1">{errorMessage}</p>}

      {/* Existing slots list with Edit & Delete buttons */}
      {loading ? (
        <p className="text-gray-500">Loading…</p>
      ) : slots.length === 0 ? (
        <p className="text-gray-600">You haven't created any slots yet.</p>
      ) : (
        <ul className="space-y-4">
          {slots.map((slot) => {
            const date = new Date(slot.start_time);
            const formattedDate = date.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            });
            const formattedTime = date.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            });

            return (
              <li
                key={slot.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <svg
                            className="h-4 w-4 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-900">{formattedDate}</p>
                          <p className="text-sm text-gray-500">{formattedTime}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-800">Price: £{slot.price}</p>
                      {slot.student_profile_id ? (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                              className="h-3 w-3 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-600">Booked by student</span>
                        </div>
                      ) : (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                            <svg
                              className="h-3 w-3 text-yellow-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-600">Available</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {/* Edit button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="
                          bg-gradient-to-r from-yellow-500 to-amber-500 
                          hover:from-yellow-600 hover:to-amber-600 
                          text-white border-none
                          flex items-center gap-1
                          focus:ring-yellow-400 focus:ring
                        "
                        onClick={() => openEditDialog(slot)}
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit</span>
                      </Button>

                      {/* Delete button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="
                          bg-gradient-to-r from-red-500 to-rose-500 
                          hover:from-red-600 hover:to-rose-600 
                          text-white border-none
                          flex items-center gap-1
                          focus:ring-red-400 focus:ring
                        "
                        onClick={() => openDeleteDialog(slot.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}