// src/pages/SubscriptionsPage.jsx

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import CurrentPlan from '../utils/Subscriptions/CurrentPlan';
import BillingHistory from '../utils/Subscriptions/BillingHistory';
import NeedHelp from '../utils/Subscriptions/NeedHelp';
import PlanFeatures from '../utils/Subscriptions/PlanFeatures';
import NoSubscriptionText from '../utils/Subscriptions/NoSubscriptionText';
import ActionButtons from '../utils/Subscriptions/ActionButtons';
import { useProfile } from '@/contexts/profileContext';
import { useNavigate } from 'react-router-dom';


export default function SubscriptionsPage({ session }) {
  const navigate = useNavigate();
  const { activeProfileId } = useProfile();

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubscription() {
      if (!activeProfileId) {
        setSubscription(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data: subs, error: subsErr } = await supabase
        .from('subscriptions')
        .select('id, plan, price, status, start_date, end_date, instructor')
        .eq('profile_id', activeProfileId)
        .eq('status', 'active')
        .single();
      if (subsErr && subsErr.code !== 'PGRST116') return;
      setSubscription(subs || null);
      setLoading(false);
    }
    loadSubscription();
  }, [activeProfileId]);

  const updateSubscriptionStatus = async (id) => {
    await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('id', id);
    setSubscription((s) => (s && s.id === id ? { ...s, status: 'cancelled' } : s));
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading subscription…</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-gray-900">
              Subscription Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your current subscription and billing details
            </p>
            {subscription && (
              <ActionButtons subscription={subscription} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {subscription ? (
              <CurrentPlan
                subscription={subscription}
                updateSubscriptionStatus={() => updateSubscriptionStatus(subscription.id)}
              />
            ) : (
              <NoSubscriptionText />
            )}

            <BillingHistory />
          </div>

          <div className="space-y-8">
            {subscription && <PlanFeatures />}
            <NeedHelp />
          </div>
        </div>
      </div>
    </div>
  );
}