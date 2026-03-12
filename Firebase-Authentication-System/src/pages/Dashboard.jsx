import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Condense state management
  const [status, setStatus] = useState({ type: '', message: '' });
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Prevent unnecessary API calls if nothing changed
    if (displayName === currentUser?.displayName) return;

    setIsSaving(true);
    setStatus({ type: '', message: '' });

    try {
      await updateProfile(currentUser, { displayName });
      setStatus({ type: 'success', message: 'Profile updated.' });
      
      // Auto-clear success message after 3 seconds for a cleaner UX
      setTimeout(() => setStatus({ type: '', message: '' }), 3000);
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred while saving.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Cleaner fallback logic for the avatar
  const userInitial = currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || '?';

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Minimalist Top Nav */}
      <nav className="border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-semibold text-sm tracking-tight">FireAuth</span>
          <div className="flex items-center gap-6">
            <span className="text-sm text-slate-500 hidden sm:block">{currentUser?.email}</span>
            <button 
              onClick={handleLogout}
              className="text-sm hover:text-red-100 transition-colors cursor-pointer bg-red-200 rounded-md px-3 py-2 text-red-600 hover:bg-red-400"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10">
          <h1 className="text-2xl font-medium tracking-tight">Account Settings</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your profile and application preferences.</p>
        </header>

        <section className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8 bg-white flex flex-col sm:flex-row gap-8 items-start">
            
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 text-2xl font-medium uppercase">
                {userInitial}
              </div>
            </div>

            <form onSubmit={handleSave} className="flex-grow w-full space-y-6">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-slate-900 mb-2">
                  Display Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full max-w-md px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                  placeholder="Enter your name"
                />
                <p className="text-xs text-slate-500 mt-2">
                  This is the name that will be displayed publicly.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={currentUser?.email || ''}
                  disabled
                  className="w-full max-w-md px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={isSaving || displayName === currentUser?.displayName}
                  className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Saving...' : 'Save changes'}
                </button>
                
                {/* Inline, subtle status messages */}
                {status.message && (
                  <span className={`text-sm ${status.type === 'error' ? 'text-red-600' : 'text-slate-600'}`}>
                    {status.message}
                  </span>
                )}
              </div>
            </form>

          </div>
          
        </section>
      </main>
    </div>
  );
}