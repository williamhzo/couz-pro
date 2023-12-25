'use client';

import { submitAvailability } from '@/app/actions';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn, getNextSaturdays, getWeekendRange } from '@/lib/utils';
import { User } from '@/types/common';
import Link from 'next/link';
import { FC, useState } from 'react';

export const SelectAvailabilityForm: FC<{ userId: User['id'] }> = ({
  userId,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [availability, setAvailability] = useState<string[]>([]);
  const weekends = getNextSaturdays(12);

  function handleSubmit() {
    setSubmitted(true);

    try {
      submitAvailability({ userId, availability });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <ul className="flex flex-col gap-2">
        {weekends.map((weekend) => {
          const weekendISO = weekend.toDateString();
          const checked = availability.includes(weekendISO);
          return (
            <div key={weekendISO}>
              <div
                className={cn(
                  'flex justify-between items-center transition-colors rounded duration-200 border pr-5',
                  checked ? 'border-foreground/75' : 'border-muted'
                )}
              >
                <Label
                  className={cn(
                    'text-sm w-full transition-colors duration-200 pl-5 py-4',
                    checked ? 'text-foreground' : 'text-muted-foreground'
                  )}
                  htmlFor={weekendISO}
                >
                  {getWeekendRange(weekend)}
                </Label>

                <Checkbox
                  id={weekendISO}
                  checked={checked}
                  disabled={submitted}
                  onCheckedChange={(value) => {
                    value
                      ? setAvailability([...availability, weekendISO])
                      : setAvailability(
                          availability.filter((d) => d !== weekendISO)
                        );
                  }}
                />
              </div>
            </div>
          );
        })}
      </ul>

      {submitted ? (
        <Link
          className={buttonVariants({ variant: 'secondary' })}
          href="/results"
        >
          voir les résultats
        </Link>
      ) : (
        <Button className="self-end" onClick={handleSubmit}>
          j&apos;envoie
        </Button>
      )}
    </>
  );
};
