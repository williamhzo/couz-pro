'use server';

import { supabase } from '@/lib/supabase';
import { User } from '@/types/common';
import { cache } from 'react';

export const getUsers: () => Promise<User[]> = cache(async () => {
  const { data } = await supabase
    .from('user')
    .select('username, id, availability')
    .order('created_at', { ascending: false });
  console.log('data -> ', data);
  return data ?? [];
});

export const deleteUser = async (id: User['id']) => {
  const { error } = await supabase.from('user').delete().match({ id });
  if (error) {
    throw error;
  }
};
