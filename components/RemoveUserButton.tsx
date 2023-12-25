'use client';

import { User } from '@/types/common';
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { deleteUser } from '@/lib/api';
import { TrashIcon } from '@radix-ui/react-icons';

export const RemoveUserButton: FC<{ userId: User['id'] }> = ({ userId }) => {
  return (
    <Button
      variant="ghost"
      className="justify-self-end"
      onClick={() => deleteUser(userId)}
    >
      <TrashIcon />
    </Button>
  );
};
