// src/pages/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/card';
import { Eye, EyeOff, Lock, CheckCircle, Shield, Check, X } from 'lucide-react';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  // --------------------------------------------
  // 1) Password‐strength logic
  // --------------------------------------------
  const passwordRequirements = [
    { id: 'length', label: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { id: 'uppercase', label: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { id: 'lowercase', label: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { id: 'number', label: 'One number', test: (pwd) => /\d/.test(pwd) },
    {
      id: 'special',
      label: 'One special character',
      test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    },
  ];

  const calculatePasswordStrength = (password) => {
    const score = passwordRequirements.reduce((acc, req) => acc + (req.test(password) ? 1 : 0), 0);
    if (score === 0) return { score: 0, label: 'Very Weak', color: 'text-red-500', bgColor: 'bg-red-500' };
    if (score <= 2) return { score: 2, label: 'Weak', color: 'text-orange-500', bgColor: 'bg-orange-500' };
    if (score <= 3) return { score: 3, label: 'Fair', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    if (score <= 4) return { score: 4, label: 'Good', color: 'text-blue-500', bgColor: 'bg-blue-500' };
    return { score: 5, label: 'Strong', color: 'text-green-500', bgColor: 'bg-green-500' };
  };

  const [passwordStrength, setPasswordStrength] = useState(calculatePasswordStrength(''));

  useEffect(() => {
    if (newPassword) {
      setPasswordStrength(calculatePasswordStrength(newPassword));
    } else {
      setPasswordStrength(calculatePasswordStrength(''));
    }
  }, [newPassword]);

  // --------------------------------------------
  // 2) Helpers to check matching & validity
  // --------------------------------------------
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
  const isFormValid = passwordStrength.score >= 4 && passwordsMatch;

  // --------------------------------------------
  // 3) Only show the “invalid/expired link” error once,
  //    but do NOT clear other errors on every session change.
  // --------------------------------------------
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session && !isCompleted) {
        setErrorMsg('Invalid or expired password reset link. Please request a new reset link.');
      }
      // NOTE: We deliberately do NOT clear errorMsg when session is truthy,
      // because we want “New password should be different from the old password” to stay visible.
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [isCompleted]);

  // --------------------------------------------
  // 4) handlePasswordReset: call supabase.auth.updateUser
  // --------------------------------------------
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    if (!isFormValid) {
      setErrorMsg('Please ensure your password meets all requirements and both fields match.');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        // Log the full error to console for debugging
        // Show the Supabase‐returned message (e.g. “New password should be different from the old password”)
        setErrorMsg(updateError.message);
        setIsLoading(false);
        return;
      }

      setIsCompleted(true);
      await supabase.auth.signOut();
    } catch (err) {
      return;
      setErrorMsg('An unexpected error occurred during password reset.');
      setIsLoading(false);
    }
  };

  // --------------------------------------------
  // 5) If completed, show the success screen
  // --------------------------------------------
  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Password Reset Complete
              </h1>
              <p className="text-gray-500 text-sm">Your password has been successfully updated.</p>
            </div>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800 text-sm font-medium">
                      Your password has been successfully reset!
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <p>You can now sign in to your account using your new password.</p>
                    <p>For security reasons, you may need to sign in again on all your devices.</p>
                  </div>

                  <div className="pt-4">
                    <Link to="/" className="block">
                      <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                        Continue to Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------
  // 6) Otherwise, show the Reset form
  // --------------------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Reset Your Password
            </h1>
            <p className="text-gray-500 text-sm">Create a strong, secure password for your account</p>
          </div>

          {/* Card with form */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center text-gray-800">
                Create New Password
              </CardTitle>
              <CardDescription className="text-center text-gray-500">
                Choose a strong password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordReset} className="space-y-6">
                {errorMsg && (
                  <p className="text-sm text-red-600 text-center">{errorMsg}</p>
                )}

                {/* New Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {newPassword && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Password strength:</span>
                        <span className={`text-xs font-medium ${passwordStrength.color}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.bgColor}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors ${
                        confirmPassword && !passwordsMatch
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && !passwordsMatch && (
                    <p className="text-xs text-red-500 flex items-center">
                      <X className="w-3 h-3 mr-1" />
                      Passwords do not match
                    </p>
                  )}
                  {passwordsMatch && (
                    <p className="text-xs text-green-500 flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      Passwords match
                    </p>
                  )}
                </div>

                {/* Password Requirements List */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Password Requirements</Label>
                  <div className="space-y-1">
                    {passwordRequirements.map((req) => {
                      const isValid = req.test(newPassword);
                      return (
                        <div key={req.id} className="flex items-center text-xs">
                          {isValid ? (
                            <Check className="w-3 h-3 text-green-500 mr-2" />
                          ) : (
                            <X className="w-3 h-3 text-gray-400 mr-2" />
                          )}
                          <span className={isValid ? 'text-green-600' : 'text-gray-500'}>
                            {req.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Updating Password...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Update Password</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-medium text-gray-800">Security Notice</h3>
                <p className="text-sm text-gray-600">
                  After updating your password, you may need to sign in again on all your
                  devices for security purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 Competent Swimming. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}