import { createBrowserClient } from '@supabase/ssr';
import { 
  AuthResponse, 
  User, 
  Session, 
  ResetPasswordResponse, 
  UpdatePasswordResponse 
} from '@/definitions/auth';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

class AuthService {
  private getClient() {
    return createBrowserClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name) {
            const cookie = document.cookie
              .split('; ')
              .find((row) => row.startsWith(`${name}=`))
              ?.split('=')[1];
            console.log(`AuthService: Reading cookie ${name}:`, cookie ? 'found' : 'not found');
            return cookie;
          },
          set(name, value, options) {
            console.log(`AuthService: Setting cookie ${name}`);
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
            console.log(`AuthService: Removing cookie ${name}`);
            const cookieString = `${name}=; max-age=0`;
            document.cookie = cookieString;
          },
        },
      }
    );
  }

  async signUp(email: string, password: string): Promise<AuthResponse> {
    console.log('AuthService: signUp called for email', email);
    
    const { data, error } = await this.getClient().auth.signUp({
      email,
      password
    });

    console.log('AuthService: signUp result', { user: !!data?.user, error: !!error });

    return {
      user: data?.user || null,
      session: data?.session || null,
      error: error || undefined
    };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    console.log('AuthService: signIn called for email', email);
    
    try {
      const { data, error } = await this.getClient().auth.signInWithPassword({
        email,
        password
      });

      console.log('AuthService: signIn result', { 
        user: !!data?.user, 
        session: !!data?.session,
        sessionExpires: data?.session?.expires_at,
        error: error ? error.message : null
      });

      // Check if cookies are being set (client-side only)
      if (typeof window !== 'undefined') {
        console.log('AuthService: Document cookies after login:', document.cookie);
        setTimeout(() => {
          console.log('AuthService: Document cookies after 500ms delay:', document.cookie);
        }, 500);
      }

      return {
        user: data?.user || null,
        session: data?.session || null,
        error: error || undefined
      };
    } catch (err) {
      console.error('AuthService: Exception during signIn:', err);
      throw err;
    }
  }

  async signOut(): Promise<void> {
    console.log('AuthService: signOut called');
    
    try {
      // Sign out from Supabase
      await this.getClient().auth.signOut({ scope: 'global' });
      
      // Manually clear cookies for good measure
      if (typeof document !== 'undefined') {
        // Clear all possible auth cookies
        const cookiesToClear = [
          'sb-access-token',
          'sb-refresh-token',
          'supabase-auth-token'
        ];
        
        cookiesToClear.forEach(name => {
          document.cookie = `${name}=; max-age=0; path=/; secure; samesite=lax`;
        });
        
        console.log('AuthService: Manually cleared auth cookies');
      }
      
      console.log('AuthService: signOut completed');
    } catch (err) {
      console.error('AuthService: Error during signOut:', err);
      throw err;
    }
  }

  async resetPassword(email: string): Promise<ResetPasswordResponse> {
    console.log('AuthService: resetPassword called for email', email);
    
    const { data, error } = await this.getClient().auth.resetPasswordForEmail(email);
    
    console.log('AuthService: resetPassword result', { data: !!data, error: !!error });
    
    return { 
      data: data ? { user: data as unknown as User } : null, 
      error 
    };
  }

  async updatePassword(password: string): Promise<UpdatePasswordResponse> {
    console.log('AuthService: updatePassword called');
    
    const { data, error } = await this.getClient().auth.updateUser({
      password
    });

    console.log('AuthService: updatePassword result', { 
      user: !!data?.user, 
      error: !!error 
    });

    return {
      data: data && data.user ? { user: data.user } : null,
      error
    };
  }

  async getCurrentUser(): Promise<User | null> {
    console.log('AuthService: getCurrentUser called');
    
    const { data: { user }, error } = await this.getClient().auth.getUser();
    
    console.log('AuthService: getCurrentUser result', { 
      user: user ? `User found: ${user.email}` : 'No user found',
      error: !!error
    });
    
    return user;
  }

  async getSession(): Promise<Session | null> {
    console.log('AuthService: getSession called');
    
    const { data: { session }, error } = await this.getClient().auth.getSession();
    
    console.log('AuthService: getSession result', { 
      session: session ? `Session found, expires at: ${session.expires_at}` : 'No session found',
      error: !!error
    });
    
    return session;
  }

  async refreshSession(): Promise<Session | null> {
    console.log('AuthService: refreshSession called');
    
    const { data: { session }, error } = await this.getClient().auth.refreshSession();
    
    console.log('AuthService: refreshSession result', { 
      session: !!session, 
      error: !!error 
    });
    
    return session;
  }
}

const authService = new AuthService();

export default authService; 