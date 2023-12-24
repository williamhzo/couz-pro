'use client';

import { Label } from '@/components/ui/label';
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/ui/heading';

const MOCKED_NAMES = [
  'wilus',
  'benji',
  'le monde',
  'basto',
  'louigui',
  'loulou',
  'pinzio',
  'vicashdo',
  'vince',
  'waffle',
] as const;

const FormSchema = z.object({
  name: z.enum(MOCKED_NAMES),
});

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // todo: hide the query params from the url:
    router.push('/select?' + new URLSearchParams({ couz: data.name }));
  }

  return (
    <main className="">
      <Heading>couz.pro</Heading>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>quel couz es-tu ?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="clique là" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MOCKED_NAMES.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
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
    </main>
  );
}
