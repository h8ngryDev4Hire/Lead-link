import { createBrowserClient } from '@supabase/ssr';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { type CookieOptions } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

// Create a Supabase client for use in the browser
export function createClient() {
  console.log('supabase.ts: Creating browser client with URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('supabase.ts: Missing Supabase env variables!');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  }
  
  // Use the browser client with default persistence
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          const cookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${name}=`))
            ?.split('=')[1];
          console.log(`supabase.ts: Browser client reading cookie ${name}:`, cookie ? 'found' : 'not found');
          return cookie;
        },
        set(name, value, options) {
          console.log(`supabase.ts: Browser client setting cookie ${name}`);
          let cookieString = `${name}=${value}`;
          if (options.path) {
            cookieString += `; path=${options.path}`;
          }
          if (options.maxAge) {
            cookieString += `; max-age=${options.maxAge}`;
          }
          if (options.domain) {
            cookieString += `; domain=${options.domain}`;
          }
          if (options.sameSite) {
            cookieString += `; samesite=${options.sameSite}`;
          }
          if (options.secure) {
            cookieString += '; secure';
          }
          document.cookie = cookieString;
        },
        remove(name, options) {
          console.log(`supabase.ts: Browser client removing cookie ${name}`);
          const cookieString = `${name}=; max-age=0`;
          document.cookie = cookieString;
        },
      },
    }
  );
  
  return client;
}

// Create a Supabase client for server components
export async function createServerSupabaseClient() {
  console.log('supabase.ts: Creating server client');
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name) {
          const cookieStore = await Promise.resolve(cookies());
          const cookie = cookieStore.get(name)?.value;
          console.log(`supabase.ts: Reading server cookie ${name}:`, cookie ? 'found' : 'not found');
          return cookie;
        },
        async set(name, value, options) {
          console.log(`supabase.ts: Setting server cookie ${name}`);
          const cookieStore = await Promise.resolve(cookies());
          cookieStore.set({ name, value, ...options });
        },
        async remove(name, options) {
          console.log(`supabase.ts: Removing server cookie ${name}`);
          const cookieStore = await Promise.resolve(cookies());
          cookieStore.set({ name, value: '', ...options, maxAge: 0 });
        },
      },
    }
  );
}

// For middleware - updates the auth session
export async function updateSession(request: NextRequest) {
  console.log('supabase.ts: Updating session in middleware');
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Log existing cookies for debugging
  console.log('supabase.ts: Existing cookies:', Array.from(request.cookies.getAll()).map(c => `${c.name}=${c.value.substring(0, 5)}...`));

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = request.cookies.get(name)?.value;
          console.log(`supabase.ts: Session update - Reading cookie ${name}:`, cookie ? 'found' : 'not found');
          return cookie;
        },
        set(name: string, value: string, options: CookieOptions) {
          console.log(`supabase.ts: Session update - Setting cookie ${name}`);
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          console.log(`supabase.ts: Session update - Removing cookie ${name}`);
          response.cookies.set({
            name,
            value: '',
            ...options,
            maxAge: 0,
          });
        },
      },
    }
  );

  try {
    // First check if we have a session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      console.log('supabase.ts: Session found, attempting to refresh if needed');
      
      // If session is about to expire (within 60 minutes), refresh it
      const expiresAt = session.expires_at;
      if (expiresAt) {
        const expirationTime = new Date(expiresAt * 1000);
        const now = new Date();
        const timeUntilExpiration = expirationTime.getTime() - now.getTime();
        const refreshThreshold = 60 * 60 * 1000; // 60 minutes in milliseconds
        
        if (timeUntilExpiration < refreshThreshold) {
          console.log('supabase.ts: Session expiring soon, refreshing tokens');
          await supabase.auth.refreshSession();
        } else {
          console.log('supabase.ts: Session valid, no refresh needed');
        }
      } else {
        console.log('supabase.ts: Session missing expiration time, refreshing to be safe');
        await supabase.auth.refreshSession();
      }
    } else {
      console.log('supabase.ts: No session found, skipping refresh');
    }
    
    // Get current user for logging purposes
    const { data: { user } } = await supabase.auth.getUser();
    console.log('supabase.ts: Session update complete -', user ? `User found: ${user.email}` : 'No user found');
  } catch (error) {
    console.error('supabase.ts: Error refreshing session:', error);
    
    // Log all cookies in case of error to help with debugging
    console.log('supabase.ts: Cookies after error:', 
      Array.from(response.cookies.getAll()).map(c => c.name)
    );
  }
  
  // Log all cookies that were set in the response
  console.log('supabase.ts: Response cookies:', 
    Array.from(response.cookies.getAll()).map(c => c.name)
  );
  
  return response;
} 