import { Tables } from '@/types/supabase';

type DBUser = Tables<'user'>;

export type User = {
  id: DBUser['id'];
  username: DBUser['username'];
  availability: DBUser['availability'];
};

export type Availability = User['availability'];
