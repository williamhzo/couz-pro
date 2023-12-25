import { SelectAvailabilityComponent } from '@/components/SelectAvailabilityComponent';
import { getUsers } from '@/lib/api';

export default async function Select() {
  const users = await getUsers();

  return <SelectAvailabilityComponent users={users} />;
}
