'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { User } from '@/types/common';
import { FC } from 'react';

const FormSchema = z.object({
  username: z.string(),
});

type SelectUserFormProps = {
  users: User[];
};

export const SelectUserForm: FC<SelectUserFormProps> = ({ users }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const userId = users.find((user) => user.username === data.username)?.id;

    if (!userId) {
      throw new Error('user not found');
    }

    router.push('/select?' + new URLSearchParams({ id: userId.toString() }));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>quel couz es-tu ?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="clique là" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map(({ id, username }) => (
                    <SelectItem key={id} value={username}>
                      {username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit">go</Button>
      </form>
    </Form>
  );
};
