'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn, getNextSaturdays, getWeekendRange } from '@/lib/utils';
import { User } from '@/types/common';
import { FC, useState } from 'react';

export const SelectAvailabilityForm: FC<{ userId: User['id'] }> = ({
  userId,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [availabilities, setAvailabilities] = useState<string[]>([]);
  const weekends = getNextSaturdays(12);

  const handleSubmit = async () => {
    setSubmitted(true);
    alert(JSON.stringify({ availabilities, userId }));
  };

  return (
    <>
      <ul className="flex flex-col gap-2">
        {weekends.map((weekend) => {
          const weekendISO = weekend.toDateString();
          const checked = availabilities.includes(weekendISO);
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
                      ? setAvailabilities([...availabilities, weekendISO])
                      : setAvailabilities(
                          availabilities.filter((d) => d !== weekendISO)
                        );
                  }}
                />
              </div>
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
    </>
  );
};
