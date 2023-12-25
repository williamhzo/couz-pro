'use server';

import { supabase } from '@/lib/supabase';
import { Availability, User } from '@/types/common';

type SubmitData = {
  userId: User['id'];
  availability: Availability;
};

export async function submitAvailability(data: SubmitData) {
  const { error } = await supabase
    .from('user')
    .update({ availability: data.availability })
    .eq('id', data.userId);

  if (error) {
    throw error;
  }
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
