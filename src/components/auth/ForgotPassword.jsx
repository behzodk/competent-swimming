// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Link } from 'react-router-dom'; // Use react-router-dom's Link
import { Button } from '@/components/ui/button'; // Assuming these paths are correct
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, Send, CheckCircle } from 'lucide-react'; // Lucide icons

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Controls success message display
  const [errorMsg, setErrorMsg] = useState(null); // For displaying Supabase errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null); // Clear previous errors

    // Supabase password reset call
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password', // Ensure this matches your app's URL
    });

    setIsLoading(false);

    if (error) {
      setErrorMsg(error.message);
      setIsSubmitted(false); // Stay on the form if there's an error
    } else {
      setIsSubmitted(true); // Show success state
    }
  };

  // Render the success state if the form has been submitted successfully
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md">
          <div className="space-y-8">
            {/* Success State Header */}
            <div className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Check Your Email
              </h1>
              <p className="text-gray-500 text-sm">We've sent you a password reset link</p>
            </div>

            {/* Success Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800 text-sm">
                      We've sent a password reset link to <span className="font-medium">{email}</span>
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <p>Please check your email and click the link to reset your password.</p>
                    <p>If you don't see the email, check your spam folder.</p>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Button
                      onClick={() => {
                        setIsSubmitted(false); // Go back to the form
                        setEmail(''); // Clear email for next attempt
                        setErrorMsg(null); // Clear any previous errors
                      }}
                      variant="outline"
                      className="w-full h-11 border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      Send Another Email
                    </Button>

                    <Link to="/" className="block">
                      <Button
                        variant="ghost"
                        className="w-full h-11 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Sign In
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

  // Render the initial form state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Forgot Password?
            </h1>
            <p className="text-gray-500 text-sm">No worries, we'll send you reset instructions</p>
          </div>

          {/* Reset Form Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-semibold text-center text-gray-800">Reset Your Password</CardTitle>
              <CardDescription className="text-center text-gray-500">
                Enter your email address and we'll send you a link to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <p className="text-sm text-red-red-600 text-center">{errorMsg}</p>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">We'll send a password reset link to this email address</p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Send Reset Link</span>
                    </div>
                  )}
                </Button>
              </form>

              {/* Back to Login Link */}
              <div className="mt-6 text-center">
                <Link
                  to="/" // Use 'to' prop for react-router-dom Link
                  className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors hover:underline"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="font-medium text-gray-800">Need Help?</h3>
                <p className="text-sm text-gray-600">
                  If you're still having trouble accessing your account, please contact our support team.
                </p>
                <Button
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 hover:bg-white/50 transition-colors text-sm"
                >
                  Contact Support
                </Button>
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
