'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerSupabaseClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name) {
          const cookieStore = await Promise.resolve(cookies());
          return cookieStore.get(name)?.value;
        },
        async set(name, value, options) {
          const cookieStore = await Promise.resolve(cookies());
          cookieStore.set({ name, value, ...options });
        },
        async remove(name, options) {
          const cookieStore = await Promise.resolve(cookies());
          cookieStore.set({ name, value: '', ...options, maxAge: 0 });
        },
      },
    }
  );
} 