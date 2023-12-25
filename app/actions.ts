'use server';

import { supabase } from '@/lib/supabase';
import { Availability, User } from '@/types/common';

export async function submitAvailability(data: Availability) {
  console.log(data);
}

export async function createUser(formData: FormData) {
  const rawFormData = {
    username: formData.get('username') as string,
  };

  // const rawFormData = Object.fromEntries(formData.entries());

  const { error } = await supabase
    .from('user')
    .insert({ username: rawFormData.username });

  if (error) {
    throw error;
  }
}
