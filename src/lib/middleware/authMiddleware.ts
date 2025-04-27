import { NextRequest, NextResponse } from 'next/server';
import { User, Session } from '@/definitions/auth';
import { createServerClient } from '@supabase/ssr';
import type { CookieOptions } from '@supabase/ssr';

/**
 * Extracts and validates Supabase session cookie
 */
export async function validateSession(req: NextRequest): Promise<{ user: User | null, session: Session | null }> {
  console.log('authMiddleware: Validating session for', req.nextUrl.pathname);
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = req.cookies.get(name)?.value;
          console.log(`authMiddleware: Reading cookie ${name}:`, cookie ? 'found' : 'not found');
          return cookie;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Not setting cookies in middleware function
          console.log(`authMiddleware: Set cookie attempted (no-op): ${name}`);
        },
        remove(name: string, options: CookieOptions) {
          // Not removing cookies in middleware function
          console.log(`authMiddleware: Remove cookie attempted (no-op): ${name}`);
        },
      },
    }
  );

  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) console.log('authMiddleware: Error getting user:', userError.message);
    
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) console.log('authMiddleware: Error getting session:', sessionError.message);

    console.log('authMiddleware: Session validation result -', 
      user ? `User found: ${user.email}` : 'No user found',
      session ? 'Valid session' : 'No session'
    );

  return { user, session };
  } catch (error) {
    console.error('authMiddleware: Exception during session validation:', error);
    return { user: null, session: null };
  }
}

/**
 * Enforces authentication, returns user/session or redirect Response
 */
export async function requireAuth(req: NextRequest): Promise<{ user: User, session: Session } | Response> {
  console.log('authMiddleware: requireAuth called for', req.nextUrl.pathname);
  const { user, session } = await validateSession(req);

  if (!user || !session) {
    console.log('authMiddleware: Authentication required, redirecting to login');
    const url = new URL('/auth/login', req.url);
    url.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  console.log('authMiddleware: User authenticated, proceeding');
  return { user, session } as { user: User, session: Session };
}

/**
 * Checks if URL matches public route patterns
 */
export function handlePublicRoutes(req: NextRequest, matcher: string[]): boolean {
  const url = req.nextUrl.pathname;
  console.log('authMiddleware: Checking if route is public:', url);
  
  // Check if the URL starts with any of the public route patterns
  const isPublic = matcher.some(pattern => {
    // Exact match
    if (pattern === url) {
      console.log(`authMiddleware: Exact match with public pattern: ${pattern}`);
      return true;
    }
    
    // Wildcard match (e.g., /api/*)
    if (pattern.endsWith('*')) {
      const prefix = pattern.slice(0, -1);
      const matches = url.startsWith(prefix);
      if (matches) {
        console.log(`authMiddleware: Wildcard match with public pattern: ${pattern}`);
      }
      return matches;
    }
    
    return false;
  });

  console.log('authMiddleware: Route is', isPublic ? 'public' : 'protected');
  return isPublic;
} 