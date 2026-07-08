import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ShopifyOAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    async function handleOAuthCallback() {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      
      // Verify CSRF protection code
      const storedState = sessionStorage.getItem('shopify_oauth_csrf_protection_code');
      if (!state || state !== storedState) {
        console.error('Invalid state parameter');
        router.push('/?error=invalid_state');
        return;
      }
      
      // Clear the stored state
      sessionStorage.removeItem('shopify_oauth_csrf_protection_code');

      if (!code) {
        console.error('No code parameter received');
        router.push('/?error=no_code');
        return;
      }

      try {
        const response = await fetch('/api/auth/shopify-access-token-exchange', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to exchange code for token');
        }

        // On success, redirect to the dashboard or home page
        router.push('/dashboard');
      } catch (error) {
        console.error('Error exchanging code for token:', error);
        router.push('/?error=token_exchange_failed');
      }
    }

    handleOAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Signing you in...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto" />
      </div>
    </div>
  );
} 
