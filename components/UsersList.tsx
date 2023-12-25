import { RemoveUserButton } from '@/components/RemoveUserButton';
import { User } from '@/types/common';
import { FC } from 'react';

type UsersListProps = {
  getUsers: () => Promise<User[]>;
};

export const UsersList: FC<UsersListProps> = async ({ getUsers }) => {
  const users = await getUsers();

  return (
    <section>
      <ul className="flex flex-col gap-2 items-start">
        {users?.map((user) => (
          <li
            key={user.id}
            className="flex border-b last:border-b-0 items-center w-full pb-2 justify-between"
          >
            <div className="flex gap-4 items-baseline">
              <span className="text-muted-foreground text-xs">{user.id}</span>
              <span>{user.username}</span>
              <span>{user.availability?.join(', ')}</span>
            </div>

            <RemoveUserButton userId={user.id} />
          </li>
        ))}
      </ul>
    </section>
  );
};
