import { NextResponse, NextRequest } from "next/server";
import { updateSession } from "./lib/util/supabase";
import { handlePublicRoutes } from "./lib/middleware/authMiddleware";
import { createServerClient } from "@supabase/ssr";

// Routes that don't require authentication
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/',
  '/about'
];

export async function middleware(req: NextRequest) {
  console.log('Middleware: Processing request for', req.nextUrl.pathname);
  
  // First, update the session (refresh tokens if needed)
  console.log('Middleware: Updating session');
  const response = await updateSession(req);
  
  // Skip auth check for public routes
  if (handlePublicRoutes(req, PUBLIC_ROUTES)) {
    console.log('Middleware: Public route detected, skipping auth check');
    return response;
  }
  
  // Check authentication status
  console.log('Middleware: Protected route, checking authentication');
  
  // Log cookie data for debugging
  console.log('Middleware: All cookies:', Array.from(req.cookies.getAll()).map(c => c.name));
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = req.cookies.get(name)?.value;
          console.log(`Middleware: Reading cookie ${name}:`, cookie ? 'found' : 'not found');
          return cookie;
        },
        set() {
          // Don't need to set cookies here, updateSession does that
          console.log('Middleware: Cookie set attempted (no-op)');
        },
        remove() {
          // Don't need to remove cookies here, updateSession does that
          console.log('Middleware: Cookie remove attempted (no-op)');
        },
      },
    }
  );
  
  try {
    // First check session to ensure session is valid
    const { data: sessionData } = await supabase.auth.getSession();
    console.log('Middleware: Session check result -', sessionData.session ? 'Session found' : 'No session found');
    
    // Only check user if we have a session
    if (sessionData.session) {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Middleware: Auth check result -', user ? `User authenticated: ${user.email}` : 'No user found');
      
      if (user) {
        console.log('Middleware: User authenticated, allowing access');
        return response;
      }
    }
    
    // Redirect to login if not authenticated
    console.log('Middleware: User not authenticated, redirecting to login');
    const url = new URL('/auth/login', req.url);
    url.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Middleware: Error checking authentication:', error);
    // On error, redirect to login as a fallback
    const url = new URL('/auth/login', req.url);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};