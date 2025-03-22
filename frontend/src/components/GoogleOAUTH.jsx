import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../components/supabaseClient';


const GoogleOAUTH = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/home`
        }
      });

      if (error) throw error;
      
      // The redirect will happen automatically
      console.log('Google sign in initiated:', data);
    } catch (error) {
      setError(error.message);
      console.error('Error signing in with Google:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <>


  <GoogleOAUTH />
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Welcome Back
        </h2>
        
        <div className="space-y-4">
          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {error && (
            <p className="text-red-600 text-sm mt-2">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default GoogleOAUTH;