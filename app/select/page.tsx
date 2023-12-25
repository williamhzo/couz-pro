import { SelectAvailabilityForm } from '@/components/SelectAvailabilityForm';
import { Heading } from '@/components/ui/heading';
import { getUsers } from '@/lib/api';
import { useSearchParams } from 'next/navigation';

export default async function Select() {
  const searchParams = useSearchParams();
  const idParams = searchParams.get('id');
  const userId = idParams ? parseInt(idParams) : undefined;

  const users = await getUsers();
  const username = users.find((user) => user.id === userId)?.username ?? '';

  return (
    <main className="flex flex-col gap-12">
      <div>
        <Heading>
          choisis tes dates <span className="font-medium">{username}</span>
        </Heading>

        <p className="text-muted-foreground italic mt-2">
          si t&apos;es pas sûr d&apos;être là, coche quand même fais pas
          chauffer
        </p>
      </div>

      {userId && <SelectAvailabilityForm userId={userId} />}
    </main>
  );
}
