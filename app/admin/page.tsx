import { AddUserForm } from '@/components/AddUserForm';
import { UsersList } from '@/components/UsersList';
import { Heading } from '@/components/ui/heading';
import { getUsers } from '@/lib/api';

export const revalidate = 1;

export default function Admin() {
  return (
    <main className="flex flex-col gap-12">
      <Heading>admin</Heading>
      <AddUserForm />
      <UsersList getUsers={getUsers} />
    </main>
  );
}
