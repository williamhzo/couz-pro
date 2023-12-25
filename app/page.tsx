import { Heading } from '@/components/ui/heading';
import { SelectUserForm } from '@/components/SelectUserForm';
import { getUsers } from '@/lib/api';

export default async function Home() {
  const users = await getUsers();

  return (
    <main>
      {users.length > 0 ? (
        <SelectUserForm users={users} />
      ) : (
        <p className="text-sm text-muted-foreground">chargement des couz...</p>
      )}
    </main>
  );
}
