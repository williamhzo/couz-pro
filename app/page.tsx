import { Heading } from '@/components/ui/heading';
import { SelectUserForm } from '@/components/SelectUserForm';
import { getUsers } from '@/lib/api';

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="">
      <Heading>couz.pro</Heading>
      {users.length > 0 && <SelectUserForm users={users} />}
    </main>
  );
}
