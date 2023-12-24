'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Heading } from '@/components/ui/heading';
import { Label } from '@/components/ui/label';
import { cn, getNextSaturdays, getWeekendRange } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Select() {
  const [submitted, setSubmitted] = useState(false);

  const [availabilities, setAvailabilities] = useState<string[]>([]);

  const weekends = getNextSaturdays(12);

  const searchParams = useSearchParams();
  const user = searchParams.get('couz');

  const handleSubmit = async () => {
    // const response = await fetch('/api/availabilities', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ availabilities, user }),
    // });

    // if (response.ok) {
    //   setSubmitted(true);
    // }

    alert(JSON.stringify({ availabilities, user }));
  };

  return (
    <main className="flex flex-col gap-12">
      <div>
        <Heading>
          choisis tes dates <span className="font-medium">{user}</span>
        </Heading>

        <p className="text-muted-foreground italic mt-2">
          si t&apos;es pas sûr d&apos;être là, coche quand même fais pas
          chauffer
        </p>
      </div>

      <ul>
        {weekends.map((weekend) => {
          const weekendISO = weekend.toDateString();
          const checked = availabilities.includes(weekendISO);
          return (
            <div key={weekendISO} className="mb-8">
              <div className="flex justify-between items-center">
                <Label
                  className={cn(
                    'text-sm w-full transition-colors duration-200',
                    checked ? 'text-foreground' : 'text-muted-foreground'
                  )}
                  htmlFor={weekendISO}
                >
                  {getWeekendRange(weekend)}
                </Label>

                <Checkbox
                  id={weekendISO}
                  checked={checked}
                  onCheckedChange={(checked) => {
                    checked
                      ? setAvailabilities([...availabilities, weekendISO])
                      : setAvailabilities(
                          availabilities.filter((d) => d !== weekendISO)
                        );
                  }}
                />
              </div>

              <hr className="h-px border-none bg-border mt-2" />
            </div>
          );
        })}
      </ul>

      <div className="self-end">
        {submitted ? (
          <p className="text-sm">bien reçu, cimer 🫡</p>
        ) : (
          <Button onClick={handleSubmit}>j&apos;envoie</Button>
        )}
      </div>
    </main>
  );
}
